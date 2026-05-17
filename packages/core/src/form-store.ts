import { FieldValues } from "./types";

export type FormStore = {
  getValues: () => FieldValues;
  getFieldValue: (name: string) => any;
  setFieldValue: (name: string, value: any) => void;
  getErrors: () => Record<string, string>;
  getFieldError: (name: string) => string | undefined;
  setFieldError: (name: string, error: string | undefined) => void;
  setErrors: (errors: Record<string, string>) => void;
  subscribe: (listener: () => void) => () => void;
};

export const createFormStore = (initialValues: FieldValues): FormStore => {
  let values: FieldValues = { ...initialValues };
  let errors: Record<string, string> = {};
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach((listener) => listener());

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
    setFieldError: (name, error) => {
      if (errors[name] === error) return;
      if (error) errors[name] = error;
      else delete errors[name];
      notify();
    },
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
