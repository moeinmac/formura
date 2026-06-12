import { cn } from "@/lib/utils";

type DocsCalloutProps = {
  children: React.ReactNode;
  className?: string;
};

export const DocsCallout = ({ children, className }: DocsCalloutProps) => (
  <aside
    className={cn(
      "rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-violet-200/90",
      className,
    )}
  >
    {children}
  </aside>
);
