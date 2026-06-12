"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig, navItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

type SiteHeaderInnerProps = {
  githubSlot: React.ReactNode;
};

export const SiteHeaderInner = ({ githubSlot }: SiteHeaderInnerProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        isHome
          ? "border-white/10 bg-black/60 backdrop-blur-xl"
          : "border-border/60 bg-background/80 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-violet-500/15 text-sm font-bold text-violet-400 ring-1 ring-violet-500/30 transition group-hover:bg-violet-500/25">
            F
          </span>
          <span className="font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(isActive && "bg-muted text-foreground")}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {githubSlot}
          <Button
            size="sm"
            className="hidden bg-violet-500 text-white hover:bg-violet-400 sm:inline-flex"
            asChild
          >
            <Link href="/docs">Get Started</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
