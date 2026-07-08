import { format } from "date-fns";

export const isValidDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());

export const formatDate = (value: Date | undefined | null): string => {
  if (!isValidDate(value)) return "";
  return format(value, "PPP");
};

export const formatDateTime = (value: Date | undefined | null): string => {
  if (!isValidDate(value)) return "";
  return format(value, "PPP p");
};

export const parseTimeString = (
  value: string | undefined | null,
): { hours: number; minutes: number } | null => {
  if (!value) return null;
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return { hours, minutes };
};

export const formatTimeString = (hours: number, minutes: number): string =>
  `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

export const setTimeOnDate = (
  date: Date,
  hours: number,
  minutes: number,
): Date => {
  const next = new Date(date);
  next.setHours(hours, minutes, 0, 0);
  return next;
};

export const getDateValue = (value: unknown): Date | undefined =>
  isValidDate(value) ? value : undefined;

export const HOURS = Array.from({ length: 24 }, (_, i) => i);
export const MINUTES = Array.from({ length: 60 }, (_, i) => i);
