import Link from "next/link";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";
import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

const bundledPrimitives = [
  "Input (text, password, number)",
  "Textarea",
  "Select",
  "Checkbox",
  "Input OTP",
  "Label + field wrapper",
];

const AdaptersPage = () => (
  <article>
    <h1 className="text-3xl font-bold tracking-tight">Adapters</h1>
    <p className="mt-3 text-lg text-muted-foreground">
      UI adapters bridge your Zod schema metadata to real components.
    </p>

    <DocsCallout className="mt-6">
      One schema to rule them all, one adapter to render them.
    </DocsCallout>

    <DocsSection id="install" title="Install" className="mt-10">
      <PackageManagerTabs />
    </DocsSection>

    <DocsSection id="tailwind" title="Tailwind setup" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Adapter components use Tailwind utility classes. Add the package to your
        Tailwind content scan:
      </p>
      <CopyCodeBlock>{`/* app/globals.css */
@import "@formura/adapters/tailwind.css";`}</CopyCodeBlock>
    </DocsSection>

    <DocsSection
      id="default-adapter"
      title="Default shadcn adapter"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        Import the pre-built adapter and pass it to{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          createForm
        </code>
        :
      </p>
      <CopyCodeBlock>{`import { createForm } from "@formura/core";
import shadcnAdapter from "@formura/adapters/shadcn";

const { Form } = createForm({
  schema,
  adapter: shadcnAdapter,
  action,
});`}</CopyCodeBlock>
    </DocsSection>

    <DocsSection id="custom-adapter" title="Custom adapter" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Use{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          createShadcnAdapter()
        </code>{" "}
        when you need to swap primitives from your local shadcn install:
      </p>
      <CopyCodeBlock>{`import { createShadcnAdapter } from "@formura/adapters/shadcn";

const adapter = createShadcnAdapter();

const { Form } = createForm({ schema, adapter, action });`}</CopyCodeBlock>
      <p className="text-sm text-muted-foreground">
        Extend <code className="text-foreground">createShadcnAdapter</code> in
        your app to override individual widget renderers or the field wrapper.
      </p>
    </DocsSection>

    <DocsSection id="primitives" title="Bundled primitives" className="mt-10">
      <p className="text-sm text-muted-foreground">
        The shadcn adapter ships with these components out of the box:
      </p>
      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
        {bundledPrimitives.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </DocsSection>

    <DocsSection
      id="adapter-api"
      title="FormAdapter interface"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        Build your own adapter by implementing:
      </p>
      <CopyCodeBlock>{`type FormAdapter = {
  renderField: (props: AdapterFieldProps) => ReactNode;
  FieldWrapper?: ComponentType<FieldWrapperProps>;
};

// AdapterFieldProps includes:
// name, value, onChange, onBlur, disabled, error, label, meta, fieldSchema`}</CopyCodeBlock>
      <p className="text-sm text-muted-foreground">
        Use <code className="text-foreground">meta.widget</code> and{" "}
        <code className="text-foreground">meta.options</code> from{" "}
        <code className="text-foreground">inferFieldMeta</code> to decide which
        component to render. See the{" "}
        <Link href="/docs/widgets" className="text-violet-400 hover:underline">
          widget reference
        </Link>{" "}
        for inference rules.
      </p>
    </DocsSection>

    <DocsNextLink
      href="/examples"
      title="Examples"
      description="Real forms you can fork, break, and learn from."
    />
  </article>
);

export default AdaptersPage;
