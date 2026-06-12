import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

const widgets = [
  {
    widget: "text",
    inferred: "z.string()",
    example: `username: z.string().min(2, "At least 2 characters")`,
    note: "Default for all strings without a widget hint.",
  },
  {
    widget: "password",
    inferred: 'z.string().describe("widget:password")',
    example: `password: z.string().min(8).describe("widget:password")`,
    note: "Use describe when inference would pick text.",
  },
  {
    widget: "otp",
    inferred: 'z.string().describe("widget:otp") or fixed length 4–8',
    example: `code: z.string().length(6).describe("widget:otp")
// or auto-inferred when minLength === maxLength (4–8)`,
    note: "OTP is inferred when min and max length are equal between 4 and 8.",
  },
  {
    widget: "textarea",
    inferred: 'z.string().describe("widget:textarea")',
    example: `bio: z.string().max(500).describe("widget:textarea")`,
    note: null,
  },
  {
    widget: "number",
    inferred: "z.number()",
    example: `age: z.number().min(18).max(120)`,
    note: null,
  },
  {
    widget: "select",
    inferred: "z.enum([...])",
    example: `role: z.enum(["developer", "designer", "manager"])`,
    note: "Options are derived from enum values.",
  },
  {
    widget: "multiSelect",
    inferred: "z.array(z.enum([...]))",
    example: `skills: z.array(z.enum(["react", "node", "design"]))`,
    note: "Renders a multi-select for array-of-enum fields.",
  },
  {
    widget: "checkbox",
    inferred: "z.boolean()",
    example: `terms: z.boolean().refine((v) => v, "You must accept the terms")`,
    note: null,
  },
];

export default function WidgetsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">Widget Reference</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Formura infers the right widget from your Zod schema. Use{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
          .describe(&quot;widget:&lt;name&gt;&quot;)
        </code>{" "}
        when inference is ambiguous.
      </p>

      <DocsSection id="overview" title="Inference table" className="mt-10">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-4 py-3 text-left font-medium">Inferred from</th>
                <th className="px-4 py-3 text-left font-medium">Widget</th>
              </tr>
            </thead>
            <tbody>
              {widgets.map((row) => (
                <tr
                  key={row.widget}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {row.inferred}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="font-mono">
                      {row.widget}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection id="widget-hints" title="Widget hints" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Add{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            .describe(&quot;widget:&lt;name&gt;&quot;)
          </code>{" "}
          to any Zod field. Formura parses the{" "}
          <code className="text-foreground">widget:</code> prefix from the
          description string. Allowed values:{" "}
          <code className="text-foreground">text</code>,{" "}
          <code className="text-foreground">password</code>,{" "}
          <code className="text-foreground">number</code>,{" "}
          <code className="text-foreground">otp</code>,{" "}
          <code className="text-foreground">select</code>,{" "}
          <code className="text-foreground">multiSelect</code>,{" "}
          <code className="text-foreground">textarea</code>,{" "}
          <code className="text-foreground">checkbox</code>.
        </p>
        <CopyCodeBlock>{`// Explicit widget override
password: z.string().min(8).describe("widget:password")
bio: z.string().max(500).describe("widget:textarea")
code: z.string().length(6).describe("widget:otp")`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="per-widget" title="Per-widget examples" className="mt-10">
        <div className="space-y-8">
          {widgets.map((row) => (
            <div
              key={row.widget}
              className="rounded-xl border border-border/60 bg-muted/10 p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <Badge variant="secondary" className="font-mono">
                  {row.widget}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {row.inferred}
                </span>
              </div>
              <CopyCodeBlock>{row.example}</CopyCodeBlock>
              {row.note && (
                <p className="mt-3 text-sm text-muted-foreground">{row.note}</p>
              )}
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="custom-shadcn" title="Custom shadcn components" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Extend the default adapter when you need to swap primitives from your
          local shadcn install. See{" "}
          <Link href="/docs/adapters" className="text-violet-400 hover:underline">
            Adapters
          </Link>
          .
        </p>
        <CopyCodeBlock>{`import { createShadcnAdapter } from "@formura/adapters/shadcn";

const adapter = createShadcnAdapter();`}</CopyCodeBlock>
      </DocsSection>

      <DocsNextLink
        href="/docs/adapters"
        title="Adapters"
        description="Tailwind setup, default shadcn adapter, and custom adapters."
      />
    </article>
  );
}
