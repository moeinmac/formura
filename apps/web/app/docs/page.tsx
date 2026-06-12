import Link from "next/link";
import { CodeBlock } from "@/components/marketing/code-block";
import { siteConfig } from "@/lib/site-config";

export default function DocsPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {siteConfig.description}
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Install</h2>
        <CodeBlock>{siteConfig.installCommand}</CodeBlock>
        <p className="text-sm text-muted-foreground">
          Your app needs Tailwind CSS so adapter utility classes apply.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Tailwind setup</h2>
        <p className="text-sm text-muted-foreground">
          Include adapter sources in your Tailwind content paths:
        </p>
        <CodeBlock>{`@source "../../../packages/adapters/src/**/*.{ts,tsx}";`}</CodeBlock>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Basic usage</h2>
        <CodeBlock title="form.tsx">{`import { createForm } from "@formura/core";
import shadcnAdapter from "@formura/adapters/shadcn";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
});

const { Form, Field } = createForm({
  schema: userSchema,
  adapter: shadcnAdapter,
  action: signupAction,
  defaultValues: { username: "", email: "" },
});

export function SignupForm() {
  return (
    <Form className="space-y-4">
      <button type="submit">Sign up</button>
    </Form>
  );
}`}</CodeBlock>
        <p className="text-sm text-muted-foreground">
          When an adapter is provided, fields are auto-rendered from your schema.
          You can still add custom children inside <code className="text-foreground">Form</code>.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Server Actions</h2>
        <CodeBlock title="actions.ts">{`"use server";

import { asServerAction } from "@formura/core/server";

export const signupAction = asServerAction(async (prevState, formData) => {
  const username = formData.get("username");

  if (username === "admin") {
    return {
      status: "error",
      fieldErrors: { username: "Reserved." },
    };
  }

  return { status: "success", data: { userId: "user_123" } };
});`}</CodeBlock>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Client Actions</h2>
        <CodeBlock title="client-action.ts">{`import { asClientAction } from "@formura/core";

export const clientAction = asClientAction(async (values) => {
  const res = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    return {
      status: "error",
      fieldErrors: { username: "Already taken." },
    };
  }

  return { status: "success", data: await res.json() };
});`}</CodeBlock>
      </section>

      <section className="mt-10">
        <p className="text-sm text-muted-foreground">
          See the{" "}
          <Link href="/docs/widgets" className="text-violet-400 hover:underline">
            widget reference
          </Link>{" "}
          for how Zod types map to form fields, or try the{" "}
          <Link href="/examples" className="text-violet-400 hover:underline">
            live examples
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
