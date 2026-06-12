# @formura/core

**Schema in. Form out.**

Schema-first forms for React and Next.js. Give `createForm` a Zod object schema, wire a server or client action, and get auto-rendered fields, built-in validation, field-level errors, and typed submission state — no `register` calls, no field arrays, no adapter boilerplate.

## Install

```bash
npm install @formura/core @formura/adapters
```

```bash
pnpm add @formura/core @formura/adapters
```

```bash
yarn add @formura/core @formura/adapters
```

Pair `@formura/core` with a UI adapter such as [`@formura/adapters`](https://www.npmjs.com/package/@formura/adapters) for auto-rendered fields. Your app also needs Tailwind CSS so adapter utility classes apply.

## Prerequisites

- React 18.2+ or 19
- Next.js 14+ (for Server Actions)
- Zod 4+
- Tailwind CSS 4+ (when using `@formura/adapters`)

## Quick start

**1. Define a schema**

```ts
import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Invalid email"),
});
```

**2. Wire a server action**

```ts
"use server";

import { asServerAction } from "@formura/core/server";

export const signupAction = asServerAction(async (_prevState, formData) => {
  const username = formData.get("username");

  if (username === "admin") {
    return {
      status: "error",
      fieldErrors: { username: "Reserved." },
    };
  }

  return { status: "success", data: { userId: "user_123" } };
});
```

**3. Create the form**

```tsx
"use client";

import { createForm } from "@formura/core";
import shadcnAdapter from "@formura/adapters/shadcn";
import { signupSchema } from "./schema";
import { signupAction } from "./actions";

const { Form, useFormState } = createForm({
  schema: signupSchema,
  adapter: shadcnAdapter,
  action: signupAction,
  defaultValues: { username: "", email: "" },
});

export const SignupForm = () => {
  const { isSubmitting } = useFormState();

  return (
    <Form className="space-y-4">
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>
    </Form>
  );
};
```

When an adapter is provided, fields are auto-rendered from your schema. Add custom children inside `Form` whenever you need more control.

## `createForm`

The factory that turns a Zod schema into a typed form.

### Returns

| Export         | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `Form`         | Wraps fields in a `<form>`, handles submit and validation          |
| `Field`        | Renders a single field (auto or manual)                            |
| `useFormState` | Hook for submission state inside the form tree                     |

### Options

| Option              | Required | Description                                                                 |
| ------------------- | -------- | --------------------------------------------------------------------------- |
| `schema`            | Yes      | Zod object schema — single source of truth for fields and validation        |
| `action`            | Yes      | Tagged server or client action from `asServerAction` / `asClientAction`   |
| `adapter`           | No       | UI adapter that renders fields. Without it, every `Field` needs a render prop |
| `defaultValues`     | No       | Initial field values. Keys must match schema fields                         |
| `fields`            | No       | Per-field overrides (label, render, disabled, ErrorElement) without JSX     |
| `GlobalErrorElement`| No       | Default error display component for all fields                              |
| `onSuccess`         | No       | Called when the action returns `status: "success"`                          |
| `onError`           | No       | Called when the action returns `status: "error"`                            |
| `onSettled`         | No       | Called after every action completes, success or error                       |

## Actions

On submit, Formura validates with `schema.safeParse(values)` before calling your action. Zod errors are flattened and mapped to field errors automatically.

### Server Actions

Import `asServerAction` from `@formura/core/server` in a `"use server"` file:

```ts
"use server";

import type { ActionResult } from "@formura/core";
import { asServerAction } from "@formura/core/server";

type SignupData = { userId: string };

export const signupAction = asServerAction<SignupData>(
  async (_prevState, formData): Promise<ActionResult<SignupData>> => {
    const username = formData.get("username");

    if (username === "admin") {
      return {
        status: "error",
        fieldErrors: { username: "This handle is reserved." },
      };
    }

    return { status: "success", data: { userId: "user_99a8f" } };
  },
);
```

### Client actions

Use `asClientAction` when you want typed values instead of raw `FormData`:

```ts
import { asClientAction } from "@formura/core";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
});

export const signupClientAction = asClientAction<typeof schema>(
  async (values) => {
    if (values.username === "taken") {
      return {
        status: "error",
        fieldErrors: { username: "Username already taken." },
      };
    }

    return { status: "success", data: values };
  },
);
```

### Action result contract

```ts
// Success
{ status: "success", data: TData }

// Error
{
  status: "error",
  message?: string,
  fieldErrors?: Record<string, string>,
}
```

## Utility exports

| Export             | Description                                      |
| ------------------ | ------------------------------------------------ |
| `inferFieldMeta`   | Widget type and options for a schema field       |
| `getFieldSchema`   | Zod schema for a single field                    |
| `unwrapFieldSchema`| Unwrap optional/nullable wrappers on a field     |
| `getSchemaFieldKeys` | List top-level keys from a Zod object schema |
| `formatFieldLabel` | Turn `firstName` into `First Name`             |
| `flattenErrors`    | Zod error to field error map                     |
| `asClientAction`   | Tag a client-side submit handler                 |
| `toFormData`       | Values object to `FormData`                      |

## Subpath exports

| Import                    | Use for                          |
| ------------------------- | -------------------------------- |
| `@formura/core`           | `createForm`, types, client utils |
| `@formura/core/server`    | `asServerAction` in server files |

## Learn more

- [Full documentation](https://github.com/moeinmac/formura/tree/main/apps/web/app/docs)
- [Examples](https://github.com/moeinmac/formura/tree/main/apps/web/app/examples)
- [@formura/adapters](https://www.npmjs.com/package/@formura/adapters) — shadcn/ui field rendering

## License

MIT
