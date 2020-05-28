import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import { StyleSheet, findBreakpoints } from './StyleSheet';
import { ThemeContext } from '@emotion/core';
import { interleave } from './utils';
import { Dimensions, ScaledSize } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyledOptions, StyledComponent } from './types';
import { CreateStyled } from './types/base';
import { Theme, ReactNativeStyle, AnyStyle } from './types/StyleSheet';
import memoize from 'lodash.memoize';
import { testPickPropsOnOtherComponent } from './test-props';
import { createCss } from './createCss';

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

const cachedStylesheets = memoize(
  (styles: any, _breakpoint: number | undefined) => {
    return StyleSheet.create({
      styles,
    }).styles as any;
  },
  (...args) => JSON.stringify(args)
);

export const createStyled: CreateStyled = <
  T extends React.ComponentType<{
    theme?: Theme;
    style?: AnyStyle;
  }> & {
    $$emotion_styles?: AnyStyle[];
  }
>(
  component: T,
  options: StyledOptions<any> = {
    shouldForwardProp: testPickPropsOnOtherComponent,
  }
) => {
  const createStyledComponent = (...rawStyles: any[] | any) => {
    let styles: EStyleSheet.AnyObject[];
    const shouldForwardProp =
      options.shouldForwardProp || testPickPropsOnOtherComponent;

    if (rawStyles[0] == null || rawStyles[0].raw === undefined) {
      styles = rawStyles;
    } else {
      styles = interleave(rawStyles as unknown[][]) as EStyleSheet.AnyObject[];
    }

    if (component.$$emotion_styles) {
      styles = styles.concat(...component.$$emotion_styles);
    }

    const Styled = React.forwardRef<
      typeof component & {
        $$emotion_styles: AnyStyle[];
      },
      React.ComponentProps<T>
    >(({ children, ...props }: React.ComponentProps<T> & any, ref) => {
      console.time('theme');
      const theme = useContext(ThemeContext) as Theme;
      console.timeEnd('theme');

      let mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (const key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = theme;
      }

      let stylesWithStyleProp = styles;
      if (props.style) {
        stylesWithStyleProp = styles.concat(props.style);
      }

      const emotionStyles = css.apply(mergedProps, stylesWithStyleProp);

      const extendedStyles = useMemo<ReactNativeStyle>(() => {
        if (!emotionStyles) return {};

        const _styles = Object.keys(emotionStyles).reduce<any>(
          (acc: any, key) => {
            // Adds support for `screen` media queries to support Styled System
            // @see https://github.com/styled-system/styled-system/pull/1133
            // @see https://github.com/vitalets/react-native-extended-stylesheet/pull/132
            if (key.includes('@media')) {
              acc[key.replace('screen and', '')] = emotionStyles[key];
              return acc;
            }
            acc[key] = emotionStyles[key];
            return acc;
          },
          {}
        );

        return _styles;
      }, [emotionStyles]);

      const remValue = useMemo<number>(() => {
        try {
          return Number(StyleSheet.value('$rem'));
        } catch {
          return Number(theme?.rem || 16);
        }
      }, [theme]);

      const breakpoints = useMemo(() => {
        return findBreakpoints(extendedStyles, remValue);
      }, [extendedStyles, remValue]);

      const getBreakpoint = useCallback(
        (width: number): number | undefined => {
          return (breakpoints || []).find((item: number) => width < item);
        },
        [breakpoints]
      );

      const [breakpoint, setBreakpoint] = useState<number | undefined>(
        getBreakpoint(Dimensions.get('window').width)
      );

      const onDimesionsChange = useCallback(
        ({ window }: { window: ScaledSize; screen: ScaledSize }) => {
          setBreakpoint(getBreakpoint(window.width));
        },
        [getBreakpoint]
      );

      useEffect(() => {
        if (breakpoints.length) {
          Dimensions.addEventListener('change', onDimesionsChange);
          return () =>
            Dimensions.removeEventListener('change', onDimesionsChange);
        } else {
          return () => null;
        }
      }, [breakpoints]);

      const sheet = cachedStylesheets(extendedStyles, breakpoint);

      const newProps: any = {};

      for (const key in props) {
        if (shouldForwardProp(key)) {
          newProps[key] = props[key];
        }
      }

      newProps.style = sheet;
      newProps.children = children;
      newProps.ref = ref;

      return React.createElement(component, newProps);
    }) as StyledComponent<React.ComponentProps<T>, any>;

    Styled.withComponent = (newComponent: React.ComponentType) => {
      return createStyled(newComponent)(...(styles as any)) as any;
    };

    Styled.displayName = `extended(${getDisplayName(component)})`;

    return Styled;
  };
  return createStyledComponent;
};
