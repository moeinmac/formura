import { cn } from "@/lib/utils";

type DocsSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function DocsSection({
  id,
  title,
  children,
  className,
}: DocsSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 space-y-4", className)}>
      <h2 className="text-xl font-semibold tracking-tight">
        <a
          href={`#${id}`}
          className="text-foreground hover:text-violet-400 transition-colors"
        >
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}
