import { ComponentPropsWithoutRef, FC } from "react";
import { ZodType, output } from "zod";

export interface ErrorElementProps extends ComponentPropsWithoutRef<"div"> {
  errorMessage: string;
}

export interface CreateFormOptions<TSchema extends ZodType> {
  schema: TSchema;
  action: (formData: FormData) => Promise<any>;
  adapter?: any;
  defaultValues?: Partial<output<TSchema>>;
  GlobalErrorElement?: FC<ErrorElementProps>;
}

export type FormKeys<TSchema extends ZodType<any>> = Extract<keyof output<TSchema>, string>;
export type FormValues = Record<string, any>;

export type FieldValue<TSchema extends ZodType<any>, TName extends FormKeys<TSchema>> = output<TSchema>[TName];

export type RenderFieldProps<TSchema extends ZodType<any>, TName extends FormKeys<TSchema>> = {
  name: TName;
  value: FieldValue<TSchema, TName>;
  onChange: (e: any[]) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  ref?: (instance: any) => void;
};

export type FieldProps<TSchema extends ZodType<any>, TName extends FormKeys<TSchema> = FormKeys<TSchema>> = {
  name: TName;
  render: ({ field }: { field: RenderFieldProps<TSchema, TName> }) => React.ReactNode;
  disabled?: boolean;
  label?: string;
  ErrorElement?: FC<ErrorElementProps>;
};
