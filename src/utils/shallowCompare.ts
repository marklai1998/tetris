export const shallowCompare = <
  T extends Record<string, unknown>,
  T2 extends Record<string, unknown>
>(
  obj1: T,
  obj2: T2
) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every((key) => obj1[key] === obj2[key])
