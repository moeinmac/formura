import { ComponentType, ReactNode } from "react";
import { ZodType, output } from "zod";
import {
  ActionError,
  ActionResult,
  ActionSuccess,
  FormAction,
} from "./action.type";

export type FormValues<TSchema extends ZodType> = output<TSchema>;
export type FormKeys<TSchema extends ZodType> = keyof FormValues<TSchema> &
  string;
export type FieldValue<
  TSchema extends ZodType,
  TName extends FormKeys<TSchema>,
> = FormValues<TSchema>[TName];

export type ErrorElementComponent = ComponentType<{ errorMessage: string }>;

export type FieldWidget =
  | "text"
  | "password"
  | "number"
  | "otp"
  | "select"
  | "multiSelect"
  | "textarea"
  | "checkbox"
  | "date"
  | "time"
  | "datetime";

export type FieldOption = { value: string; label: string };

export type FieldMeta = {
  widget: FieldWidget;
  options?: FieldOption[];
};

export type FormStore<TSchema extends ZodType> = {
  getValues: () => FormValues<TSchema>;
  getFieldValue: <TName extends FormKeys<TSchema>>(
    name: TName,
  ) => FieldValue<TSchema, TName>;
  setFieldValue: <TName extends FormKeys<TSchema>>(
    name: TName,
    value: FieldValue<TSchema, TName>,
  ) => void;
  getErrors: () => Record<string, string>;
  getFieldError: (name: string) => string | undefined;
  setErrors: (errors: Record<string, string>) => void;
  subscribe: (listener: () => void) => () => void;
};

export type RenderFieldProps<
  TSchema extends ZodType<any>,
  TName extends FormKeys<TSchema>,
> = {
  name: TName;
  value: FieldValue<TSchema, TName>;
  onChange: (...event: any[]) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  ref?: (instance: any) => void;
};

export type AdapterFieldProps = {
  name: string;
  value: unknown;
  onChange: (...event: any[]) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  meta: FieldMeta;
  fieldSchema: ZodType;
};

export type AdapterFieldPropsForField<
  TSchema extends ZodType<any>,
  TName extends FormKeys<TSchema>,
> = AdapterFieldProps & {
  name: TName;
  value: FieldValue<TSchema, TName>;
};

export type FieldWrapperProps = {
  name: string;
  label?: string;
  error?: string;
  children: ReactNode;
  ErrorElement?: ErrorElementComponent;
};

export type FormAdapter = {
  renderField: (props: AdapterFieldProps) => ReactNode;
  FieldWrapper?: ComponentType<FieldWrapperProps>;
};

type FieldPropsBase<
  TSchema extends ZodType<any>,
  TName extends FormKeys<TSchema>,
> = {
  name: TName;
  disabled?: boolean;
  label?: string;
  ErrorElement?: ErrorElementComponent;
};

/* Make render prop required if no adapter pass to the form options */
export type FieldPropsWithAdapter<
  TSchema extends ZodType<any>,
  TName extends FormKeys<TSchema> = FormKeys<TSchema>,
> = FieldPropsBase<TSchema, TName> & {
  render?: ({
    field,
  }: {
    field: RenderFieldProps<TSchema, TName>;
  }) => React.ReactNode;
};

export type FieldPropsWithoutAdapter<
  TSchema extends ZodType<any>,
  TName extends FormKeys<TSchema> = FormKeys<TSchema>,
> = FieldPropsBase<TSchema, TName> & {
  render: ({
    field,
  }: {
    field: RenderFieldProps<TSchema, TName>;
  }) => React.ReactNode;
};

export type FieldProps<
  TSchema extends ZodType<any>,
  TName extends FormKeys<TSchema> = FormKeys<TSchema>,
  THasAdapter extends boolean = false,
> = THasAdapter extends true
  ? FieldPropsWithAdapter<TSchema, TName>
  : FieldPropsWithoutAdapter<TSchema, TName>;

export type FieldConfig<
  TSchema extends ZodType<any>,
  TName extends FormKeys<TSchema> = FormKeys<TSchema>,
> = {
  label?: string;
  render?: FieldPropsWithAdapter<TSchema, TName>["render"];
  disabled?: boolean;
  ErrorElement?: ErrorElementComponent;
};

export type CreateFormOptionsBase<TSchema extends ZodType, TData = any> = {
  schema: TSchema;
  action: FormAction<TSchema, TData>;
  defaultValues?: Partial<FormValues<TSchema>>;
  /** Per-field overrides (label, render, etc.) without declaring `<Field />` in JSX */
  fields?: Partial<{ [K in FormKeys<TSchema>]: FieldConfig<TSchema, K> }>;
  GlobalErrorElement?: (props: { errorMessage: string }) => ReactNode;
  onSuccess?: (result: ActionSuccess<TData>) => void;
  onError?: (result: ActionError) => void;
  onSettled?: (result: ActionResult<TData>) => void;
};

export type CreateFormOptions<
  TSchema extends ZodType,
  TData = any,
> = CreateFormOptionsBase<TSchema, TData> & {
  adapter?: FormAdapter;
};

export type CreateFormOptionsWithAdapter<
  TSchema extends ZodType,
  TData = any,
> = CreateFormOptionsBase<TSchema, TData> & {
  adapter: FormAdapter;
};

export type FormReturn<
  TSchema extends ZodType,
  TData = any,
  THasAdapter extends boolean = false,
> = {
  Form: ComponentType<{ children?: ReactNode; className?: string }>;
  Field: <TName extends FormKeys<TSchema>>(
    props: FieldProps<TSchema, TName, THasAdapter>,
  ) => ReactNode;
  useFormState: () => import("./action.type").ActionState<TData>;
};
