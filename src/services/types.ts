/**
 * Normalized envelope returned by every server action so UI code can rely on
 * a single `{ success, data, message }` contract.
 */
export type ActionSuccess<T> = {
  success: true;
  data: T;
  message: string;
  error?: null;
};

export type ActionFailure = {
  success: false;
  data?: null;
  message: string;
  error?: unknown;
};

export type ActionResult<T = unknown> = ActionSuccess<T> | ActionFailure;

export const actionSuccess = <T>(data: T, message = "OK"): ActionSuccess<T> => ({
  success: true,
  data,
  message,
});

export const actionFailure = (message: string, error?: unknown): ActionFailure => ({
  success: false,
  data: null,
  message,
  error: serializeError(error),
});

/** Server actions must return serializable values; Error instances are not. */
const serializeError = (error: unknown) => {
  if (error instanceof Error) return { name: error.name, message: error.message };
  return error;
};
