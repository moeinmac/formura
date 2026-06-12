import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "./section";

const widgets = [
  { name: "text", schema: "z.string()" },
  { name: "password", schema: '.describe("widget:password")' },
  { name: "otp", schema: '.describe("widget:otp")' },
  { name: "number", schema: "z.number()" },
  { name: "select", schema: "z.enum([...])" },
  { name: "multiSelect", schema: "z.array(z.enum([...]))" },
  { name: "textarea", schema: '.describe("widget:textarea")' },
  { name: "checkbox", schema: "z.boolean()" },
];

export function WidgetStrip() {
  return (
    <Section id="widgets">
      <SectionHeader
        eyebrow="Widgets"
        title="Inferred from your schema"
        description="Formura reads Zod types and metadata to pick the right widget. Override when you need to."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((widget) => (
          <div
            key={widget.name}
            className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition hover:border-violet-500/30 hover:bg-violet-500/5"
          >
            <Badge variant="secondary" className="mb-2 font-mono text-xs">
              {widget.name}
            </Badge>
            <p className="font-mono text-xs text-muted-foreground">
              {widget.schema}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
