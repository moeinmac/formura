"use client";

import {
  PACKAGE_MANAGERS,
  installCommands,
  type PackageManager,
} from "@/lib/package-manager";
import { usePackageManager } from "@/lib/use-package-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyCodeBlock } from "./copy-code-block";

type PackageManagerTabsProps = {
  className?: string;
};

export function PackageManagerTabs({ className }: PackageManagerTabsProps) {
  const { packageManager, setPackageManager } = usePackageManager();

  return (
    <div className={className}>
      <Tabs
        value={packageManager}
        onValueChange={(value) => setPackageManager(value as PackageManager)}
      >
        <TabsList>
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsTrigger key={pm} value={pm}>
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>
        {PACKAGE_MANAGERS.map((pm) => (
          <TabsContent key={pm} value={pm}>
            <CopyCodeBlock>{installCommands[pm]}</CopyCodeBlock>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
