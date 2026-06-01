import type { z, ZodType } from "zod";

export type ActionSuccess<TData = any> = {
  readonly status: "success";
  readonly data?: TData;
  readonly message?: string;
};

export type ActionError = {
  readonly status: "error";
  readonly message?: string;
  readonly fieldErrors?: Record<string, string>;
};

export type ActionResult<TData = any> = ActionSuccess<TData> | ActionError;

export type ClientAction<TSchema extends ZodType, TData = any> = (values: z.infer<TSchema>, formData: FormData) => Promise<ActionResult<TData>>;

export type ServerAction<TData = any> = (prevState: ActionResult<TData> | null, formData: FormData) => Promise<ActionResult<TData>>;

export type TaggedServerAction<TData = any> = ServerAction<TData> & {
  readonly _tag: "SERVER_ACTION";
};

export type TaggedClientAction<TSchema extends ZodType, TData = any> = ClientAction<TSchema, TData> & {
  readonly _tag: "CLIENT_ACTION";
};

export type FormAction<TSchema extends ZodType, TData = any> = TaggedServerAction<TData> | TaggedClientAction<TSchema, TData>;

export type ActionState<TData = any> = {
  readonly result: ActionResult<TData> | null;
  readonly isSubmitting: boolean;
  readonly submitCount: number;
};

export type ActionEvent<TData = any> =
  | { readonly type: "SUBMIT_START" }
  | { readonly type: "SUBMIT_END"; readonly result: ActionResult<TData> }
  | { readonly type: "RESET" };
