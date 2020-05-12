import React, {
  useState,
  useEffect,
  useMemo,
  ComponentPropsWithRef,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { StyleSheet, findBreakpoints } from './StyleSheet';
import { createCss } from '@emotion/primitives-core';
import { ThemeContext } from '@emotion/core';
import { interleave, pickAssign } from './utils';
import { Dimensions, ScaledSize, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyledOptions, CreateStyledComponent, StyledComponent } from './types';
import { CreateStyled } from './types/base';
import { Theme, ReactNativeStyle, AnyStyle } from 'types/StyleSheet';
import memoize from 'lodash.memoize';
import { useHover, useFocus, useActive } from 'react-native-web-hooks';

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

export const createStyled: CreateStyled = <
  T extends React.ComponentType<{
    theme?: Theme;
    style?: AnyStyle;
  }>
>(
  component: T,
  options: StyledOptions<any> = {
    shouldForwardProp: defaultPickTest,
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
    >(
      (
        { style, children, ...props }: ComponentPropsWithRef<typeof component>,
        ref
      ) => {
        console.log('incoming', style);
        const [shouldRef, setShouldRef] = useState(false);
        const theme = useContext(ThemeContext) as Theme;
        const _ref = useRef(ref);
        const isHovered = useHover(_ref);
        const isFocused = useFocus(_ref);
        const isActive = useActive(_ref);

        const mergedProps = {
          ...props,
          theme: props.theme || theme,
        };

        let stylesWithStyleProp = styles;
        if (style) {
          stylesWithStyleProp = styles.concat(style);
        }

        let emotionStyles: any = css.apply(mergedProps, stylesWithStyleProp);

        const extendedStyles = useMemo<ReactNativeStyle>(() => {
          if (!style) return {};

          const _styles = Object.keys(emotionStyles).reduce<any>(
            (acc: any, key) => {
              // Adds support for `screen` media queries to support Styled System
              // @see https://github.com/styled-system/styled-system/pull/1133
              // @see https://github.com/vitalets/react-native-extended-stylesheet/pull/132
              if (key.includes('@media')) {
                acc[key.replace('screen', Platform.OS)] = style[key];
                return acc;
              } else {
                switch (key) {
                  case ':hover':
                    console.log('HOVER', isHovered);
                    setShouldRef(true);
                    if (isHovered) {
                      return {
                        ...acc,
                        ...style[key],
                      };
                    }
                    break;
                  case ':active':
                    setShouldRef(true);
                    if (isActive) {
                      return {
                        ...acc,
                        ...style[key],
                      };
                    }
                    break;
                  case ':focused':
                    setShouldRef(true);
                    if (isFocused) {
                      return {
                        ...acc,
                        ...style[key],
                      };
                    }
                    break;
                  default:
                    acc[key] = style[key];
                    return acc;
                }
                acc[key] = style[key];
                return acc;
              }
            },
            {}
          );

          return _styles;
        }, [style, isHovered, isActive, isFocused]);

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
            StyleSheet.build({
              $theme: getBreakpoint(window.width),
            });
            setBreakpoint(getBreakpoint(window.width));
          },
          [getBreakpoint]
        );

        useEffect(() => {
          if (style && breakpoints.length) {
            Dimensions.addEventListener('change', onDimesionsChange);
            return () =>
              Dimensions.removeEventListener('change', onDimesionsChange);
          } else {
            return () => null;
          }
        }, [breakpoints]);

        const cachedStylesheets = memoize(
          (
            _styles: any,
            _breakpoint: number | undefined,
            _isHovered: boolean,
            _isActive: boolean,
            _isFocused: boolean
          ) => {
            return StyleSheet.create({
              _styles,
            })._styles as any;
          },
          (...args) => JSON.stringify(args)
        );

        // console.log(
        //   Component.displayName,
        //   `[Hovered]: ${isHovered} | [shouldForward]: ${shouldRef}`,
        //   _ref,
        //   styles,
        //   cachedStylesheets.cache
        // );

        const sheet = cachedStylesheets(
          extendedStyles,
          breakpoint,
          isHovered,
          isActive,
          isFocused
        );

        console.log('SHEET', sheet, StyleSheet.sheets);

        return React.createElement(
          component,
          pickAssign(options.shouldForwardProp || defaultPickTest, [
            props,
            {
              ref: !shouldRef ? ref : _ref,
              style: sheet,
            },
          ])
        );
      }
    ) as StyledComponent<React.ComponentProps<T>, any>;

    Styled.withComponent = (newComponent: React.ComponentType) => {
      return createStyled(newComponent)(...styles) as any;
    };
    Styled.displayName = `emotion(${getDisplayName(component)})`;
    return Styled;
  };
  return createStyledComponent;
};
