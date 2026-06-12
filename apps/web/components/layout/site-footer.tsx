import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/examples" className="hover:text-foreground transition-colors">
              Examples
            </Link>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-xs text-muted-foreground">
          MIT License · Built for developers who&apos;ve suffered enough.
        </p>
      </div>
    </footer>
  );
}
