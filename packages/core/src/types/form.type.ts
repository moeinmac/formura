import { ComponentType, ReactNode } from "react";
import { ZodType, output } from "zod";
import { ActionError, ActionResult, ActionSuccess, FormAction } from "./action.type";

export type FormValues<TSchema extends ZodType> = output<TSchema>;
export type FormKeys<TSchema extends ZodType> = keyof FormValues<TSchema> & string;
export type FieldValue<TSchema extends ZodType, TName extends FormKeys<TSchema>> = FormValues<TSchema>[TName];

export type ErrorElementComponent = ComponentType<{ errorMessage: string }>;

export type FormStore<TSchema extends ZodType> = {
  getValues: () => FormValues<TSchema>;
  getFieldValue: <TName extends FormKeys<TSchema>>(name: TName) => FieldValue<TSchema, TName>;
  setFieldValue: <TName extends FormKeys<TSchema>>(name: TName, value: FieldValue<TSchema, TName>) => void;
  getErrors: () => Record<string, string>;
  getFieldError: (name: string) => string | undefined;
  setErrors: (errors: Record<string, string>) => void;
  subscribe: (listener: () => void) => () => void;
};

export type RenderFieldProps<TSchema extends ZodType<any>, TName extends FormKeys<TSchema>> = {
  name: TName;
  value: FieldValue<TSchema, TName>;
  onChange: (...event: any[]) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  ref?: (instance: any) => void;
};

export type FieldProps<TSchema extends ZodType<any>, TName extends FormKeys<TSchema> = FormKeys<TSchema>> = {
  name: TName;
  render: ({ field }: { field: RenderFieldProps<TSchema, TName> }) => React.ReactNode;
  disabled?: boolean;
  label?: string;
  ErrorElement?: ErrorElementComponent;
};

export type CreateFormOptions<TSchema extends ZodType, TData = any> = {
  schema: TSchema;
  action: FormAction<TSchema, TData>;
  defaultValues?: Partial<FormValues<TSchema>>;
  GlobalErrorElement?: (props: { errorMessage: string }) => ReactNode;
  onSuccess?: (result: ActionSuccess<TData>) => void;
  onError?: (result: ActionError) => void;
  onSettled?: (result: ActionResult<TData>) => void;
};
