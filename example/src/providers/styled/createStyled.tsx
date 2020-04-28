import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { StyleSheet, findBreakpoints } from './StyleSheet';
import { createCss } from './createCss';
import { ThemeContext } from '@emotion/core';
import { interleave } from './utils';
import { Dimensions, ScaledSize } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyledOptions, StyledComponent } from './types';
import { CreateStyled } from './types/base';
import { Theme, ReactNativeStyle, AnyStyle } from './types/StyleSheet';
import memoize from 'lodash.memoize';
import { useHover, useFocus, useActive } from 'react-native-web-hooks';
import { testPickPropsOnOtherComponent } from './test-props';

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
  (
    styles: any,
    _breakpoint: number | undefined,
    _isHovered: boolean,
    _isActive: boolean,
    _isFocused: boolean
  ) => {
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
  }>
>(
  component: T,
  options: StyledOptions<any> = {
    shouldForwardProp: testPickPropsOnOtherComponent,
  }
) => {
  const createStyledComponent = (...rawStyles: any[]) => {
    let styles: EStyleSheet.AnyObject[];

    if (rawStyles[0] == null || rawStyles[0].raw === undefined) {
      styles = rawStyles;
    } else {
      styles = interleave(rawStyles as unknown[][]) as EStyleSheet.AnyObject[];
    }

    const Styled = React.forwardRef<
      typeof component,
      React.ComponentProps<T> & any
    >(({ children, ...props }: React.ComponentProps<T> & any, ref) => {
      const [shouldRef, setShouldRef] = useState(false);
      const theme = useContext(ThemeContext) as Theme;
      const _ref = useRef(ref);
      const isHovered = useHover(shouldRef ? _ref : undefined);
      const isFocused = useFocus(shouldRef ? _ref : undefined);
      const isActive = useActive(shouldRef ? _ref : undefined);

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
            } else {
              switch (key) {
                case ':hover':
                  setShouldRef(true);
                  if (isHovered) {
                    return {
                      ...acc,
                      ...emotionStyles[key],
                    };
                  }
                  return acc;
                case ':active':
                  setShouldRef(true);
                  if (isActive) {
                    return {
                      ...acc,
                      ...emotionStyles[key],
                    };
                  }
                  return acc;
                case ':focused':
                  setShouldRef(true);
                  if (isFocused) {
                    return {
                      ...acc,
                      ...emotionStyles[key],
                    };
                  }
                  return acc;
                default:
                  acc[key] = emotionStyles[key];
                  return acc;
              }
            }
          },
          {}
        );

        return _styles;
      }, [isHovered, isActive, isFocused]);

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

      const sheet = cachedStylesheets(
        extendedStyles,
        breakpoint,
        isHovered,
        isActive,
        isFocused
      );

      const newProps: any = {};

      for (const key in props) {
        if (options.shouldForwardProp(key)) {
          newProps[key] = props[key];
        }
      }

      newProps.style = sheet;
      newProps.children = children;
      newProps.ref = _ref;

      return React.createElement(component, newProps);
    }) as StyledComponent<React.ComponentProps<T>, any>;

    Styled.withComponent = (newComponent: React.ComponentType) => {
      return createStyled(newComponent)(...styles) as any;
    };
    Styled.displayName = `extended(${getDisplayName(component)})`;
    return Styled;
  };
  return createStyledComponent;
};
