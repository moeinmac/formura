"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavGroups } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {docsNavGroups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {group.title}
          </p>
          <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
            {group.items.map((item) => {
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
          </div>
        </div>
      ))}
    </nav>
  );
}
