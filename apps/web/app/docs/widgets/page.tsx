import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const widgets = [
  { inferred: "z.string()", widget: "text" },
  { inferred: 'z.string().describe("widget:password")', widget: "password" },
  {
    inferred: 'z.string().describe("widget:otp") or fixed length 4–8',
    widget: "otp",
  },
  { inferred: 'z.string().describe("widget:textarea")', widget: "textarea" },
  { inferred: "z.number()", widget: "number" },
  { inferred: "z.enum([...])", widget: "select" },
  { inferred: "z.array(z.enum([...]))", widget: "multiSelect" },
  { inferred: "z.boolean()", widget: "checkbox" },
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

      <div className="mt-10 overflow-hidden rounded-xl border border-border/60">
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

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">Custom shadcn components</h2>
        <p className="text-sm text-muted-foreground">
          Extend the default adapter when you need to swap primitives from your
          local shadcn install:
        </p>
        <pre className="overflow-x-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
          <code>{`import { createShadcnAdapter } from "@formura/adapters/shadcn";

const adapter = createShadcnAdapter();`}</code>
        </pre>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        <Link href="/docs" className="text-violet-400 hover:underline">
          ← Back to Getting Started
        </Link>
      </p>
    </article>
  );
}
