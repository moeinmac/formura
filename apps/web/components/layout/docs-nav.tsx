"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-2 lg:flex-col lg:gap-1">
      {docsNavItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground",
              isActive && "bg-muted font-medium text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
