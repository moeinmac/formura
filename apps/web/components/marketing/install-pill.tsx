"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function InstallPill() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(siteConfig.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5",
        "font-mono text-sm text-neutral-300 backdrop-blur-sm transition hover:border-violet-500/40 hover:bg-violet-500/10",
      )}
    >
      <span className="text-violet-400">$</span>
      <span>{siteConfig.installCommand}</span>
      {copied ? (
        <Check className="size-4 text-violet-400" />
      ) : (
        <Copy className="size-4 opacity-50 transition group-hover:opacity-100" />
      )}
    </motion.button>
  );
}
