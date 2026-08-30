import type { FieldWrapperProps } from "@formura/core";
import type { ComponentProps, ComponentType } from "react";
import type { DatePickerFieldProps } from "./fields/date-picker-field";
import type { DateTimePickerFieldProps } from "./fields/date-time-picker-field";
import type { TimePickerFieldProps } from "./fields/time-picker-field";
import type { Checkbox } from "./ui/checkbox";
import type { Input } from "./ui/input";
import type { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import type { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { Textarea } from "./ui/textarea";

export type ShadcnAdapterComponents = {
  Input: ComponentType<ComponentProps<typeof Input>>;
  Textarea: ComponentType<ComponentProps<typeof Textarea>>;
  Checkbox: ComponentType<ComponentProps<typeof Checkbox>>;
  Select: ComponentType<ComponentProps<typeof Select>>;
  SelectTrigger: ComponentType<ComponentProps<typeof SelectTrigger>>;
  SelectValue: ComponentType<ComponentProps<typeof SelectValue>>;
  SelectContent: ComponentType<ComponentProps<typeof SelectContent>>;
  SelectItem: ComponentType<ComponentProps<typeof SelectItem>>;
  InputOTP: ComponentType<ComponentProps<typeof InputOTP>>;
  InputOTPGroup: ComponentType<ComponentProps<typeof InputOTPGroup>>;
  InputOTPSlot: ComponentType<ComponentProps<typeof InputOTPSlot>>;
  DatePickerField: ComponentType<DatePickerFieldProps>;
  TimePickerField: ComponentType<TimePickerFieldProps>;
  DateTimePickerField: ComponentType<DateTimePickerFieldProps>;
  FieldWrapper: ComponentType<FieldWrapperProps>;
};

export type CreateShadcnAdapterOptions = {
  components?: Partial<ShadcnAdapterComponents>;
};
