"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, siteConfig } from "@/lib/site-config";

export const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="size-5" />
        <span className="sr-only">Open menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-72">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <nav className="mt-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <Button key={item.href} variant="ghost" className="justify-start" asChild>
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
        <Button variant="ghost" className="justify-start" asChild>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Button>
        <Button className="mt-4 bg-violet-500 text-white hover:bg-violet-400" asChild>
          <Link href="/docs">Get Started</Link>
        </Button>
      </nav>
    </SheetContent>
  </Sheet>
);
