export const omitEmptyValues = (object: object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v.length || typeof v === "number")
  );
};

export const toStringValues = (
  object: Record<string | number | symbol, string | number | []>
) => {
  return Object.fromEntries(
    Object.entries(object).map(([_, v]) => [_, v.toString()])
  );
};

export const cacheFunction = async <R extends string | number | symbol, T>(
  property: R,
  record: Record<R, T>,
  cb: () => Promise<T>
) => {
  if (!(property in record)) {
    record[property] = await cb();
  }
  return record[property];
};
