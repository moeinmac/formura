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

    <DocsSection id="how-it-works" title="How Formura thinks" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Formura has one job: turn a Zod schema into a fully wired form. Here is
        exactly what happens — no magic, just a four-step pipeline:
      </p>
      <ol className="mt-4 space-y-4">
        <li className="flex gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-400">
            1
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              Schema → field keys
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Formura reads every key from your{" "}
              <code className="text-foreground">z.object()</code> schema and
              automatically determines the right widget — text input, select,
              checkbox, date picker, OTP, and more — based on the Zod type.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-400">
            2
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              Adapter → components
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              The adapter receives the field metadata and renders the
              appropriate UI component — Input, Select, Checkbox, DatePicker,
              etc. — wired to the form store automatically.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-400">
            3
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              Submit → validate → action
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              On submit, Formura validates values against your schema
              client-side first. If validation fails, errors are mapped to
              fields immediately and the action is never called. If it passes,
              your action receives the validated data.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-400">
            4
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              Result → state
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Your action returns an{" "}
              <code className="text-foreground">ActionResult</code>. If it
              contains <code className="text-foreground">fieldErrors</code>,
              they are mapped onto the form. The result is available via{" "}
              <code className="text-foreground">useFormState()</code> for
              success/error UI.
            </p>
          </div>
        </li>
      </ol>

      <p className="mt-6 text-sm font-medium text-foreground">
        What you do not write with Formura:
      </p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
        <li>
          No <code className="text-foreground">register()</code> calls or manual
          field wiring
        </li>
        <li>No separate validation schema vs form schema</li>
        <li>No manual FormData parsing in server actions</li>
        <li>No submission state boilerplate (isPending, error, result)</li>
        <li>No field-level error propagation code</li>
        <li>No adapter config beyond a single import</li>
      </ul>
    </DocsSection>

    <DocsSection id="install" title="Install" className="mt-10">
      <PackageManagerTabs />
      <p className="text-sm text-muted-foreground">
        Your app needs Tailwind CSS so adapter utility classes apply.
      </p>
    </DocsSection>

    <DocsSection id="prerequisites" title="Prerequisites" className="mt-10">
      <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
        <li>React 18.2+ or 19</li>
        <li>
          Next.js 14+ (required for Server Actions — client actions work
          anywhere)
        </li>
        <li>Zod 4+</li>
        <li>Tailwind CSS 4+</li>
      </ul>
    </DocsSection>

    <DocsSection id="tailwind" title="Tailwind setup" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Include adapter sources in your Tailwind content scan so utility classes
        from bundled components are picked up:
      </p>
      <CopyCodeBlock title="app/globals.css">{`@import "@formura/adapters/tailwind.css";`}</CopyCodeBlock>
    </DocsSection>

    <DocsSection id="quickstart" title="Quick start" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Three files. That is the entire integration. Define a schema, tag an
        action, call{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          createForm
        </code>
        .
      </p>
      <CopyCodeBlock title="schema.ts">{`import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "At least 2 characters"),
  email: z.email("Invalid email"),
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
        When an adapter is provided, every key in your schema becomes a field
        automatically — no{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          &lt;Field /&gt;
        </code>{" "}
        declarations needed. Children inside{" "}
        <code className="text-foreground">&lt;Form&gt;</code> that are not{" "}
        <code className="text-foreground">&lt;Field&gt;</code> elements (like
        submit buttons) are rendered after the auto-generated fields.
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
