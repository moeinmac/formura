import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

const createFormOptions = [
  {
    option: "schema",
    type: "ZodType",
    required: true,
    description: "Zod object schema — single source of truth for fields and validation.",
  },
  {
    option: "action",
    type: "FormAction",
    required: true,
    description: "Tagged server or client action from asServerAction / asClientAction.",
  },
  {
    option: "adapter",
    type: "FormAdapter",
    required: false,
    description: "UI adapter that renders fields. Without it, every Field needs a render prop.",
  },
  {
    option: "defaultValues",
    type: "Partial<FormValues>",
    required: false,
    description: "Initial field values. Keys must match schema fields.",
  },
  {
    option: "fields",
    type: "Record<string, FieldConfig>",
    required: false,
    description: "Per-field overrides (label, render, disabled, ErrorElement) without JSX.",
  },
  {
    option: "GlobalErrorElement",
    type: "Component",
    required: false,
    description: "Default error display component for all fields.",
  },
  {
    option: "onSuccess",
    type: "(result) => void",
    required: false,
    description: "Called when the action returns status: \"success\".",
  },
  {
    option: "onError",
    type: "(result) => void",
    required: false,
    description: "Called when the action returns status: \"error\".",
  },
  {
    option: "onSettled",
    type: "(result) => void",
    required: false,
    description: "Called after every action completes, success or error.",
  },
];

const CreateFormPage = () => (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">createForm API</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        The factory that turns a Zod schema into a typed form with auto-rendered
        fields.
      </p>

      <DocsSection id="returns" title="Returns" className="mt-10">
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            createForm
          </code>{" "}
          returns three pieces:
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            <code className="text-foreground">Form</code> — wraps fields in a{" "}
            <code className="text-foreground">&lt;form&gt;</code>, handles
            submit and validation
          </li>
          <li>
            <code className="text-foreground">Field</code> — renders a single
            field (auto or manual)
          </li>
          <li>
            <code className="text-foreground">useFormState</code> — hook for
            submission state inside the form tree
          </li>
        </ul>
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
                    <code className="font-mono text-foreground">{row.option}</code>
                    {row.required && (
                      <span className="ml-2 text-xs text-violet-400">required</span>
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
  email: z.string().email(),
  role: z.enum(["developer", "designer", "manager"]),
  terms: z.boolean().refine((v) => v, "You must accept the terms"),
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

      <DocsSection id="validation" title="Client-side validation" className="mt-10">
        <p className="text-sm text-muted-foreground">
          On submit, Formura runs{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            schema.safeParse(values)
          </code>{" "}
          before calling your action. Zod errors are flattened and mapped to field
          errors automatically — your action only runs when the client-side
          schema passes.
        </p>
      </DocsSection>

      <DocsSection id="utilities" title="Utility exports" className="mt-10">
        <p className="text-sm text-muted-foreground">
          These helpers are exported from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            @formura/core
          </code>{" "}
          for advanced use:
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>
            <code className="text-foreground">inferFieldMeta</code> — widget
            type and options for a schema field
          </li>
          <li>
            <code className="text-foreground">getFieldSchema</code> — Zod schema
            for a single field
          </li>
          <li>
            <code className="text-foreground">formatFieldLabel</code> — turns{" "}
            <code className="text-foreground">firstName</code> into{" "}
            <code className="text-foreground">First Name</code>
          </li>
          <li>
            <code className="text-foreground">flattenErrors</code> — Zod error
            to field error map
          </li>
          <li>
            <code className="text-foreground">toFormData</code> — values object
            to FormData (used internally for server actions)
          </li>
        </ul>
      </DocsSection>

      <DocsNextLink
        href="/docs/fields"
        title="Fields"
        description="Auto-render, overrides, custom render props, and error display."
      />
    </article>
  );

export default CreateFormPage;
