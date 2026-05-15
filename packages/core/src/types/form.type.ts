import { ZodType } from "zod";

export interface CreateFormOptions<TSchema extends ZodType> {
  schema: TSchema;
  action: (formData: FormData) => Promise<any>;
  adapter?: any;
}
