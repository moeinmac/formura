import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { Section } from "./section";

export function CtaSection() {
  return (
    <Section className="pb-28">
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-background to-background px-8 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stop handwriting forms.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Your schema already knows what fields you need. Let Formura do the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-violet-500 text-white hover:bg-violet-400"
              asChild
            >
              <Link href="/docs">Read the docs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
