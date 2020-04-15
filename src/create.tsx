import React, {
  useState,
  useEffect,
  useMemo,
  ComponentPropsWithRef,
  useCallback,
} from 'react';
import { StyleSheet, findBreakpoints } from './StyleSheet';
import { createCss } from '@emotion/primitives-core';
import { ThemeContext } from '@emotion/core';
import { interleave, pickAssign } from './utils';
import { Dimensions, ScaledSize } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import memoize from 'lodash.memoize';
import { CreateStyled, StyledOptions, StyledComponent } from './types';

const defaultPickTest = (prop: string): boolean =>
  prop !== 'theme' && prop !== 'innerRef';

const css = createCss(StyleSheet);

export type Interpolations = Array<any>;

export interface StyledForwardRefExoticComponent<T>
  extends React.ForwardRefExoticComponent<T> {
  withComponent?: any;
}

export type RawStyles = {
  raw: string | undefined;
};

const getDisplayName = (primitive: string | React.ComponentType<any>): string =>
  typeof primitive === 'string'
    ? primitive
    : primitive?.displayName || primitive?.name || 'Styled';

const getStylesheet = memoize(
  (styles: EStyleSheet.AnyObject, _breakpoint: number | undefined) => {
    return StyleSheet.create(styles);
  },
  (styles: EStyleSheet.AnyObject, _breakpoint: number | undefined) =>
    JSON.stringify(styles) + _breakpoint
);

const customComponent = (component: React.ComponentType<any>) => ({
  innerStyle,
  theme,
  ...props
}: {
  innerStyle: any;
  theme: any;
}) => {
  const Component = component;

  const breakpoints = useMemo(() => {
    return findBreakpoints(innerStyle, 16);
  }, [innerStyle]);

  const getBreakpoint = useCallback(
    (width: number): number | undefined => {
      return (breakpoints || []).find(item => width < item);
    },
    [breakpoints]
  );

  const [breakpoint, setBreakpoint] = useState<number | undefined>(
    getBreakpoint(Dimensions.get('window').width)
  );

  const discoverResizes = ({
    window,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => {
    setBreakpoint(getBreakpoint(window.width));
  };

  useEffect(() => {
    if (breakpoints.length) {
      Dimensions.addEventListener('change', discoverResizes);
      return () => Dimensions.removeEventListener('change', discoverResizes);
    } else {
      return () => null;
    }
  }, [breakpoints]);

  return <Component {...props} style={getStylesheet(innerStyle, breakpoint)} />;
};

export const createStyled: CreateStyled = (
  component: React.ComponentType<any>,
  options: StyledOptions = {
    shouldForwardProp: defaultPickTest,
  }
) => {
  const createStyledComponent = (...rawStyles: any[]) => {
    console.log('RAW STYLES', rawStyles);
    let styles: EStyleSheet.AnyObject[];

    if (rawStyles[0] == null || rawStyles[0].raw === undefined) {
      console.log('DON NOT INTERLEAVE');
      styles = rawStyles;
    } else {
      styles = interleave(rawStyles as unknown[][]) as EStyleSheet.AnyObject[];
    }

    const Styled = React.forwardRef(
      (props: ComponentPropsWithRef<typeof component>, ref) => {
        return (
          <ThemeContext.Consumer>
            {(theme): React.ReactElement => {
              const mergedProps = {
                ...props,
                theme: props.theme || theme,
              };

              let stylesWithStyleProp = styles;
              if (props.style) {
                stylesWithStyleProp = styles.concat(props.style);
              }
              let emotionStyles: EStyleSheet.AnyObject = css.apply(
                mergedProps,
                stylesWithStyleProp
              );

              if (process.env.NODE_ENV !== 'production' && props.innerRef) {
                console.error(
                  'innerRef is no longer supported, please use ref instead'
                );
              }

              // NOTE: Fix for styled system not supporting custom media queries.
              emotionStyles = Object.keys(emotionStyles).reduce((acc, key) => {
                acc[key.replace('screen and ', '')] = emotionStyles[key];
                return acc;
              }, {} as EStyleSheet.AnyObject);

              return React.createElement(
                customComponent(component),
                pickAssign(options.shouldForwardProp || defaultPickTest, [
                  props,
                  {
                    ref: ref,
                    innerStyle: emotionStyles,
                  },
                ])
              );
            }}
          </ThemeContext.Consumer>
        );
      }
    ) as StyledComponent<any, any, any>;

    Styled.withComponent = (newComponent: React.ComponentType) => {
      return createStyled(newComponent)(...styles) as any;
    };
    Styled.displayName = `emotion(${getDisplayName(component)})`;
    Styled.__emotion_styles = styles;
    return Styled;
  };
  return createStyledComponent;
};
