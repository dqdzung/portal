export interface BaseModel {
  id: number;
  createdAt?: DateTime;
  updatedAt?: DateTime;
  deletedAt?: DateTime;
}

export enum ModelTypes {
  user = 'users',
  system = 'systems',
  systemGroup = 'systemGroups'
}

export type PropertyType =
  | 'boolean'
  | 'string'
  | 'number'
  | 'numberArray'
  | 'stringArray'
  | 'datetime';

export const BOOLEAN_OPERATORS = ['equal'] as const;
export const STRING_OPERATORS = [
  'contain',
  'not_contain',
  'start_with',
  'end_with',
  'equal',
  'not_equal'
] as const;
export const NUMBER_OPERATORS = [
  'equal',
  'not_equal',
  'greater_than',
  'greater_than_or_equal',
  'less_than',
  'less_than_or_equal'
] as const;
export const ARRAY_OPERATORS = ['in', 'not_in'] as const;
export const DATETIME_OPERATORS = [
  'between',
  'greater_than',
  'greater_than_or_equal',
  'less_than',
  'less_than_or_equal'
] as const;

export type BooleanOperator = typeof BOOLEAN_OPERATORS[number];
export type StringOperator = typeof STRING_OPERATORS[number];
export type NumberOperator = typeof NUMBER_OPERATORS[number];
export type ArrayOperator = typeof ARRAY_OPERATORS[number];
export type DateTimeOperator = typeof DATETIME_OPERATORS[number];

export type DateTime = Date | string | number | null;
