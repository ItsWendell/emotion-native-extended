import { ComponentProps } from 'react';

export const testAlwaysTrue = (): boolean => true;

export const pickAssign = (
  shouldPick: (key: string) => boolean,
  sources: ComponentProps<any>[]
) =>
  sources.reduce((picked, source) => {
    for (const key in source) {
      if (shouldPick(key)) {
        picked[key] = source[key];
      }
    }
    return picked;
  }, {});

export const interleave = (vals: Array<unknown[]>): Array<unknown> => {
  const strings: unknown[] = vals[0];
  const finalArray: unknown[] = [strings[0]];
  for (let i = 1, len = vals.length; i < len; i++) {
    finalArray.push(vals[i]);
    if (strings[i] !== undefined) {
      finalArray.push(strings[i]);
    }
  }
  return finalArray;
};
