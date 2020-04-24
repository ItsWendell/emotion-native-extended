import React, { useContext } from 'react';
import { ThemeContext } from '@emotion/core';
import { useEffect } from 'react';
import { Dimensions, ScaledSize, Platform } from 'react-native';
import { useCallback } from 'react';
import { Theme, ReactNativeStyle, AnyStyle } from './types/StyleSheet';
import { StyleSheet, findBreakpoints } from './StyleSheet';
import memoize from 'lodash.memoize';
import { useMemo } from 'react';
import { useState } from 'react';

const getStylesheet = memoize(
  (styles: any, _breakpoint: number | undefined) => {
    return StyleSheet.create(styles) as any;
  },
  (styles: any, _breakpoint: number | undefined) =>
    JSON.stringify(styles) + _breakpoint
);

type AnyProps = {
  style: AnyStyle;
  [key: string]: any;
} & any;

function withResponsive<T extends React.ComponentClass<any>>(
  Component: T
): React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<T> & {
    ref?: React.Ref<InstanceType<T>>;
  } & AnyProps
>;
function withResponsive<P extends AnyProps & { ref?: React.Ref<any> }>(
  Component: React.ForwardRefExoticComponent<P & AnyProps>
): React.ForwardRefExoticComponent<P & AnyProps>;
function withResponsive<P = AnyProps>(
  Component: React.FunctionComponent<P & AnyProps>
): React.ForwardRefExoticComponent<P & AnyProps>;
function withResponsive<P = AnyProps>(
  Component: React.ComponentType<P & AnyProps>
) {
  // I don't know how to implement this without breaking out of the types.
  // The overloads are ensuring correct usage, so we should be good?
  return React.forwardRef<typeof Component, P & AnyProps>(
    ({ style, ...props }, ref) => {
      const theme = useContext(ThemeContext) as Theme;
      const styles = useMemo<ReactNativeStyle>(() => {
        if (!style) return {};

        // Adds support for `screen` media queries to support Styled System
        // @see https://github.com/styled-system/styled-system/pull/1133
        // @see https://github.com/vitalets/react-native-extended-stylesheet/pull/132
        const _styles = Object.keys(style).reduce<AnyStyle>(
          (acc: AnyStyle, key) => {
            acc[key.replace('screen', Platform.OS)] = style[key];
            return acc;
          },
          {}
        );

        return _styles;
      }, [style]);

      const remValue = useMemo<number>(() => {
        try {
          return Number(StyleSheet.value('$rem'));
        } catch {
          return Number(theme?.rem || 16);
        }
      }, [theme]);

      const breakpoints = useMemo(() => {
        return findBreakpoints(styles, remValue);
      }, [styles, remValue]);

      const getBreakpoint = useCallback(
        (width: number): number | undefined => {
          return (breakpoints || []).find(item => width < item);
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

      return (
        <Component
          ref={ref}
          style={getStylesheet(styles, breakpoint)}
          {...props}
        />
      );
    }
  );
}

export { withResponsive };
