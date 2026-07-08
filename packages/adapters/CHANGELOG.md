# Changelog

All notable changes to `@formura/adapters` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2026-07-08

### Added

- `date`, `time`, and `datetime` widget rendering in the shadcn adapter
- `DatePickerField` with calendar popover for date fields
- `TimePickerField` with hour and minute selects for `"HH:mm"` string values
- `DateTimePickerField` with combined calendar and time selects
- Bundled Calendar, Popover, and Button primitives for date/time pickers
- `date-fns` and `react-day-picker` dependencies

## [0.0.2] - 2026-07-06

### Added

- CHANGELOG.md

## [0.0.1] - 2026-06-07

### Added

- Default shadcn/ui adapter export at `@formura/adapters/shadcn`
- `createShadcnAdapter` for customizing field rendering with local shadcn primitives
- Widget support for text, password, OTP, textarea, number, select, multiSelect, and checkbox
- Schema metadata inference from Zod types and `.describe("widget:<name>")` hints
- Tailwind-friendly field wrapper with label and error display
- Package README with install, usage, and widget metadata reference
