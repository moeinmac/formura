import type { ZodType } from "zod";
import type { ClientAction, FormAction, ServerAction, TaggedClientAction, TaggedServerAction } from "../types";

/**
 * Tag a client-side action so formura can route it correctly.
 *
 * @example
 * const action = asClientAction(async (values, formData) => { ... });
 */
export const asClientAction = <TSchema extends ZodType, TData = any>(fn: ClientAction<TSchema, TData>): TaggedClientAction<TSchema, TData> =>
  Object.assign(fn, { _tag: "CLIENT_ACTION" as const });

export const isServerAction = (action: FormAction<never, any>): action is TaggedServerAction<any> => action._tag === "SERVER_ACTION";

export const isClientAction = (action: FormAction<never, any>): action is TaggedClientAction<never, any> => action._tag === "CLIENT_ACTION";

const appendValue = (formData: FormData, key: string, value: any): void => {
  if (value === null || value === undefined) return;

  if (value instanceof File || value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, i) => appendValue(formData, `${key}[${i}]`, item));
    return;
  }

  if (typeof value === "object") {
    Object.entries(value as Record<string, any>).forEach(([k, v]) => appendValue(formData, `${key}.${k}`, v));
    return;
  }

  formData.append(key, String(value));
};

export const toFormData = (values: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => appendValue(formData, key, value));
  return formData;
};

export const isSuccess = <TData>(result: any): result is Extract<{ status: "success"; data?: TData }, any> =>
  typeof result === "object" && result !== null && (result as Record<string, any>)["status"] === "success";

export const isError = (result: any): result is { status: "error"; message?: string; fieldErrors?: Record<string, string> } =>
  typeof result === "object" && result !== null && (result as Record<string, any>)["status"] === "error";
