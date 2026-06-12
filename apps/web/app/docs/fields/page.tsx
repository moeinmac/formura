import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

const FieldsPage = () => (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">Fields</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        How Formura turns schema keys into rendered inputs — automatically or on
        your terms.
      </p>

      <DocsCallout className="mt-6">
        Your schema called. It wants to be a form.
      </DocsCallout>

      <DocsSection id="auto-render" title="Auto-render" className="mt-10">
        <p className="text-sm text-muted-foreground">
          When you pass an adapter to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            createForm
          </code>
          , every key in your Zod object schema becomes a field automatically.
          Labels are generated from field names via{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            formatFieldLabel
          </code>{" "}
          — so <code className="text-foreground">firstName</code> becomes
          &quot;First Name&quot;.
        </p>
        <CopyCodeBlock>{`const { Form } = createForm({
  schema: z.object({ username: z.string(), email: z.string().email() }),
  adapter: shadcnAdapter,
  action,
});

// Renders username + email fields with no <Field /> declarations
<Form className="space-y-4">
  <button type="submit">Submit</button>
</Form>`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="fields-option" title="fields option" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Override labels, disable fields, or swap render logic without writing
          JSX — useful when the form is defined in a separate module:
        </p>
        <CopyCodeBlock>{`createForm({
  schema,
  adapter: shadcnAdapter,
  action,
  fields: {
    username: { label: "Choose a handle" },
    terms: { label: "I accept the terms of service", disabled: false },
    role: {
      label: "Your role",
      render: ({ field }) => <CustomRolePicker {...field} />,
    },
  },
});`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="field-component" title="Field component" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Place{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            &lt;Field /&gt;
          </code>{" "}
          inside{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            &lt;Form&gt;
          </code>{" "}
          to override a specific field. Child overrides win over the{" "}
          <code className="text-foreground">fields</code> option:
        </p>
        <CopyCodeBlock>{`<Form className="space-y-4">
  <Field name="username" label="Pick a unique username" />
  <Field name="email" label="Work email" />
  <button type="submit">Sign up</button>
</Form>`}</CopyCodeBlock>
        <p className="text-sm text-muted-foreground">
          Any children that are not{" "}
          <code className="text-foreground">&lt;Field /&gt;</code> elements
          (like submit buttons) are rendered after the auto-generated fields.
        </p>
      </DocsSection>

      <DocsSection id="custom-render" title="Custom render (headless)" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Skip the adapter entirely and control every pixel with a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            render
          </code>{" "}
          prop. Required when no adapter is provided:
        </p>
        <CopyCodeBlock>{`const { Form, Field } = createForm({ schema, action });

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
      />
    )}
  />
  <button type="submit">Submit</button>
</Form>`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="errors" title="Error display" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Field errors come from two sources: Zod validation on submit, and{" "}
          <code className="text-foreground">fieldErrors</code> returned by your
          action.
        </p>
        <CopyCodeBlock>{`const MyError = ({ errorMessage }: { errorMessage: string }) => {
  return <p className="text-sm text-red-500">{errorMessage}</p>;
}

createForm({
  schema,
  adapter: shadcnAdapter,
  action,
  GlobalErrorElement: MyError,
  fields: {
    email: { ErrorElement: MyError },
  },
});`}</CopyCodeBlock>
        <p className="text-sm text-muted-foreground">
          Per-field <code className="text-foreground">ErrorElement</code>{" "}
          overrides <code className="text-foreground">GlobalErrorElement</code>{" "}
          for that field only.
        </p>
      </DocsSection>

      <DocsNextLink
        href="/docs/widgets"
        title="Widgets"
        description="How Zod types map to text, select, checkbox, and more."
      />
    </article>
  );

export default FieldsPage;
