import type { FormAdapter } from "@formura/core";
import { ShadcnFieldWrapper } from "./field-wrapper";
import { DatePickerField } from "./fields/date-picker-field";
import { DateTimePickerField } from "./fields/date-time-picker-field";
import { renderShadcnWidget } from "./fields/render-widget";
import { TimePickerField } from "./fields/time-picker-field";
import type { CreateShadcnAdapterOptions, ShadcnAdapterComponents } from "./types";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

const defaultShadcnComponents: ShadcnAdapterComponents = {
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  DatePickerField,
  TimePickerField,
  DateTimePickerField,
  FieldWrapper: ShadcnFieldWrapper,
};

export const createShadcnAdapter = (options?: CreateShadcnAdapterOptions): FormAdapter => {
  const components: ShadcnAdapterComponents = {
    ...defaultShadcnComponents,
    ...options?.components,
  };

  return {
    renderField: (props) => renderShadcnWidget(props, components),
    FieldWrapper: components.FieldWrapper,
  };
};
