/* eslint-disable no-template-curly-in-string */
import transformNative, { Style } from 'css-to-react-native';
import postcss from 'postcss';
import postcssJs, { StyleTuple } from 'postcss-js';

import { Stylesheet } from './types/StyleSheet';
import { interleave } from './utils';

// this is for handleInterpolation
// they're reset on every call to css
// this is done so we don't create a new
// handleInterpolation function on every css call
let styles: any[];
let buffer: string;
let lastType: string | undefined;

function handleInterpolation(interpolation: any, i: number, arr: Array<any>) {
  const type = typeof interpolation;

  if (type === 'string') {
    // strip comments
    interpolation = interpolation.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
  }

  if (type === 'function') {
    //@ts-ignore
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
        //@ts-ignore
        this,
        interpolation(
          // $FlowFixMe
          //@ts-ignore
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
    //@ts-ignore
    interpolation.forEach(handleInterpolation, this);
  }
  lastType = type;
}

// Use platform specific StyleSheet method for creating the styles.
// This enables us to use the css``/css({}) in any environment (Native | Sketch | Web)
export function createCss(StyleSheet: Stylesheet): any {
  return function css(...args: any[]): any {
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

    //@ts-ignore
    vals.forEach(handleInterpolation, this);

    return StyleSheet.flatten(styles as any);
  };
}

function transformObject(styles: Style) {
  const trans = Object.keys(styles).reduce((acc, key) => {
    if (typeof styles[key] === 'object') {
      const pairs = Object.entries(styles[key]);
      acc[key] = transformNative(pairs);
      return acc;
    } else {
      const pair: StyleTuple = [key, styles[key]];
      return {
        ...acc,
        ...transformNative([pair]),
      };
    }
  }, {} as Style);

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
    return undefined;
  }
}
