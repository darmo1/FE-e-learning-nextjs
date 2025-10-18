export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true; // null o undefined
  if (typeof value === "string" && value.trim().length === 0) return true; // String vacío o espacios
  if (Array.isArray(value) && value.length === 0) return true; // Array vacío
  if (typeof value === "object" && Object.keys(value).length === 0) return true; // Objeto vacío
  return false;
}

export function resolvePath(path: string, params: Record<string, string>) {
  return path.replace(/\[(\w+)\]/g, (_, key) => params[key] || `[${key}]`);
}

export function normalizeParams(params: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
}
