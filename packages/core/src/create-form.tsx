import React, { createContext, Fragment, useContext, useRef, useSyncExternalStore } from "react";
import { ZodObject, ZodType } from "zod";
import ErrorElement from "./error-element";
import { createFormStore, type FormStore } from "./form-store";
import { CreateFormOptions, FieldProps, FieldValue, FormKeys } from "./types";
import { flattenErrors } from "./utils";

export const createForm = <TSchema extends ZodType>(options: CreateFormOptions<TSchema>) => {
  type FieldName = FormKeys<typeof options.schema>;
  const FormStoreContext = createContext<FormStore<TSchema, FieldName> | null>(null);

  const Form = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const storeRef = useRef(createFormStore<TSchema, FieldName>(options.defaultValues ?? {}));

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

  const Field = <TName extends FieldName>({ name, render, disabled, label }: FieldProps<typeof options.schema, TName>) => {
    const store = useContext(FormStoreContext);
    if (!store) throw new Error("Field Wrapped With Form Element");

    const value = useSyncExternalStore<FieldValue<TSchema, TName>>(
      (notify) => store.subscribe(notify),
      () => store.getFieldValue(name) as FieldValue<TSchema, TName>,
      () => "" as FieldValue<TSchema, TName>,
    );

    const error = useSyncExternalStore(
      (notify) => store.subscribe(notify),
      () => store.getFieldError(name),
      () => undefined,
    );

    return (
      <div className="formura-field-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {label && <label htmlFor={name}>{label}</label>}
        {render({
          field: { name, disabled, onChange: (e: any) => store.setFieldValue(name, e?.target?.value), value },
        })}
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
        })}
      </Fragment>
    );
  };

  return { Form, Field, AutoFields };
};
