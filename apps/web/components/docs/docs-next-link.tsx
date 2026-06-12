import Link from "next/link";
import { ArrowRight } from "lucide-react";

type DocsNextLinkProps = {
  href: string;
  title: string;
  description: string;
};

export const DocsNextLink = ({ href, title, description }: DocsNextLinkProps) => (
  <Link
    href={href}
    className="group mt-12 flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-5 transition hover:border-violet-500/30 hover:bg-violet-500/5"
  >
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Next
      </p>
      <p className="mt-1 font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
    <ArrowRight className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-violet-400" />
  </Link>
);
