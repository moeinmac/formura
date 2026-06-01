import type { ZodType } from "zod";
import { FormStore, FormValues } from "../types";

export const createFormStore = <TSchema extends ZodType>(initialValues: Partial<FormValues<TSchema>>): FormStore<TSchema> => {
  let values = { ...initialValues } as FormValues<TSchema>;
  let errors: Record<string, string> = {};
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach((l) => l());

  return {
    getValues: () => values,
    getFieldValue: (name) => values[name],
    setFieldValue: (name, value) => {
      if (values[name] === value) return;
      values[name] = value;
      if (errors[name]) delete errors[name];
      notify();
    },
    getErrors: () => errors,
    getFieldError: (name) => errors[name],
    setErrors: (newErrors) => {
      errors = newErrors;
      notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};
