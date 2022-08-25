export const assertNever = (item: never): never => {
  throw new Error('Switch case missing: ' + JSON.stringify(item));
};
