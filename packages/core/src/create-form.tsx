import React, { createContext, useContext, useRef, useSyncExternalStore } from "react";
import { FormStore } from "./form-store";
import { CreateFormOptions } from "./types";
import { ZodType } from "zod";

export const createForm = <TSchema extends ZodType>(options: CreateFormOptions<TSchema>) => {
  const FormStoreContext = createContext<FormStore | null>(null);

  const Form = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const storeRef = useRef(new FormStore());

    return (
      <FormStoreContext.Provider value={storeRef.current}>
        <form action={options.action} className={className} onSubmit={(e) => {}}>
          {children}
        </form>
      </FormStoreContext.Provider>
    );
  };

  const Field = ({ name, label, placeholder }: { name: string; label?: string; placeholder?: string }) => {
    const store = useContext(FormStoreContext);
    if (!store) throw new Error("Field Component Must Wrapped With Form Component");

    const value = useSyncExternalStore(
      (notify) => store.subscribe(notify),
      () => store.getFieldValue(name) ?? "",
    );

    return (
      <div className="formura-field-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input id={name} name={name} value={value} placeholder={placeholder} onChange={(e) => store.setFieldValue(name, e.target.value)} />
      </div>
    );
  };

  return { Form, Field };
};
