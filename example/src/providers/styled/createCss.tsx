import transformNative from 'css-to-react-native';
import postcss from 'postcss';
import postcssJs from 'postcss-js';

import { Stylesheet } from './types/StyleSheet';
import { interleave } from './utils';

// this is for handleInterpolation
// they're reset on every call to css
// this is done so we don't create a new
// handleInterpolation function on every css call
let styles;
let buffer;
let lastType;

function handleInterpolation(interpolation: any, i: number, arr: Array<any>) {
  const type = typeof interpolation;

  if (type === 'string') {
    // strip comments
    interpolation = interpolation.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
  }

  if (type === 'function') {
    if (this === undefined) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Interpolating functions in css calls is not allowed.\n' +
            'If you want to have a css call based on props, create a function that returns a css call like this\n' +
            'let dynamicStyle = (props) => css`color: ${props.color}`\n' +
            'It can be called directly with props or interpolated in a styled call like this\n' +
            'let SomeComponent = styled.View`${dynamicStyle}`'
        );
      }
    } else {
      handleInterpolation.call(
        this,
        interpolation(
          // $FlowFixMe
          this
        ),
        i,
        arr
      );
    }
    return;
  }
  const isIrrelevant = interpolation == null || type === 'boolean';
  const isRnStyle =
    (type === 'object' && !Array.isArray(interpolation)) || type === 'number';
  if (lastType === 'string' && (isRnStyle || isIrrelevant)) {
    const converted = convertStyles(buffer);
    if (converted !== undefined) {
      styles.push(converted);
    }
    buffer = '';
  }
  if (isIrrelevant) {
    return;
  }

  if (type === 'string') {
    buffer += interpolation;

    if (arr.length - 1 === i) {
      const converted = convertStyles(buffer);
      if (converted !== undefined) {
        styles.push(converted);
      }
      buffer = '';
    }
  }
  if (isRnStyle) {
    styles.push(interpolation);
  }
  if (Array.isArray(interpolation)) {
    interpolation.forEach(handleInterpolation, this);
  }
  lastType = type;
}

// Use platform specific StyleSheet method for creating the styles.
// This enables us to use the css``/css({}) in any environment (Native | Sketch | Web)
export function createCss(StyleSheet: Stylesheet) {
  return function css(...args: any[]) {
    let vals;

    // these are declared earlier
    // this is done so we don't create a new
    // handleInterpolation function on every css call
    styles = [];
    buffer = '';
    lastType = undefined;

    if (args[0] == null || args[0].raw === undefined) {
      vals = args;
    } else {
      vals = interleave(args);
    }

    vals.forEach(handleInterpolation, this);

    return StyleSheet.flatten(styles);
  };
}

function transformObject(styles: Record<string, any> = {}) {
  const trans = Object.keys(styles).reduce((acc, key) => {
    if (typeof styles[key] === 'object') {
      const pairs = Object.entries(styles[key]);
      acc[key] = transformNative(pairs);
      return acc;
    } else {
      const pair = [key, styles[key]];
      return {
        ...acc,
        ...transformNative([pair]),
      };
    }
  }, {});

  return trans;
}

function convertStyles(str: string) {
  if (str.trim() === '') return;

  const parse = postcss.parse(str);
  const obj = postcssJs.objectify(parse);

  try {
    return transformObject(obj);
  } catch (error) {
    const msg = error.message;

    if (msg.includes('Failed to parse declaration')) {
      const values = msg
        .replace('Failed to parse declaration ', '')
        .replace(/"/g, '')
        .trim()
        .split(':');

      const errorMsg = `'${values[0]}' shorthand property requires units for example - ${values[0]}: 20px or ${values[0]}: 10px 20px 40px 50px`;

      console.error(errorMsg);
    }
  }
}
