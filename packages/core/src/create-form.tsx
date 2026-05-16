import React, { createContext, useContext, useRef, useSyncExternalStore } from "react";
import { output, ZodType } from "zod";
import ErrorElement from "./error-element";
import { createFormStore, type FormStore } from "./form-store";
import { CreateFormOptions } from "./types";
import { flattenErrors } from "./utils";

export const createForm = <TSchema extends ZodType>(options: CreateFormOptions<TSchema>) => {
  const FormStoreContext = createContext<FormStore | null>(null);

  const Form = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const storeRef = useRef(createFormStore(options.defaultValues ?? {}));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      const currentValues = storeRef.current.getValues();
      const result = options.schema.safeParse(currentValues);

      if (!result.success) {
        e.preventDefault();
        const formattedErrors = flattenErrors(result.error);
        storeRef.current.setErrors(formattedErrors);
      }
    };

    return (
      <FormStoreContext.Provider value={storeRef.current}>
        <form action={options.action} onSubmit={handleSubmit} className={className}>
          {children}
        </form>
      </FormStoreContext.Provider>
    );
  };

  const Field = ({ name, label, placeholder }: { name: keyof output<TSchema>; label?: string; placeholder?: string }) => {
    const store = useContext(FormStoreContext);
    if (!store) throw new Error("Field Wrapped With Form Element");

    const value = useSyncExternalStore(
      (notify) => store.subscribe(notify),
      () => store.getFieldValue(name as string) ?? "",
      () => "",
    );
    const error = useSyncExternalStore(
      (notify) => store.subscribe(notify),
      () => store.getFieldError(name as string),
      () => undefined,
    );

    return (
      <div className="formura-field-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {label && <label htmlFor={name as string}>{label}</label>}
        <input
          id={name as string}
          name={name as string}
          value={value}
          placeholder={placeholder}
          onChange={(e) => store.setFieldValue(name as string, e.target.value)}
          style={{ borderColor: error ? "red" : "initial" }}
        />
        <ErrorElement error={error} GlobalErrorElement={options.GlobalErrorElement} />
      </div>
    );
  };

  return { Form, Field };
};
