"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Cloud,
  Layers,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionHeader } from "./section";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const features = [
  {
    icon: Zap,
    title: "Zero boilerplate",
    description:
      "Define a Zod schema once. Formura infers widgets, labels, and validation automatically.",
  },
  {
    icon: Server,
    title: "Server Actions",
    description:
      "Tag your server action with asServerAction and Formura handles prevState, FormData, and field errors.",
  },
  {
    icon: Cloud,
    title: "Client actions",
    description:
      "Use asClientAction for client-side submissions with the same unified API and error handling.",
  },
  {
    icon: Sparkles,
    title: "Widget inference",
    description:
      "Strings, numbers, enums, booleans — each maps to the right input. Override with .describe('widget:otp').",
  },
  {
    icon: Layers,
    title: "shadcn adapter",
    description:
      "Beautiful defaults out of the box. Swap primitives or extend createShadcnAdapter for your design system.",
  },
  {
    icon: Blocks,
    title: "App Router ready",
    description:
      "Built for Next.js with React 19. Server and client components work together seamlessly.",
  },
];

export function FeaturesBento() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="features">
      <SectionHeader
        eyebrow="Features"
        title="Everything you need, nothing you don't"
        description="Form libraries shouldn't require a PhD in useEffect. Formura gets out of your way."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={reducedMotion ? undefined : { y: -4 }}
          >
            <Card className="h-full border-border/60 bg-card/50 transition-shadow hover:shadow-lg hover:shadow-violet-500/5">
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <feature.icon className="size-4" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
