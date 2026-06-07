import type {
  AdapterFieldProps,
  FieldOption,
  FieldWidget,
} from "@formura/core";
import type { ZodType } from "zod";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "../lib/utils";

type FieldProps = AdapterFieldProps;

const otpLengthFromSchema = (fieldSchema: ZodType): number => {
  const schema = fieldSchema as {
    minLength?: number | null;
    maxLength?: number | null;
  };
  const min = schema.minLength;
  const max = schema.maxLength;
  if (min !== null && min !== undefined && min === max) return min;
  return 6;
};

export const renderShadcnWidget = (props: FieldProps) => {
  const { name, value, onChange, onBlur, disabled, meta } = props;
  const widget = meta.widget as FieldWidget;

  switch (widget) {
    case "text":
      return (
        <Input
          id={name}
          name={name}
          value={String(value ?? "")}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
        />
      );
    case "password":
      return (
        <Input
          id={name}
          name={name}
          type="password"
          value={String(value ?? "")}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <Textarea
          id={name}
          name={name}
          value={String(value ?? "")}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <Input
          id={name}
          name={name}
          type="number"
          value={value === undefined || value === null ? "" : String(value)}
          disabled={disabled}
          onBlur={onBlur}
          onChange={(e) =>
            onChange(e.target.value === "" ? undefined : Number(e.target.value))
          }
        />
      );
    case "otp": {
      const length = otpLengthFromSchema(props.fieldSchema);
      return (
        <InputOTP
          id={name}
          maxLength={length}
          value={String(value ?? "")}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
        >
          <InputOTPGroup>
            {Array.from({ length }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      );
    }
    case "select":
      return (
        <Select
          value={String(value ?? "")}
          disabled={disabled}
          onValueChange={(next) => onChange(next)}
        >
          <SelectTrigger id={name}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {(meta.options ?? []).map((option: FieldOption) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "multiSelect": {
      const selected = Array.isArray(value) ? (value as string[]) : [];
      return (
        <div className="flex flex-col gap-2">
          {(meta.options ?? []).map((option: FieldOption) => {
            const checked = selected.includes(option.value);
            return (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm"
              >
                <Checkbox
                  checked={checked}
                  disabled={disabled}
                  onCheckedChange={(isChecked) => {
                    const next = isChecked
                      ? [...selected, option.value]
                      : selected.filter((v) => v !== option.value);
                    onChange(next);
                  }}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      );
    }
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            id={name}
            checked={Boolean(value)}
            disabled={disabled}
            onBlur={onBlur}
            onCheckedChange={(checked) => onChange(Boolean(checked))}
          />
        </div>
      );
    default:
      return (
        <Input
          id={name}
          name={name}
          value={String(value ?? "")}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          className={cn()}
        />
      );
  }
};
