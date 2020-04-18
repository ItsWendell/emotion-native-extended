import EStyleSheet, { AnyObject } from 'react-native-extended-stylesheet';
import mediaQuery from 'css-mediaquery';
import { ExtendedStyleSheet } from './types';

export const findBreakpoints = (
  emotionStyles: AnyObject,
  remValue: number
): Array<number> => {
  const allMedia = Object.keys(emotionStyles).filter(
    item => item.startsWith('@media') && item.includes('width')
  );

  const mediaValues = allMedia.reduce((acc, item) => {
    const data: mediaQuery.AST = mediaQuery.parse(item);
    data.forEach(item => {
      item.expressions.forEach(exp => {
        if (exp.value.includes('rem') || exp.value.includes('em')) {
          acc.add(parseInt(exp.value) * remValue);
        } else {
          acc.add(parseInt(exp.value));
        }
      });
    });
    return acc;
  }, new Set());

  return (Array.from(mediaValues) as Array<number>).sort();
};

export const StyleSheet: ExtendedStyleSheet = EStyleSheet as any;

StyleSheet.build();
