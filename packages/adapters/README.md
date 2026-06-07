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

const { Form, Field } = createForm({
  schema: userSchema,
  adapter: shadcnAdapter,
  action: clientAction,
  defaultValues: { username: "" },
});

<Field name="username" label="Username" />;
```

## Widget metadata

| Inferred from                                           | Widget        |
| ------------------------------------------------------- | ------------- |
| `z.string()`                                            | `text`        |
| `z.string().describe("widget:password")`                | `password`    |
| `z.string().describe("widget:otp")` or fixed length 4–8 | `otp`         |
| `z.string().describe("widget:textarea")`                | `textarea`    |
| `z.number()`                                            | `number`      |
| `z.enum([...])`                                         | `select`      |
| `z.array(z.enum([...]))`                                | `multiSelect` |
| `z.boolean()`                                           | `checkbox`    |

Use `.describe("widget:<name>")` when inference is ambiguous (for example OTP vs plain text).

## Custom shadcn components

```tsx
import { createShadcnAdapter } from "@formura/adapters/shadcn";

const adapter = createShadcnAdapter();
```

Extend `createShadcnAdapter` in your app when you need to swap primitives from your local shadcn install.
