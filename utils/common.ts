export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true; // null o undefined
  if (typeof value === "string" && value.trim().length === 0) return true; // String vacío o espacios
  if (Array.isArray(value) && value.length === 0) return true; // Array vacío
  if (typeof value === "object" && Object.keys(value).length === 0) return true; // Objeto vacío
  return false;
}
