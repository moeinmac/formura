"use client";

import { motion } from "framer-motion";
import { ArrowRight, Braces, FormInput, Wand2 } from "lucide-react";
import { Section, SectionHeader } from "./section";
import { CodeBlock } from "./code-block";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const steps = [
  {
    icon: Braces,
    title: "Define your schema",
    code: `const schema = z.object({
  username: z.string().min(2),
  role: z.enum(["dev", "design"]),
  terms: z.boolean(),
});`,
  },
  {
    icon: Wand2,
    title: "Create the form",
    code: `const { Form, Field } = createForm({
  schema,
  adapter: shadcnAdapter,
  action: signupAction,
});`,
  },
  {
    icon: FormInput,
    title: "Render fields",
    code: `<Form className="space-y-4">  
  {/* Fields auto-render from schema */}
  <button type="submit">Submit</button>          
</Form>

`,
  },
];

export function HowItWorks() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="how-it-works">
      <SectionHeader
        eyebrow="How it works"
        title="Schema alchemy in three steps"
        description="No field arrays. No register() calls. Your Zod schema is the single source of truth."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative"
          >
            {i < steps.length - 1 && (
              <ArrowRight className="absolute -right-4 top-8 hidden size-5 text-muted-foreground/40 lg:block" />
            )}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20">
                <step.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="font-semibold">{step.title}</h3>
              </div>
            </div>
            <CodeBlock>{step.code}</CodeBlock>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
