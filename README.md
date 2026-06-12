# Formura

**Schema in. Form out.**

One schema to rule them all, one adapter to render them.

Formura is a schema-first form library for React and Next.js. Define a Zod object schema, wire a server or client action, and get auto-rendered fields, built-in validation, field-level errors, and typed submission state — no `register` calls, no field arrays, no adapter boilerplate.

## Packages

| Package | Description |
| ------- | ----------- |
| [`@formura/core`](./packages/core) | `createForm`, action helpers, validation, and form state |
| [`@formura/adapters`](./packages/adapters) | UI adapters that render fields from Zod schema metadata |

## Install

```bash
pnpm add @formura/core @formura/adapters
```

```bash
npm install @formura/core @formura/adapters
```

```bash
yarn add @formura/core @formura/adapters
```

## Quick example

```tsx
import { z } from "zod";
import { createForm } from "@formura/core";
import { asClientAction } from "@formura/core";
import shadcnAdapter from "@formura/adapters/shadcn";

const schema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
});

const action = asClientAction<typeof schema>(async (values) => ({
  status: "success",
  data: values,
}));

const { Form } = createForm({
  schema,
  adapter: shadcnAdapter,
  action,
  defaultValues: { username: "", email: "" },
});

export const ProfileForm = () => (
  <Form className="space-y-4">
    <button type="submit">Save</button>
  </Form>
);
```

With a Next.js Server Action, tag your handler with `asServerAction` from `@formura/core/server` instead. See the [getting started guide](./apps/web/app/docs/page.tsx) for the full walkthrough.

## Features

- **Zero boilerplate** — Zod schema drives widgets, labels, and validation
- **Server Actions** — `asServerAction` handles `prevState`, `FormData`, and field errors
- **Client actions** — `asClientAction` for typed client-side submissions with the same API
- **Widget inference** — strings, numbers, enums, booleans map to the right input; override with `.describe("widget:otp")`
- **shadcn adapter** — polished defaults via `@formura/adapters/shadcn`
- **App Router ready** — built for Next.js 14+ and React 18/19

## Documentation

Docs live in the `apps/web` Next.js app:

- [Getting started](./apps/web/app/docs/page.tsx)
- [Actions](./apps/web/app/docs/actions/page.tsx)
- [`createForm` API](./apps/web/app/docs/create-form/page.tsx)
- [Fields](./apps/web/app/docs/fields/page.tsx)
- [Widgets](./apps/web/app/docs/widgets/page.tsx)
- [Adapters](./apps/web/app/docs/adapters/page.tsx)
- [Examples](./apps/web/app/examples/page.tsx)

Run the docs site locally:

```bash
pnpm install
pnpm dev --filter=web
```

Then open [http://localhost:3000/docs](http://localhost:3000/docs).

## Repository structure

```
formura/
├── apps/
│   └── web/              # Marketing site, docs, and live examples
├── packages/
│   ├── core/             # @formura/core
│   ├── adapters/         # @formura/adapters
│   ├── eslint-config/    # Shared ESLint config
│   └── typescript-config/# Shared TypeScript config
```

## Development

**Requirements:** Node.js 18+, pnpm 9

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run the docs site
pnpm dev --filter=web

# Type-check
pnpm check-types

# Test core package
pnpm --filter @formura/core test
```

Build a single package:

```bash
pnpm build --filter=@formura/core
pnpm build --filter=@formura/adapters
```

## Prerequisites for consumers

- React 18.2+ or 19
- Next.js 14+ (for Server Actions)
- Zod 4+
- Tailwind CSS 4+ (when using `@formura/adapters`)

Include adapter sources in your Tailwind content paths:

```css
@source "../../../node_modules/@formura/adapters/dist/**/*.{js,mjs}";
```

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/moeinmac/formura).

## License

MIT
