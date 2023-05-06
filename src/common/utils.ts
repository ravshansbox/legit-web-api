export const objectKeys = <T extends Record<string, unknown>, K = keyof T>(
  input: T
) => {
  return Object.keys(input) as unknown as K[];
};

export const omitProps = <T extends Record<string, unknown>, K extends keyof T>(
  input: T,
  keys: K[]
) => {
  return objectKeys(input).reduce((agg, key) => {
    if (!keys.includes(key as K)) {
      (agg as any)[key] = input[key];
    }
    return agg;
  }, {} as Omit<T, K>);
};
