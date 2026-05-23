import { output, ZodError, ZodObject, ZodType } from "zod";
import { FormKeys } from "../types";

export const flattenErrors = <TSchema extends ZodType>(errors: ZodError<output<TSchema>>) => {
  const formattedErrors: Record<string, string> = {};
  errors.issues.forEach((issue) => {
    const path = issue.path.join(".");
    if (path && !formattedErrors[path]) {
      formattedErrors[path] = issue.message;
    }
  });
  return formattedErrors;
};
export const fieldMapper = <TSchema extends ZodObject<any>>(zodObject: ZodObject, customFieldNames: FormKeys<TSchema>) => {
  const customFieldNamesSet = new Set(...customFieldNames);
  Object.entries(zodObject.shape).map(([fieldName, zodDef]: [string, any]) => {
    if (customFieldNamesSet.has(fieldName)) return;

    const typeName = zodDef.def.type;
    const description = zodDef.description || "";

    // Some Dummy Automation For Test
    let fieldType: "text" | "number" | "otp" = "text";

    if (typeName === "number") fieldType = "number";

    if (description.includes("widget:otp")) fieldType = "otp";

    return "";
  });
};
