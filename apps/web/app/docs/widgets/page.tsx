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
    note: "Default for all strings without a widget hint. Renders a plain text input.",
  },
  {
    widget: "password",
    inferred: 'z.string().describe("widget:password")',
    example: `password: z.string().min(8).describe("widget:password")`,
    note: "Renders an input with type=\"password\". Inference won't guess this on its own — always add the hint.",
  },
  {
    widget: "otp",
    inferred: 'z.string().describe("widget:otp") or fixed length 4–8',
    example: `code: z.string().length(6).describe("widget:otp")
// Auto-inferred when minLength === maxLength and the value is 4–8
verificationPin: z.string().min(6).max(6)`,
    note: "OTP length is read from the schema's min/max constraints. Falls back to 6 slots when ambiguous.",
  },
  {
    widget: "textarea",
    inferred: 'z.string().describe("widget:textarea")',
    example: `bio: z.string().max(500).describe("widget:textarea")`,
    note: "Renders a resizable textarea. Zod max() acts as a visual guide — HTML maxLength is not set automatically.",
  },
  {
    widget: "number",
    inferred: "z.number()",
    example: `age: z.number().min(18).max(120)`,
    note: "Renders type=\"number\". The field value is a JavaScript number, not a string — no manual coercion needed.",
  },
  {
    widget: "select",
    inferred: "z.enum([...])",
    example: `role: z.enum(["developer", "designer", "manager"])`,
    note: "Options are derived from the enum values. Labels match values by default — use the fields config to rename them.",
  },
  {
    widget: "multiSelect",
    inferred: "z.array(z.enum([...]))",
    example: `skills: z.array(z.enum(["react", "node", "design"]))`,
    note: "Renders a checkbox list. Value is a string array matching the selected enum values.",
  },
  {
    widget: "checkbox",
    inferred: "z.boolean()",
    example: `terms: z.boolean().refine((v) => v, "You must accept the terms")`,
    note: "Renders a single checkbox. Value is a native boolean.",
  },
  {
    widget: "date",
    inferred: "z.coerce.date() / z.date()",
    example: `birthday: z.coerce.date()
// z.coerce.date() is preferred — it accepts ISO strings from FormData`,
    note: "Renders a calendar date picker. Value is a JavaScript Date object with the time component set to midnight.",
  },
  {
    widget: "time",
    inferred: 'z.string().describe("widget:time")',
    example: `startTime: z.string().describe("widget:time")`,
    note: 'Value is a string in "HH:mm" 24-hour format (e.g. "14:30"). Inference will not guess time from z.string() alone — the hint is required.',
  },
  {
    widget: "datetime",
    inferred: 'z.coerce.date().describe("widget:datetime")',
    example: `scheduledAt: z.coerce.date().describe("widget:datetime")`,
    note: "Renders a combined calendar + time picker. Value is a JavaScript Date object with both date and time components.",
  },
];

const WidgetsPage = () => (
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
      <p className="text-sm text-muted-foreground">
        Formura reads your Zod field type — and optionally a{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          .describe()
        </code>{" "}
        hint — to choose the correct widget automatically. Optional, nullable,
        and default wrappers are stripped before inference.
      </p>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Zod type</th>
              <th className="px-4 py-3 text-left font-medium">Widget</th>
            </tr>
          </thead>
          <tbody>
            {widgets.map((row) => (
              <tr
                key={row.widget}
                className="border-b border-border/40 last:border-0"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
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
        to any Zod field to override or guide inference. Formura parses the{" "}
        <code className="text-foreground">widget:</code> prefix from the
        description string using a regex — any other description content is
        ignored. Valid widget names are:
      </p>
      <div className="flex flex-wrap gap-2">
        {[
          "text",
          "password",
          "number",
          "otp",
          "select",
          "multiSelect",
          "textarea",
          "checkbox",
          "date",
          "time",
          "datetime",
        ].map((w) => (
          <Badge key={w} variant="secondary" className="font-mono">
            {w}
          </Badge>
        ))}
      </div>
      <CopyCodeBlock>{`// Explicit widget hints
password: z.string().min(8).describe("widget:password")
bio:      z.string().max(500).describe("widget:textarea")
code:     z.string().length(6).describe("widget:otp")
start:    z.string().describe("widget:time")
meeting:  z.coerce.date().describe("widget:datetime")`}</CopyCodeBlock>
      <p className="text-sm text-muted-foreground">
        The description string can contain other text — only the{" "}
        <code className="text-foreground">widget:</code> portion is parsed. For
        example,{" "}
        <code className="text-foreground">
          .describe(&quot;User bio widget:textarea&quot;)
        </code>{" "}
        works fine.
      </p>
    </DocsSection>

    <DocsSection
      id="wrapper-unwrapping"
      title="Optional, nullable, and default"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        Formura unwraps Zod modifier wrappers before inferring the widget. You
        can mark fields optional or give them defaults without affecting the
        rendered widget:
      </p>
      <CopyCodeBlock>{`// All of these still render a "text" widget
username: z.string()
username: z.string().optional()
username: z.string().nullable()
username: z.string().default("")

// Wrappers are stripped up to 16 layers deep
username: z.string().optional().default("").nullable()`}</CopyCodeBlock>
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

    <DocsSection
      id="date-time-values"
      title="Date and time value types"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        Date and time widgets each have a distinct value type. Make sure your
        schema matches:
      </p>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Widget</th>
              <th className="px-4 py-3 text-left font-medium">Value type</th>
              <th className="px-4 py-3 text-left font-medium">Example value</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3">
                <Badge variant="secondary" className="font-mono">
                  date
                </Badge>
              </td>
              <td className="px-4 py-3 font-mono text-xs">Date</td>
              <td className="px-4 py-3 font-mono text-xs">
                new Date(&quot;2026-07-08&quot;)
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3">
                <Badge variant="secondary" className="font-mono">
                  time
                </Badge>
              </td>
              <td className="px-4 py-3 font-mono text-xs">string</td>
              <td className="px-4 py-3 font-mono text-xs">&quot;14:30&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Badge variant="secondary" className="font-mono">
                  datetime
                </Badge>
              </td>
              <td className="px-4 py-3 font-mono text-xs">Date</td>
              <td className="px-4 py-3 font-mono text-xs">
                new Date(&quot;2026-07-08T14:30:00&quot;)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground">
        Use{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          z.coerce.date()
        </code>{" "}
        instead of{" "}
        <code className="text-foreground">z.date()</code> when the value may
        arrive as an ISO string (e.g. from a Server Action via FormData).
      </p>
    </DocsSection>

    <DocsSection
      id="custom-shadcn"
      title="Custom shadcn components"
      className="mt-10"
    >
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

export default WidgetsPage;
