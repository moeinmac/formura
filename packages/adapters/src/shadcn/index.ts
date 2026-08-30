import { createShadcnAdapter } from "./create-shadcn-adapter";

const shadcnAdapter = createShadcnAdapter();

export default shadcnAdapter;
export { createShadcnAdapter };
export type { CreateShadcnAdapterOptions, ShadcnAdapterComponents } from "./types";
export type { DatePickerFieldProps } from "./fields/date-picker-field";
export type { DateTimePickerFieldProps } from "./fields/date-time-picker-field";
export type { TimePickerFieldProps } from "./fields/time-picker-field";
