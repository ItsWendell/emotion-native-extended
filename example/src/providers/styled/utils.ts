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
