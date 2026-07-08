import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

const FieldsPage = () => (
  <article>
    <h1 className="text-3xl font-bold tracking-tight">Form, Field &amp; useFormState</h1>
    <p className="mt-3 text-lg text-muted-foreground">
      Everything returned by <code className="rounded bg-muted px-1.5 py-0.5 text-sm">createForm</code> — the Form wrapper, the Field component, and the hook for reading submission state.
    </p>

    <DocsCallout className="mt-6">
      Your schema called. It wants to be a form.
    </DocsCallout>

    {/* ─── Form ─────────────────────────────────────────────── */}

    <DocsSection id="form" title="Form" className="mt-10">
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          Form
        </code>{" "}
        is a{" "}
        <code className="text-foreground">&lt;form&gt;</code> wrapper that
        handles validation and submission. It provides context for all{" "}
        <code className="text-foreground">&lt;Field&gt;</code> components and
        the <code className="text-foreground">useFormState</code> hook nested
        inside it.
      </p>

      <div className="overflow-hidden rounded-xl border border-border/60 mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Prop</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">className</td>
              <td className="px-4 py-3 font-mono text-xs">string?</td>
              <td className="px-4 py-3">CSS class applied to the underlying <code>&lt;form&gt;</code> element.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">children</td>
              <td className="px-4 py-3 font-mono text-xs">ReactNode?</td>
              <td className="px-4 py-3">
                Optional. Can contain <code>&lt;Field&gt;</code> overrides and
                any other elements (buttons, headings, dividers). Non-Field
                children are rendered after the auto-generated field rows.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 text-base font-semibold">With an adapter</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        When an adapter is configured, every schema key becomes an auto-rendered
        field. An empty{" "}
        <code className="text-foreground">&lt;Form&gt;</code> with just a submit
        button is all you need:
      </p>
      <CopyCodeBlock>{`const { Form, useFormState } = createForm({
  schema,
  adapter: shadcnAdapter,
  action,
  defaultValues: { username: "", email: "" },
});

const SignupForm = () => {
  const { isSubmitting } = useFormState();
  return (
    <Form className="space-y-4">
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>
    </Form>
  );
};`}</CopyCodeBlock>

      <h3 className="mt-6 text-base font-semibold">Without an adapter</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Without an adapter, <code className="text-foreground">&lt;Form&gt;</code>{" "}
        requires explicit{" "}
        <code className="text-foreground">&lt;Field render={"{...}"}&gt;</code>{" "}
        children for every field — there is nothing to auto-render. TypeScript
        enforces this: omitting{" "}
        <code className="text-foreground">render</code> is a compile error.
      </p>
      <CopyCodeBlock>{`const { Form, Field } = createForm({ schema, action }); // no adapter

<Form>
  <Field
    name="username"
    render={({ field }) => (
      <input value={field.value as string} onChange={field.onChange} />
    )}
  />
  <button type="submit">Submit</button>
</Form>`}</CopyCodeBlock>
    </DocsSection>

    {/* ─── Field ────────────────────────────────────────────── */}

    <DocsSection id="field" title="Field" className="mt-10">
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          Field
        </code>{" "}
        renders a single form field. When placed inside a{" "}
        <code className="text-foreground">&lt;Form&gt;</code>, it overrides the
        auto-generated version for that schema key. The{" "}
        <code className="text-foreground">name</code> prop is typed against your
        schema — TypeScript will catch typos or missing keys at compile time.
      </p>

      <div className="overflow-hidden rounded-xl border border-border/60 mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Prop</th>
              <th className="px-4 py-3 text-left font-medium">Required</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">name</td>
              <td className="px-4 py-3">
                <span className="text-violet-400">always</span>
              </td>
              <td className="px-4 py-3">
                The schema key this field maps to. Typed as a union of your
                schema&apos;s top-level keys — invalid names are a TypeScript
                error.
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">label</td>
              <td className="px-4 py-3">optional</td>
              <td className="px-4 py-3">
                Display label for this field. Overrides the auto-generated
                label. If omitted, the label is derived from the field name —{" "}
                <code>firstName</code> becomes <em>First Name</em>.
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">render</td>
              <td className="px-4 py-3">
                <span className="text-violet-400">required without adapter</span>
                <span className="ml-2 text-muted-foreground/60">/ optional with adapter</span>
              </td>
              <td className="px-4 py-3">
                Custom render function. Receives a{" "}
                <code>field</code> object and returns JSX. When provided, it
                replaces the adapter&apos;s default widget for this field.
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">disabled</td>
              <td className="px-4 py-3">optional</td>
              <td className="px-4 py-3">
                Passes the disabled flag to the rendered input. The adapter and
                the <code>render</code> prop both receive it.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">
                ErrorElement
              </td>
              <td className="px-4 py-3">optional</td>
              <td className="px-4 py-3">
                Custom component for displaying this field&apos;s error message.
                Overrides <code>GlobalErrorElement</code> for this field only.
                Receives <code>errorMessage: string</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 text-base font-semibold">The render prop</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        The <code className="text-foreground">render</code> function receives a{" "}
        <code className="text-foreground">field</code> object with everything
        you need to wire any input:
      </p>
      <div className="overflow-hidden rounded-xl border border-border/60 mt-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Property</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">name</td>
              <td className="px-4 py-3">The field key string, e.g. <code>&quot;username&quot;</code>.</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">value</td>
              <td className="px-4 py-3">
                Current field value, typed to the field&apos;s Zod output type.
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">onChange</td>
              <td className="px-4 py-3">
                Call with a new value or a DOM{" "}
                <code>ChangeEvent</code> — Formura extracts the value from
                either. For checkboxes, pass a boolean.
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">onBlur</td>
              <td className="px-4 py-3">Blur handler. Reserved for future use — safe to forward.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">disabled</td>
              <td className="px-4 py-3">Boolean from the <code>disabled</code> prop.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <CopyCodeBlock className="mt-4">{`<Field
  name="bio"
  label="About you"
  render={({ field }) => (
    <textarea
      value={field.value as string}
      onChange={field.onChange}
      disabled={field.disabled}
      rows={4}
    />
  )}
/>`}</CopyCodeBlock>

      <h3 className="mt-6 text-base font-semibold">Overriding one field</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Place a{" "}
        <code className="text-foreground">&lt;Field&gt;</code> inside the form
        when you want to override only one or two fields while leaving the rest
        auto-rendered by the adapter:
      </p>
      <CopyCodeBlock>{`<Form className="space-y-4">
  {/* This field is customised — the rest auto-render normally */}
  <Field
    name="avatar"
    label="Profile photo"
    render={({ field }) => <AvatarUpload onChange={field.onChange} />}
  />
  <button type="submit">Save</button>
</Form>`}</CopyCodeBlock>
    </DocsSection>

    {/* ─── useFormState ─────────────────────────────────────── */}

    <DocsSection id="use-form-state" title="useFormState" className="mt-10">
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          useFormState
        </code>{" "}
        is a hook that exposes live submission state. It reads from the same
        context that{" "}
        <code className="text-foreground">&lt;Form&gt;</code> provides — it
        must be called inside a component that is rendered within that{" "}
        <code className="text-foreground">&lt;Form&gt;</code> tree.
      </p>

      <div className="overflow-hidden rounded-xl border border-border/60 mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Property</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">
                isSubmitting
              </td>
              <td className="px-4 py-3 font-mono text-xs">boolean</td>
              <td className="px-4 py-3">
                <code>true</code> while the action is in flight. Goes back to{" "}
                <code>false</code> when the action resolves — or immediately if
                client-side validation fails (action was never called).
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">result</td>
              <td className="px-4 py-3 font-mono text-xs">
                ActionResult | null
              </td>
              <td className="px-4 py-3">
                The last value returned by your action. <code>null</code> before
                the first submission. Contains{" "}
                <code>status: &quot;success&quot;</code> or{" "}
                <code>status: &quot;error&quot;</code> plus optional{" "}
                <code>data</code> or <code>message</code>.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">
                submitCount
              </td>
              <td className="px-4 py-3 font-mono text-xs">number</td>
              <td className="px-4 py-3">
                Increments on every submit attempt, including ones that fail
                client-side validation. Useful for showing hints after multiple
                failed attempts.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <CopyCodeBlock className="mt-4" title="signup-form.tsx">{`const { Form, useFormState } = createForm({ schema, adapter, action });

const SignupForm = () => {
  const { isSubmitting, result, submitCount } = useFormState();

  return (
    <Form className="space-y-4">
      {result?.status === "success" && (
        <p className="text-green-500">Account created!</p>
      )}
      {result?.status === "error" && result.message && (
        <p className="text-red-500">{result.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>

      {submitCount > 2 && result?.status !== "success" && (
        <p className="text-sm text-muted-foreground">
          Having trouble? Check your input or try a different username.
        </p>
      )}
    </Form>
  );
};`}</CopyCodeBlock>

      <p className="text-sm text-muted-foreground">
        <code className="text-foreground">useFormState</code> can be called in
        any component rendered inside{" "}
        <code className="text-foreground">&lt;Form&gt;</code> — it does not
        have to be in the same component that renders the form itself. This
        makes it easy to extract a submit button or a result banner into a
        separate component.
      </p>
    </DocsSection>

    {/* ─── Override precedence ──────────────────────────────── */}

    <DocsSection
      id="override-precedence"
      title="Override precedence"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        When multiple sources configure the same field, they merge from lowest
        to highest priority:
      </p>
      <div className="mt-4 space-y-2">
        {[
          {
            level: "1",
            label: "Auto-generated",
            desc: "Label derived from the field name, no overrides. This is the default when nothing else is specified.",
          },
          {
            level: "2",
            label: "fields option in createForm",
            desc: "Per-field config passed when calling createForm. Useful when the form factory lives in a separate module from the component.",
          },
          {
            level: "3",
            label: "<Field> JSX child",
            desc: "Explicit <Field name=\"...\" /> inside the Form tree. Always wins over everything else for that field.",
          },
        ].map((row) => (
          <div
            key={row.level}
            className="flex gap-4 rounded-xl border border-border/60 bg-muted/10 p-4"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-400">
              {row.level}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{row.label}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{row.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <CopyCodeBlock className="mt-4">{`createForm({
  schema,
  adapter: shadcnAdapter,
  action,
  fields: {
    username: { label: "Handle" }, // priority 2 — overrides auto "Username"
  },
});

<Form>
  {/* priority 3 — wins over everything */}
  <Field name="username" label="Your unique handle" />
  <button type="submit">Submit</button>
</Form>`}</CopyCodeBlock>
    </DocsSection>

    {/* ─── Error display ────────────────────────────────────── */}

    <DocsSection id="errors" title="Error display" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Field errors come from two sources: schema validation on submit, and{" "}
        <code className="text-foreground">fieldErrors</code> returned by your
        action. Both map to the same per-field error state — your UI does not
        need to distinguish between them.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        By default the adapter renders errors in its own style. You can
        replace the error display globally or per-field:
      </p>
      <CopyCodeBlock>{`const MyError = ({ errorMessage }: { errorMessage: string }) => (
  <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
);

createForm({
  schema,
  adapter: shadcnAdapter,
  action,
  GlobalErrorElement: MyError,       // default for all fields
  fields: {
    email: { ErrorElement: MyError }, // overrides GlobalErrorElement for email only
  },
});`}</CopyCodeBlock>
      <p className="text-sm text-muted-foreground">
        Priority:{" "}
        <code className="text-foreground">Field</code> prop{" "}
        <code className="text-foreground">ErrorElement</code> &gt; field config{" "}
        <code className="text-foreground">ErrorElement</code> &gt;{" "}
        <code className="text-foreground">GlobalErrorElement</code> &gt;
        adapter default.
      </p>
    </DocsSection>

    <DocsNextLink
      href="/docs/widgets"
      title="Widgets"
      description="How Zod types map to text, select, checkbox, date pickers, and more."
    />
  </article>
);

export default FieldsPage;
