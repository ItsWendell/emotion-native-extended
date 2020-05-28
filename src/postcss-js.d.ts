import { Root } from 'postcss';

export type StyleTuple = [string, any];

export interface Style {
  [key: string]: string | number | Style;
}

export function getPropertyName(name: string): string;
export function getStylesForProperty(
  name: string,
  value: string,
  allowShorthand?: boolean
): Style;

export function parse(object: Style): Root;

export function objectify(root: Root): Style;
