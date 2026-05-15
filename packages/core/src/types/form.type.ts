import { ComponentPropsWithoutRef, FC, type ReactElement } from "react";
import { ZodType, output } from "zod";

export interface ErrorElementProps extends ComponentPropsWithoutRef<"div"> {
  errorMessage: string;
}

export interface CreateFormOptions<TSchema extends ZodType> {
  schema: TSchema;
  action: (formData: FormData) => Promise<any>;
  adapter?: any;
  defaultValues?: output<TSchema>;
  errorElement?: FC<ErrorElementProps>;
}

export type FormValues = Record<string, any>;
