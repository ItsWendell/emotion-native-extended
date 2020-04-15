import EStyleSheet from "react-native-extended-stylesheet";
import mediaQuery from "css-mediaquery";

export type StyleSheetWithSheets = {
    sheets: Array<Record<string, Record<string, string>>>;
}

export const findBreakpoints = (emotionStyles: EStyleSheet.AnyObject, remValue: number): Array<number> => {
    const allMedia = Object.keys(emotionStyles).filter((item) => item.startsWith('@media') && item.includes('width'));

    const mediaValues = allMedia.reduce((acc, item) => {
        const data: mediaQuery.AST = mediaQuery.parse(item);
        data.map((item) => {
            item.expressions.map((exp) => {
                if (exp.value.includes("rem") || exp.value.includes("em")) {
                    acc.add(parseInt(exp.value) * remValue);
                } else {
                    acc.add(parseInt(exp.value));
                }
            })
        })
        return acc;
    }, new Set());

    return (Array.from(mediaValues) as Array<number>).sort();
};

export const StyleSheet: (typeof EStyleSheet & StyleSheetWithSheets) = EStyleSheet as any;

StyleSheet.build();