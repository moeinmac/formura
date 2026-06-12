import { cn } from "@/lib/utils";

type CodeBlockProps = {
  children: string;
  className?: string;
  title?: string;
};

export const CodeBlock = ({ children, className, title }: CodeBlockProps) => (
  <div
    className={cn(
      "overflow-hidden rounded-xl border border-border/60 bg-muted/30",
      className,
    )}
  >
    {title && (
      <div className="border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
        {title}
      </div>
    )}
    <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
      <code className="font-mono text-foreground/90">{children}</code>
    </pre>
  </div>
);
