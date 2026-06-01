import { ServerAction, TaggedServerAction } from "./types";
export type { ActionResult, ActionSuccess, ActionError } from "./types/action.type";

/**
 * Tag a Next.js server action so formura can route it correctly.
 *
 * @example
 * // app/actions.ts
 * "use server";
 * export const submit = asServerAction(async (prevState, formData) => { ... });
 */
export const asServerAction = <TData = any>(fn: ServerAction<TData>): TaggedServerAction<TData> =>
  Object.assign(fn, { _tag: "SERVER_ACTION" as const });
