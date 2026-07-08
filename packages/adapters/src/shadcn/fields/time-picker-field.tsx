import { Clock } from "lucide-react";
import { useState } from "react";
import {
  formatTimeString,
  HOURS,
  MINUTES,
  parseTimeString,
} from "../lib/date-utils";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
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

type TimePickerFieldProps = {
  id: string;
  value: unknown;
  disabled?: boolean;
  onBlur?: (e: unknown) => void;
  onChange: (value: string) => void;
};

export const TimePickerField = ({
  id,
  value,
  disabled,
  onBlur,
  onChange,
}: TimePickerFieldProps) => {
  const [open, setOpen] = useState(false);
  const timeValue = typeof value === "string" ? value : "";
  const parsed = parseTimeString(timeValue);
  const hours = parsed?.hours ?? 0;
  const minutes = parsed?.minutes ?? 0;

  const updateTime = (nextHours: number, nextMinutes: number) => {
    onChange(formatTimeString(nextHours, nextMinutes));
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
            !parsed && "text-muted-foreground",
          )}
        >
          <Clock className="h-4 w-4" />
          {parsed ? formatTimeString(hours, minutes) : "Pick a time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex gap-2">
          <Select
            value={String(hours)}
            disabled={disabled}
            onValueChange={(next) => updateTime(Number(next), minutes)}
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
          <span className="flex items-center text-sm text-muted-foreground">:</span>
          <Select
            value={String(minutes)}
            disabled={disabled}
            onValueChange={(next) => updateTime(hours, Number(next))}
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
