import type { FieldWrapperProps } from "@formura/core";
import { Label } from "./ui/label";
import { cn } from "./lib/utils";

export const ShadcnFieldWrapper = ({
  name,
  label,
  error,
  children,
  ErrorElement,
}: FieldWrapperProps) => {
  return (
    <div className={cn("formura-field-group flex flex-col gap-2")}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      {children}
      {error && ErrorElement && <ErrorElement errorMessage={error} />}
      {error && !ErrorElement && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
