import Link from "next/link";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";
import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { siteConfig } from "@/lib/site-config";

const DocsPage = () => (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {siteConfig.docsDescription}
      </p>

      <DocsCallout className="mt-6">
        Schema in. Form out. Go touch grass.
      </DocsCallout>

      <DocsSection id="install" title="Install" className="mt-10">
        <PackageManagerTabs />
        <p className="text-sm text-muted-foreground">
          Your app needs Tailwind CSS so adapter utility classes apply.
        </p>
      </DocsSection>

      <DocsSection id="prerequisites" title="Prerequisites" className="mt-10">
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>React 18.2+ or 19</li>
          <li>Next.js 14+ (for Server Actions)</li>
          <li>Zod 4+</li>
          <li>Tailwind CSS 4+</li>
        </ul>
      </DocsSection>

      <DocsSection id="tailwind" title="Tailwind setup" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Include adapter sources in your Tailwind content paths:
        </p>
        <CopyCodeBlock>{`@source "../../../node_modules/@formura/adapters/dist/**/*.{js,mjs}";`}</CopyCodeBlock>
        <p className="text-sm text-muted-foreground">
          In a monorepo, point at the package source instead:
        </p>
        <CopyCodeBlock>{`@source "../../../packages/adapters/src/**/*.{ts,tsx}";`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="quickstart" title="Quick start" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Define a schema, wire an action, and let Formura render the fields.
        </p>
        <CopyCodeBlock title="schema.ts">{`import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Invalid email"),
});`}</CopyCodeBlock>
        <CopyCodeBlock title="actions.ts">{`"use server";

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
});`}</CopyCodeBlock>
        <CopyCodeBlock title="signup-form.tsx">{`"use client";

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
}`}</CopyCodeBlock>
        <p className="text-sm text-muted-foreground">
          When an adapter is provided, fields are auto-rendered from your schema.
          You can still add custom children inside{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            Form
          </code>
          .
        </p>
      </DocsSection>

      <DocsSection id="try-it" title="Try it live" className="mt-10">
        <p className="text-sm text-muted-foreground">
          See a working signup form with Server Actions and field-level errors.
        </p>
        <Link
          href="/examples/signup"
          className="inline-flex text-sm font-medium text-violet-400 hover:underline"
        >
          Open the signup example →
        </Link>
      </DocsSection>

      <DocsNextLink
        href="/docs/actions"
        title="Actions"
        description="Server Actions, client actions, and the ActionResult contract."
      />
    </article>
  );

export default DocsPage;
