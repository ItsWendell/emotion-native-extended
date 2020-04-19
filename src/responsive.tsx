import React from 'react';
import { useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { useCallback } from 'react';
import { AnyObject } from 'react-native-extended-stylesheet';
import { StyleSheet, findBreakpoints } from './StyleSheet';
import memoize from 'lodash.memoize';
import { useMemo } from 'react';
import { useState } from 'react';

const getStylesheet = memoize(
  (styles: AnyObject, _breakpoint: number | undefined) => {
    return StyleSheet.create(styles);
  },
  (styles: AnyObject, _breakpoint: number | undefined) =>
    JSON.stringify(styles) + _breakpoint
);

export const responsiveComponent = (component: React.ComponentType<any>) => ({
  style,
  theme,
  ...props
}: {
  style: any;
  theme: any;
}) => {
  const Component = component;

  const convertedStyles = useMemo<AnyObject>(() => {
    console.count(`Stylesheet: ${component.displayName}`);
    return Object.keys(style).reduce((acc, key) => {
      acc[key.replace('screen and ', '')] = style[key];
      return acc;
    }, {} as AnyObject);
  }, [style]);

  const remValue = useMemo<number>(() => {
    try {
      return Number(StyleSheet.value('$rem'));
    } catch {
      return Number(theme?.rem || 16);
    }
  }, [theme]);

  const breakpoints = useMemo(() => {
    return findBreakpoints(convertedStyles, remValue);
  }, [convertedStyles, remValue]);

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
    if (breakpoints.length) {
      Dimensions.addEventListener('change', onDimesionsChange);
      return () => Dimensions.removeEventListener('change', onDimesionsChange);
    } else {
      return () => null;
    }
  }, [breakpoints]);

  return (
    <Component
      {...props}
      theme={theme}
      style={getStylesheet(convertedStyles, breakpoint)}
    />
  );
};
