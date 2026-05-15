import React, { createContext, useContext } from "react";
import { ZodType } from "zod";
import { CreateFormOptions } from "./types";

export const createForm = <TSchema extends ZodType>(options: CreateFormOptions<TSchema>) => {
  const FormContext = createContext<any>(null);

  const Form = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <FormContext.Provider value={{ options }}>
        <form action={options.action} className={className}>
          {children}
        </form>
      </FormContext.Provider>
    );
  };

  const Field = ({ name, label, placeholder }: { name: string; label?: string; placeholder?: string }) => {
    return (
      <div className="formura-field-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input name={name} id={name} placeholder={placeholder} />
      </div>
    );
  };

  return {
    Form,
    Field,
  };
};
