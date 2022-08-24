import { EntryType } from "../types";

const assertNever = (item: never, message: string): never => {
  throw new Error(message + JSON.stringify(item));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
  if (!Date.parse(date)) return false;

  return date.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

export { assertNever, isString, isNumber, isDate, isEntryType };
