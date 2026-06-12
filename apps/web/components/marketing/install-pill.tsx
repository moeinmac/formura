"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { installCommands } from "@/lib/package-manager";
import { usePackageManager } from "@/lib/use-package-manager";
import { cn } from "@/lib/utils";

import { CheckIcon } from "../ui/check";
import { CopyIcon } from "../ui/copy";

export const InstallPill = () => {
  const [copied, setCopied] = useState(false);
  const { packageManager } = usePackageManager();
  const installCommand = installCommands[packageManager];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
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
      <span>{installCommand}</span>
      {copied ? (
        <CheckIcon size={16} className="size-4 text-violet-400" />
      ) : (
        <CopyIcon
          size={16}
          className="size-4 opacity-50 transition group-hover:opacity-100"
        />
      )}
    </motion.button>
  );
};
