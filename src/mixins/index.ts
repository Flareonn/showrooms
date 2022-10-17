export const omitEmptyValues = (object?: object) => {
  if (!object) return undefined;
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== "")
  );
};
