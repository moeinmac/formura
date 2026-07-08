# @formura/adapters

UI adapters that render Formura fields from Zod schema metadata.

## Install

```bash
pnpm add @formura/adapters @formura/core
```

Your app needs Tailwind CSS so adapter utility classes apply. Include adapter sources in your Tailwind content paths:

```css
@source "../../../packages/adapters/src/**/*.{ts,tsx}";
```

## Usage

```tsx
import { createForm } from "@formura/core";
import shadcnAdapter from "@formura/adapters/shadcn";

const schema = z.object({
  birthDate: z.coerce.date(),
  appointmentAt: z.coerce.date().describe("widget:dateTime"),
  reminderTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .describe("widget:time"),
});

const { Form, Field } = createForm({
  schema,
  adapter: shadcnAdapter,
  action: clientAction,
  defaultValues: {
    birthDate: undefined,
    appointmentAt: undefined,
    reminderTime: "",
  },
});

<Field name="birthDate" label="Birth date" />;
```

## Widget metadata

| Inferred from                                           | Widget        |
| ------------------------------------------------------- | ------------- |
| `z.string()`                                            | `text`        |
| `z.string().describe("widget:password")`                | `password`    |
| `z.string().describe("widget:otp")` or fixed length 4–8 | `otp`         |
| `z.string().describe("widget:textarea")`                | `textarea`    |
| `z.string().describe("widget:time")`                    | `time`        |
| `z.number()`                                            | `number`      |
| `z.enum([...])`                                         | `select`      |
| `z.array(z.enum([...]))`                                | `multiSelect` |
| `z.boolean()`                                           | `checkbox`    |
| `z.coerce.date()` or `z.date()`                         | `date`        |
| `z.coerce.date().describe("widget:dateTime")`           | `dateTime`    |

Use `.describe("widget:<name>")` when inference is ambiguous (for example OTP vs plain text, or date vs date-time).

### Date and time value types

- **date** and **dateTime** use `Date` values (`z.coerce.date()` or `z.date()`).
- **time** uses an `"HH:mm"` string (`z.string().describe("widget:time")`).
- On submit, `Date` fields serialize to ISO strings in server actions.

## Bundled primitives

Input, Textarea, Select, Checkbox, Input OTP, Calendar, Popover, Button, Label, and field wrapper.

## Custom shadcn components

```tsx
import { createShadcnAdapter } from "@formura/adapters/shadcn";

const adapter = createShadcnAdapter();
```

Extend `createShadcnAdapter` in your app when you need to swap primitives from your local shadcn install.
