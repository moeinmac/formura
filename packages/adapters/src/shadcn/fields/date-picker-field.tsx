import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { formatDate, getDateValue } from "../lib/date-utils";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DatePickerFieldProps = {
  id: string;
  value: unknown;
  disabled?: boolean;
  onBlur?: (e: unknown) => void;
  onChange: (value: Date | undefined) => void;
};

export const DatePickerField = ({
  id,
  value,
  disabled,
  onBlur,
  onChange,
}: DatePickerFieldProps) => {
  const [open, setOpen] = useState(false);
  const selected = getDateValue(value);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.(undefined);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="default"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {selected ? formatDate(selected) : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => onChange(date)}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};
