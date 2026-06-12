"use client";

import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";
import { InstallPill } from "./install-pill";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-black px-4 pb-20 pt-16 sm:px-6">
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticles-hero"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#a78bfa"
          speed={0.5}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 px-4 text-center">
        <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl lg:text-8xl">
          Formura
        </h1>

        <p className="max-w-xl text-base text-neutral-300 sm:text-lg">
          {siteConfig.heroSlogan}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-violet-500 px-6 text-white hover:bg-violet-400"
            asChild
          >
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/examples">See Examples</Link>
          </Button>
        </div>

        <InstallPill />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
