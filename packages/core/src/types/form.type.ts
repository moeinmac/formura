import { ComponentPropsWithoutRef, FC, RefCallback, type ReactElement } from "react";
import { ZodType, output } from "zod";
import { ArrayPath, Path, PathValueImpl } from "./helper.type";

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
export type FieldValues = Record<string, any>;

export type PathValue<T, P extends Path<T> | ArrayPath<T>> = PathValueImpl<T, P>;

export type FieldPath<TFieldValues extends FieldValues = FieldValues> = Path<TFieldValues>;
export type FieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = PathValue<TFieldValues, TFieldPath>;

type RenderFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  onChange: (...event: any[]) => void;
  onBlur?: () => {};
  value: FieldPathValue<TFieldValues, TName>;
  disabled?: boolean;
  name: TName;
  ref: RefCallback<TName>;
};

export interface FieldProps<
  FieldNames,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: FieldNames;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  render: ({ field }: { field: RenderFieldProps<TFieldValues, TName> }) => React.ReactElement;
}
