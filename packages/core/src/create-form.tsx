import React, { Children, createContext, isValidElement, useContext, useRef, useSyncExternalStore } from "react";
import { ZodType } from "zod";
import ErrorElement from "./error-element";
import { createFormStore, type FormStore } from "./form-store";
import { CreateFormOptions, FieldProps, FieldValue, FormKeys } from "./types";
import { flattenErrors } from "./utils";

export const createForm = <TSchema extends ZodType>(options: CreateFormOptions<TSchema>) => {
  type FieldName = FormKeys<typeof options.schema>;
  const FormStoreContext = createContext<FormStore<TSchema, FieldName> | null>(null);

  const Form = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
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

    const childArray = Children.toArray(children);
    const customValidFields = childArray.filter((child) => isValidElement(child) && child.type === Field);

    if (childArray.length > 0 && customValidFields.length === 0) throw new Error("For rending custom fields use 'Field' components.");
    if (customValidFields.length < childArray.length) console.warn("Just the 'Field' components are rendered! ");

    const customFieldNames = customValidFields.map(
      (field) => isValidElement<FieldProps<typeof options.schema, FieldName>>(field) && field.props.name,
    ) as FormKeys<TSchema>[];

    return (
      <FormStoreContext.Provider value={storeRef.current}>
        <form action={options.action} onSubmit={handleSubmit} className={className}>
          {...customValidFields}
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

  return { Form, Field };
};
