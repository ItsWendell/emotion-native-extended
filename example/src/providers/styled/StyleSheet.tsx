import EStyleSheet from 'react-native-extended-stylesheet';
import mediaQuery from 'css-mediaquery';
import { ReactNativeStyle, Stylesheet } from './types/StyleSheet';

export const findBreakpoints = (
  emotionStyles: ReactNativeStyle,
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

export const StyleSheet: Stylesheet = EStyleSheet as any;

StyleSheet.build();
