import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

const createFormOptions = [
  {
    option: "schema",
    type: "ZodType",
    required: true,
    description:
      "Zod object schema — single source of truth for fields, widget inference, and client-side validation.",
  },
  {
    option: "action",
    type: "FormAction",
    required: true,
    description:
      "Tagged server or client action from asServerAction / asClientAction. Formura detects the tag at runtime to route correctly.",
  },
  {
    option: "adapter",
    type: "FormAdapter",
    required: false,
    description:
      "UI adapter that renders fields automatically. Without it, every Field component requires a render prop — TypeScript enforces this.",
  },
  {
    option: "defaultValues",
    type: "Partial<FormValues>",
    required: false,
    description:
      "Initial field values. Keys must match schema fields. Omitted fields default to undefined.",
  },
  {
    option: "fields",
    type: "Record<string, FieldConfig>",
    required: false,
    description:
      "Per-field config (label, render, disabled, ErrorElement) without JSX. Overrides auto-generated defaults. JSX <Field> children take precedence over this.",
  },
  {
    option: "GlobalErrorElement",
    type: "ComponentType<{ errorMessage: string }>",
    required: false,
    description:
      "Default error display component for all fields. Per-field ErrorElement overrides this.",
  },
  {
    option: "onSuccess",
    type: "(result: ActionSuccess<TData>) => void",
    required: false,
    description: 'Called when the action returns status: "success".',
  },
  {
    option: "onError",
    type: "(result: ActionError) => void",
    required: false,
    description: 'Called when the action returns status: "error".',
  },
  {
    option: "onSettled",
    type: "(result: ActionResult<TData>) => void",
    required: false,
    description: "Called after every action completes, success or error.",
  },
];

const CreateFormPage = () => (
  <article>
    <h1 className="text-3xl font-bold tracking-tight">createForm API</h1>
    <p className="mt-3 text-lg text-muted-foreground">
      The factory that turns a Zod schema into a typed form with auto-rendered
      fields, built-in validation, and a wired action.
    </p>

    <DocsCallout className="mt-6">
      Boilerplate is a crime. Formura is the lawyer.
    </DocsCallout>

    <DocsSection id="returns" title="Returns" className="mt-10">
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          createForm
        </code>{" "}
        returns three typed pieces that all share the same internal form store:
      </p>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Export</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">Form</td>
              <td className="px-4 py-3">
                A <code className="text-foreground">&lt;form&gt;</code> wrapper.
                Handles submit, runs validation, auto-renders schema fields when
                an adapter is set. Accepts{" "}
                <code className="text-foreground">className</code> and optional
                children.
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">Field</td>
              <td className="px-4 py-3">
                Renders or overrides a single field. When an adapter is set,{" "}
                <code className="text-foreground">render</code> is optional.
                Without an adapter,{" "}
                <code className="text-foreground">render</code> is required —
                TypeScript enforces this distinction.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">
                useFormState
              </td>
              <td className="px-4 py-3">
                Hook that exposes{" "}
                <code className="text-foreground">isSubmitting</code>,{" "}
                <code className="text-foreground">result</code>, and{" "}
                <code className="text-foreground">submitCount</code>. Must be
                called inside the component tree that renders{" "}
                <code className="text-foreground">&lt;Form&gt;</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsSection>

    <DocsSection id="options" title="Options" className="mt-10">
      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Option</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {createFormOptions.map((row) => (
              <tr
                key={row.option}
                className="border-b border-border/40 last:border-0"
              >
                <td className="px-4 py-3 align-top">
                  <code className="font-mono text-foreground">
                    {row.option}
                  </code>
                  {row.required && (
                    <span className="ml-2 text-xs text-violet-400">
                      required
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  {row.type}
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocsSection>

    <DocsSection id="example" title="Full example" className="mt-10">
      <CopyCodeBlock title="create-demo-form.ts">{`import { asClientAction, createForm } from "@formura/core";
import shadcnAdapter from "@formura/adapters/shadcn";
import { z } from "zod";

const demoSchema = z.object({
  username: z.string().min(2),
  email:    z.email(),
  role:     z.enum(["developer", "designer", "manager"]),
  terms:    z.boolean().refine((v) => v, "You must accept the terms"),
});

const demoClientAction = asClientAction<typeof demoSchema>(
  async (values) => {
    if (values.username.toLowerCase() === "taken") {
      return {
        status: "error",
        fieldErrors: { username: "Username already taken." },
      };
    }
    return { status: "success", data: values };
  },
);

export const { Form, Field, useFormState } = createForm({
  schema: demoSchema,
  adapter: shadcnAdapter,
  action: demoClientAction,
  defaultValues: {
    username: "",
    email: "",
    role: "developer",
    terms: false,
  },
  fields: {
    terms: { label: "I accept the terms of service" },
  },
  onSuccess: (result) => console.log("created", result.data),
});`}</CopyCodeBlock>
    </DocsSection>

    <DocsSection
      id="validation"
      title="Client-side validation"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        Formura validates values against your Zod schema before ever calling
        your action. If any field fails, errors are mapped directly onto the
        relevant fields — your action only runs when the entire schema passes.
        There is no way for an invalid submission to reach the server.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        If your action returns{" "}
        <code className="text-foreground">fieldErrors</code>, those are also
        mapped onto fields after the action completes. Both schema validation
        errors and server-returned errors flow through the same field error
        state.
      </p>
    </DocsSection>

    <DocsSection
      id="headless"
      title="Headless mode (no adapter)"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        Omit the{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          adapter
        </code>{" "}
        option and Formura becomes entirely headless. In headless mode, every{" "}
        <code className="text-foreground">&lt;Field&gt;</code> requires a{" "}
        <code className="text-foreground">render</code> prop — TypeScript
        enforces this by making <code className="text-foreground">render</code>{" "}
        required on the Field type. You control every pixel.
      </p>
      <CopyCodeBlock title="headless-form.tsx">{`"use client";

import { createForm } from "@formura/core";
import { z } from "zod";
import { myAction } from "./actions";

const schema = z.object({
  username: z.string().min(2),
  email: z.email(),
});

// No adapter — Field.render is required (TypeScript error if omitted)
const { Form, Field, useFormState } = createForm({
  schema,
  action: myAction,
});

export const HeadlessSignup = () => {
  const { isSubmitting, result } = useFormState();

  return (
    <Form>
      <Field
        name="username"
        label="Username"
        render={({ field }) => (
          <input
            name={field.name}
            value={field.value as string}
            onChange={field.onChange}
            disabled={field.disabled}
            style={{ border: "1px solid gray", padding: "4px 8px" }}
          />
        )}
      />
      <Field
        name="email"
        label="Email"
        render={({ field }) => (
          <input
            type="email"
            name={field.name}
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign up"}
      </button>
      {result?.status === "success" && <p>Done!</p>}
    </Form>
  );
};`}</CopyCodeBlock>
      <p className="text-sm text-muted-foreground">
        The <code className="text-foreground">render</code> prop receives a{" "}
        <code className="text-foreground">field</code> object with{" "}
        <code className="text-foreground">name</code>,{" "}
        <code className="text-foreground">value</code>,{" "}
        <code className="text-foreground">onChange</code>,{" "}
        <code className="text-foreground">onBlur</code>, and{" "}
        <code className="text-foreground">disabled</code>. Validation and action
        routing work identically regardless of whether an adapter is used.
      </p>
    </DocsSection>


    <DocsNextLink
      href="/docs/fields"
      title="Fields"
      description="Auto-render, overrides, custom render props, and error display."
    />
  </article>
);

export default CreateFormPage;
