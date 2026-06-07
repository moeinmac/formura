import React, {
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";
import type { ZodType } from "zod";
import { useFormAction } from "./hooks/useFormAction";
import { createFormStore } from "./store/form.store";
import {
  ActionState,
  AdapterFieldPropsForField,
  CreateFormOptions,
  CreateFormOptionsWithAdapter,
  FieldPropsWithAdapter,
  FormAdapter,
  FormKeys,
  FormReturn,
  FormStore,
  RenderFieldProps,
} from "./types";
import {
  flattenErrors,
  formatFieldLabel,
  getFieldSchema,
  getSchemaFieldKeys,
  inferFieldMeta,
} from "./utils";

type CollectedFieldOverride = {
  name: string;
  label?: string;
  render?: FieldPropsWithAdapter<ZodType, never>["render"];
  disabled?: boolean;
  ErrorElement?: FieldPropsWithAdapter<ZodType, never>["ErrorElement"];
};

const collectFormChildren = (
  children: React.ReactNode,
  FieldComponent: unknown,
): {
  fieldOverrides: Map<string, CollectedFieldOverride>;
  otherChildren: React.ReactNode[];
} => {
  const fieldOverrides = new Map<string, CollectedFieldOverride>();
  const otherChildren: React.ReactNode[] = [];

  const visit = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (child == null || typeof child === "boolean") return;

      if (!React.isValidElement(child)) {
        otherChildren.push(child);
        return;
      }

      if (child.type === React.Fragment) {
        visit((child.props as { children?: React.ReactNode }).children);
        return;
      }

      if (child.type === FieldComponent) {
        const props = child.props as CollectedFieldOverride;
        fieldOverrides.set(props.name, props);
        return;
      }

      otherChildren.push(child);
    });
  };

  visit(children);
  return { fieldOverrides, otherChildren };
};

const createFieldRenderer = <TSchema extends ZodType>(
  store: FormStore<TSchema>,
  options: CreateFormOptions<TSchema, any>,
) => {
  return function renderFieldContent<TName extends FormKeys<TSchema>>(
    name: TName,
    props: {
      render?: FieldPropsWithAdapter<TSchema, TName>["render"];
      disabled?: boolean;
      label?: string;
      ErrorElement?: FieldPropsWithAdapter<TSchema, TName>["ErrorElement"];
    },
    value: ReturnType<FormStore<TSchema>["getFieldValue"]>,
    error: string | undefined,
  ) {
    const onChange = (e: unknown) => {
      const val =
        e !== null && typeof e === "object" && "target" in e
          ? (
              e as {
                target: { value?: unknown; checked?: unknown; type?: string };
              }
            ).target.type === "checkbox"
            ? (e as { target: { checked: unknown } }).target.checked
            : (e as { target: { value: unknown } }).target.value
          : e;
      store.setFieldValue(name, val as never);
    };

    const onBlur = () => {};

    const field: RenderFieldProps<TSchema, TName> = {
      name,
      value: value as RenderFieldProps<TSchema, TName>["value"],
      disabled: props.disabled,
      onChange,
      onBlur,
    };

    if (props.render) return props.render({ field });

    if (!options.adapter) {
      throw new Error(
        `Field "${name}" requires a render prop when createForm is called without an adapter.`,
      );
    }

    const meta = inferFieldMeta(options.schema, name);
    const adapterProps: AdapterFieldPropsForField<TSchema, TName> = {
      name,
      value: value as AdapterFieldPropsForField<TSchema, TName>["value"],
      onChange,
      onBlur,
      disabled: props.disabled,
      error,
      label: props.label,
      meta,
      fieldSchema: getFieldSchema(options.schema, name),
    };

    return options.adapter.renderField(adapterProps);
  };
};

export const createFormFactory = <
  TSchema extends ZodType,
  TData,
  THasAdapter extends boolean,
>(
  options:
    | CreateFormOptions<TSchema, TData>
    | CreateFormOptionsWithAdapter<TSchema, TData>,
): FormReturn<TSchema, TData, THasAdapter> => {
  type SchemaKeys = FormKeys<TSchema>;

  const FormStoreContext = createContext<FormStore<TSchema> | null>(null);
  const ActionStateContext = createContext<ActionState<TData> | null>(null);
  const adapter: FormAdapter | undefined = options.adapter;

  const Form = ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    const storeRef = useRef(
      createFormStore<TSchema>(options.defaultValues ?? {}),
    );

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

      if (response.status === "error" && response.fieldErrors)
        storeRef.current.setErrors(response.fieldErrors);
    };

    const { fieldOverrides, otherChildren } = collectFormChildren(
      children,
      Field,
    );
    const schemaFieldKeys = getSchemaFieldKeys(options.schema);

    const autoFields =
      adapter &&
      schemaFieldKeys.map((name) => {
        const fromOptions = options.fields?.[name as SchemaKeys];
        const fromChild = fieldOverrides.get(name);
        const config = { ...fromOptions, ...fromChild };

        return (
          <Field
            key={name}
            name={name as SchemaKeys}
            label={config.label ?? formatFieldLabel(name)}
            render={
              config.render as FieldPropsWithAdapter<
                TSchema,
                SchemaKeys
              >["render"]
            }
            disabled={config.disabled}
            ErrorElement={config.ErrorElement}
          />
        );
      });

    if (!adapter && !children) {
      throw new Error(
        "Form requires children with <Field render={...} /> when createForm is called without an adapter.",
      );
    }

    return (
      <FormStoreContext.Provider value={storeRef.current}>
        <ActionStateContext.Provider value={actionState}>
          <form onSubmit={handleSubmit} className={className}>
            {autoFields}
            {otherChildren}
          </form>
        </ActionStateContext.Provider>
      </FormStoreContext.Provider>
    );
  };

  const Field = <TName extends SchemaKeys>(
    props: FieldPropsWithAdapter<TSchema, TName>,
  ) => {
    const store = useContext(FormStoreContext);
    if (!store)
      throw new Error("Field component must be wrapped inside a Form element.");

    const value = useSyncExternalStore(
      store.subscribe,
      () => store.getFieldValue(props.name),
      () => "" as never,
    );

    const error = useSyncExternalStore(
      store.subscribe,
      () => store.getFieldError(props.name),
      () => undefined,
    );

    const renderFieldContent = createFieldRenderer(store, options);
    const content = renderFieldContent(props.name, props, value, error);

    if (adapter?.FieldWrapper) {
      const Wrapper = adapter.FieldWrapper;
      const ErrorElement = props.ErrorElement ?? options.GlobalErrorElement;
      return (
        <Wrapper
          name={props.name}
          label={props.label}
          error={error}
          ErrorElement={ErrorElement}
        >
          {content}
        </Wrapper>
      );
    }

    const ErrorDisplay = props.ErrorElement ?? options.GlobalErrorElement;
    const errorMessage =
      error && ErrorDisplay ? <ErrorDisplay errorMessage={error} /> : null;

    return (
      <div
        className="formura-field-group"
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        {props.label && <label htmlFor={props.name}>{props.label}</label>}
        {content}
        {errorMessage}
      </div>
    );
  };

  const useFormState = () => {
    const state = useContext(ActionStateContext);
    if (!state)
      throw new Error(
        "useFormState must be invoked within a Form wrapper context.",
      );
    return state;
  };

  return { Form, Field, useFormState } as FormReturn<
    TSchema,
    TData,
    THasAdapter
  >;
};

export function createForm<TSchema extends ZodType, TData = any>(
  options: CreateFormOptionsWithAdapter<TSchema, TData>,
): FormReturn<TSchema, TData, true>;

export function createForm<TSchema extends ZodType, TData = any>(
  options: CreateFormOptions<TSchema, TData> & { adapter?: undefined },
): FormReturn<TSchema, TData, false>;

export function createForm<TSchema extends ZodType, TData = any>(
  options:
    | CreateFormOptions<TSchema, TData>
    | CreateFormOptionsWithAdapter<TSchema, TData>,
): FormReturn<TSchema, TData, boolean> {
  return createFormFactory(options);
}
