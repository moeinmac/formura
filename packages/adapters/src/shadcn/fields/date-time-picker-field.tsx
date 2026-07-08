import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  formatDateTime,
  formatTimeString,
  getDateValue,
  HOURS,
  MINUTES,
  parseTimeString,
  setTimeOnDate,
} from "../lib/date-utils";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DateTimePickerFieldProps = {
  id: string;
  value: unknown;
  disabled?: boolean;
  onBlur?: (e: unknown) => void;
  onChange: (value: Date | undefined) => void;
};

export const DateTimePickerField = ({
  id,
  value,
  disabled,
  onBlur,
  onChange,
}: DateTimePickerFieldProps) => {
  const [open, setOpen] = useState(false);
  const selected = getDateValue(value);
  const timeSource = selected
    ? formatTimeString(selected.getHours(), selected.getMinutes())
    : "";
  const parsed = parseTimeString(timeSource) ?? { hours: 0, minutes: 0 };

  const updateDate = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined);
      return;
    }
    onChange(setTimeOnDate(date, parsed.hours, parsed.minutes));
  };

  const updateTime = (hours: number, minutes: number) => {
    const base = selected ?? new Date();
    onChange(setTimeOnDate(base, hours, minutes));
  };

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
          {selected ? formatDateTime(selected) : "Pick date and time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={updateDate}
          disabled={disabled}
        />
        <div className="flex items-center gap-2 border-t border-border p-3">
          <Select
            value={String(parsed.hours)}
            disabled={disabled}
            onValueChange={(next) => updateTime(Number(next), parsed.minutes)}
          >
            <SelectTrigger className="w-[72px]" aria-label="Hours">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              {HOURS.map((hour) => (
                <SelectItem key={hour} value={String(hour)}>
                  {formatTimeString(hour, 0).slice(0, 2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">:</span>
          <Select
            value={String(parsed.minutes)}
            disabled={disabled}
            onValueChange={(next) => updateTime(parsed.hours, Number(next))}
          >
            <SelectTrigger className="w-[72px]" aria-label="Minutes">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              {MINUTES.map((minute) => (
                <SelectItem key={minute} value={String(minute)}>
                  {String(minute).padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
};
