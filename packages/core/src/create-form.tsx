import React, { createContext, Fragment, ReactElement, useContext, useRef, useSyncExternalStore } from "react";
import { output, ZodObject, ZodType } from "zod";
import ErrorElement from "./error-element";
import { createFormStore, type FormStore } from "./form-store";
import { CreateFormOptions, FieldProps, FormKeys } from "./types";
import { flattenErrors } from "./utils";

export const createForm = <TSchema extends ZodType>(options: CreateFormOptions<TSchema>) => {
  const FormStoreContext = createContext<FormStore | null>(null);

  type FieldName = FormKeys<TSchema>;

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

  const Field = ({ name, render, disabled, label, placeholder }: FieldProps<FieldName>) => {
    const store = useContext(FormStoreContext);
    if (!store) throw new Error("Field Wrapped With Form Element");

    const value = useSyncExternalStore(
      (notify) => store.subscribe(notify),
      () => store.getFieldValue(name) ?? "",
      () => "",
    );
    const error = useSyncExternalStore(
      (notify) => store.subscribe(notify),
      () => store.getFieldError(name),
      () => undefined,
    );

    return (
      <div className="formura-field-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => store.setFieldValue(name, e.target.value)}
          style={{ borderColor: error ? "red" : "initial" }}
        />
        <ErrorElement error={error} GlobalErrorElement={options.GlobalErrorElement} />
      </div>
    );
  };

  const AutoFields = ({ omit = [] }: { omit?: Array<FieldName> }) => {
    const shape = options.schema.type === "object" ? (options.schema.def as ZodObject).shape : {};

    return (
      <Fragment>
        {Object.entries(shape).map(([fieldName, zodDef]: [string, any]) => {
          if (omit.includes(fieldName as FieldName)) return null;
          const typeName = zodDef.def.type;
          const description = zodDef.description || "";

          // Some Dummy Automation For Test
          let fieldType: "text" | "number" | "otp" = "text";

          if (typeName === "number") fieldType = "number";

          if (description.includes("widget:otp")) fieldType = "otp";
          return <p>Hello</p>;

          // return <Field key={fieldName}  name={fieldName as FieldName} label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} />;
        })}
      </Fragment>
    );
  };

  return { Form, Field, AutoFields };
};
