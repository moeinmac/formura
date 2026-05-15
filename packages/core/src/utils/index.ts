import { output, ZodError, ZodType } from "zod";

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
