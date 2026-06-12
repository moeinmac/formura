"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DemoForm,
  useDemoFormState,
} from "@/lib/create-demo-form";
import { Section, SectionHeader } from "./section";
import { CodeBlock } from "./code-block";

const schemaCode = `const demoSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["developer", "designer", "manager"]),
  terms: z.boolean(),
});`;

const DemoFormInner = () => {
  const { isSubmitting, result } = useDemoFormState();

  return (
    <>
      <Button
        type="submit"
        className="w-full bg-violet-500 text-white hover:bg-violet-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Try it live"}
      </Button>

      {result?.status === "success" && (
        <div className="mt-4 rounded-lg border border-violet-500/30 bg-violet-500/10 p-3 text-sm text-violet-300">
          Form submitted! Welcome, {result.data?.username}.
        </div>
      )}

      {result?.status === "error" && result.message && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {result.message}
        </div>
      )}
    </>
  );
};

const DemoFormContent = () => (
  <DemoForm className="space-y-4">
    <DemoFormInner />
  </DemoForm>
);

export const LiveDemo = () => (
  <Section dark id="demo">
    <SectionHeader
      eyebrow="Live demo"
      title="Watch your schema become a form"
      description="This form is rendered entirely from the Zod schema on the left. Try submitting — or type 'taken' as username to see field errors."
      className="[&_p]:text-neutral-400"
    />

    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="outline" className="border-violet-500/30 text-violet-400">
            schema.ts
          </Badge>
        </div>
        <CodeBlock className="border-white/10 bg-white/5">{schemaCode}</CodeBlock>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="outline" className="border-violet-500/30 text-violet-400">
            rendered form
          </Badge>
        </div>
        <DemoFormContent />
      </div>
    </div>
  </Section>
);
