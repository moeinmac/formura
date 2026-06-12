"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyCodeBlockProps = {
  children: string;
  className?: string;
  title?: string;
};

export function CopyCodeBlock({
  children,
  className,
  title,
}: CopyCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/60 bg-muted/30",
        className,
      )}
    >
      {title && (
        <div className="border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 pr-12 text-sm leading-relaxed">
          <code className="font-mono text-foreground/90">{children}</code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute top-3 right-3 rounded-md border border-border/60 bg-background/80 p-1.5 text-muted-foreground opacity-0 transition hover:text-foreground group-hover:opacity-100 focus:opacity-100"
        >
          {copied ? (
            <Check className="size-4 text-violet-400" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
