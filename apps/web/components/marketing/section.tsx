"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
};

export const Section = ({ children, className, id, dark }: SectionProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative px-6 py-24 sm:px-8 lg:px-12",
        dark ? "bg-black text-white" : "bg-background",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </motion.section>
  );
};

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) => (
  <div className={cn("mb-12 max-w-2xl", className)}>
    {eyebrow && (
      <p className="mb-3 text-sm font-medium uppercase tracking-wider text-violet-400">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    {description && (
      <p className="mt-3 text-lg text-muted-foreground">{description}</p>
    )}
  </div>
);
