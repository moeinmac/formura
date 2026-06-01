import React, { createContext, useContext, useRef, useSyncExternalStore } from "react";
import type { ZodType } from "zod";
import { useFormAction } from "./hooks/useFormAction";
import { createFormStore } from "./store/form.store";
import { ActionState, CreateFormOptions, FieldProps, FormKeys, FormStore } from "./types";
import { flattenErrors } from "./utils";

export const createForm = <TSchema extends ZodType, TData = any>(options: CreateFormOptions<TSchema, TData>) => {
  type SchemaKeys = FormKeys<TSchema>;

  const FormStoreContext = createContext<FormStore<TSchema> | null>(null);
  const ActionStateContext = createContext<ActionState<TData> | null>(null);

  const Form = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const storeRef = useRef(createFormStore<TSchema>(options.defaultValues ?? {}));

    const { actionState, executeAction } = useFormAction(options.action, {
      onSuccess: options.onSuccess,
      onError: options.onError,
      onSettled: options.onSettled,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const currentValues = storeRef.current.getValues();
      const result = options.schema.safeParse(currentValues);

      if (!result.success) {
        const formattedErrors = flattenErrors(result.error);
        storeRef.current.setErrors(formattedErrors);
        return;
      }

      storeRef.current.setErrors({});

      const response = await executeAction(currentValues);

      if (response.status === "error" && response.fieldErrors) storeRef.current.setErrors(response.fieldErrors);
    };

    return (
      <FormStoreContext.Provider value={storeRef.current}>
        <ActionStateContext.Provider value={actionState}>
          <form onSubmit={handleSubmit} className={className}>
            {children}
          </form>
        </ActionStateContext.Provider>
      </FormStoreContext.Provider>
    );
  };

  const Field = <TName extends SchemaKeys>({ name, render, disabled, label }: FieldProps<TSchema, TName>) => {
    const store = useContext(FormStoreContext);
    if (!store) throw new Error("Field component must be wrapped inside a Form element.");

    const value = useSyncExternalStore(
      store.subscribe,
      () => store.getFieldValue(name),
      () => "" as any,
    );

    const error = useSyncExternalStore(
      store.subscribe,
      () => store.getFieldError(name),
      () => undefined,
    );

    return (
      <div className="formura-field-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {label && <label htmlFor={name}>{label}</label>}
        {render({
          field: {
            name,
            disabled,
            value,
            onChange: (e: any) => {
              const val = e?.target ? e.target.value : e;
              store.setFieldValue(name, val);
            },
          },
        })}
        {error && options.GlobalErrorElement && <options.GlobalErrorElement errorMessage={error} />}
      </div>
    );
  };

  const useFormState = () => {
    const state = useContext(ActionStateContext);
    if (!state) throw new Error("useFormState must be invoked within a Form wrapper context.");
    return state;
  };

  return { Form, Field, useFormState };
};
