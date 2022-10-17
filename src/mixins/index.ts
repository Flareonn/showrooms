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
