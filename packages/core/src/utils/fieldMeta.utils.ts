import { ZodType } from "zod";
import type {
  FieldMeta,
  FieldOption,
  FieldWidget,
  FormKeys,
} from "../types/form.type";

type ZodSchemaInternals = {
  type?: string;
  def?: {
    type?: string;
    innerType?: ZodType;
    element?: ZodType;
    entries?: Record<string, string>;
  };
  description?: string;
  options?: string[];
  minLength?: number | null;
  maxLength?: number | null;
};

const WRAPPER_TYPES = new Set(["optional", "nullable", "default", "prefault"]);

export const unwrapFieldSchema = (schema: ZodType): ZodType => {
  let current = schema;
  for (let i = 0; i < 16; i++) {
    const internals = current as ZodSchemaInternals;
    const typeName = internals.type ?? internals.def?.type;
    if (!typeName || !WRAPPER_TYPES.has(typeName)) break;
    const inner = internals.def?.innerType;
    if (!inner) break;
    current = inner;
  }
  return current;
};

const parseWidgetFromDescription = (
  description?: string,
): FieldWidget | undefined => {
  if (!description) return undefined;
  const match = description.match(/widget:(\w+)/);
  if (!match) return undefined;
  const widget = match[1] as FieldWidget;
  const allowed: FieldWidget[] = [
    "text",
    "password",
    "number",
    "otp",
    "select",
    "multiSelect",
    "textarea",
    "checkbox",
    "date",
    "time",
    "datetime",
  ];
  return allowed.includes(widget) ? widget : undefined;
};

const enumOptions = (schema: ZodSchemaInternals): FieldOption[] => {
  const values = schema.options ?? Object.keys(schema.def?.entries ?? {});
  return values.map((value) => ({ value, label: value }));
};

const isEnumSchema = (schema: ZodSchemaInternals) => {
  const typeName = schema.type ?? schema.def?.type;
  return typeName === "enum";
};

const inferStringWidget = (schema: ZodSchemaInternals): FieldWidget => {
  const fromDescription = parseWidgetFromDescription(schema.description);
  if (fromDescription) return fromDescription;

  const min = schema.minLength ?? null;
  const max = schema.maxLength ?? null;
  if (min !== null && max !== null && min === max && min >= 4 && min <= 8)
    return "otp";

  return "text";
};

const isDateSchema = (schema: ZodSchemaInternals) => {
  const typeName = schema.type ?? schema.def?.type;
  if (typeName === "date") return true;
  if (typeName === "coerce") {
    const inner = schema.def?.innerType as ZodSchemaInternals | undefined;
    return inner?.type === "date" || inner?.def?.type === "date";
  }
  return false;
};

const inferDateWidget = (schema: ZodSchemaInternals): FieldWidget => {
  const fromDescription = parseWidgetFromDescription(schema.description);
  if (fromDescription === "datetime") return "datetime";
  if (fromDescription === "date") return "date";
  return "date";
};

const inferFromSchema = (schema: ZodType): FieldMeta => {
  const unwrapped = unwrapFieldSchema(schema) as ZodSchemaInternals;
  const typeName = unwrapped.type ?? unwrapped.def?.type;

  if (typeName === "boolean") return { widget: "checkbox" };

  if (typeName === "number") return { widget: "number" };

  if (typeName === "enum")
    return { widget: "select", options: enumOptions(unwrapped) };

  if (typeName === "array") {
    const element = unwrapped.def?.element as ZodSchemaInternals | undefined;
    if (element && isEnumSchema(element)) {
      return { widget: "multiSelect", options: enumOptions(element) };
    }
  }

  if (isDateSchema(unwrapped)) return { widget: inferDateWidget(unwrapped) };

  if (typeName === "string") return { widget: inferStringWidget(unwrapped) };

  return { widget: "text" };
};

export const getFieldSchema = <TSchema extends ZodType>(
  schema: TSchema,
  fieldName: string,
): ZodType => {
  const internals = schema as ZodSchemaInternals;
  const objectType = internals.type ?? internals.def?.type;
  if (objectType !== "object")
    throw new Error(
      `inferFieldMeta: schema must be a Zod object, received "${objectType ?? "unknown"}".`,
    );

  const shape = (schema as unknown as { shape: Record<string, ZodType> }).shape;
  const fieldSchema = shape[fieldName];
  if (!fieldSchema)
    throw new Error(
      `inferFieldMeta: field "${fieldName}" does not exist on schema.`,
    );

  return fieldSchema;
};

export const inferFieldMeta = <TSchema extends ZodType>(
  schema: TSchema,
  fieldName: FormKeys<TSchema>,
): FieldMeta => {
  const fieldSchema = getFieldSchema(schema, fieldName);
  return inferFromSchema(fieldSchema);
};

export const getSchemaFieldKeys = <TSchema extends ZodType>(
  schema: TSchema,
): FormKeys<TSchema>[] => {
  const internals = schema as ZodSchemaInternals;
  const objectType = internals.type ?? internals.def?.type;
  if (objectType !== "object")
    throw new Error(
      `getSchemaFieldKeys: schema must be a Zod object, received "${objectType ?? "unknown"}".`,
    );

  const shape = (schema as unknown as { shape: Record<string, ZodType> }).shape;
  return Object.keys(shape) as FormKeys<TSchema>[];
};

export const formatFieldLabel = (fieldName: string): string =>
  fieldName.charAt(0).toUpperCase() +
  fieldName
    .slice(1)
    .replace(/([A-Z])/g, " $1")
    .trim();
