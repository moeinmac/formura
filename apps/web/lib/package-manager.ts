export type PackageManager = "pnpm" | "npm" | "yarn";

export const PM_STORAGE_KEY = "formura:package-manager";

export const DEFAULT_PACKAGE_MANAGER: PackageManager = "npm";

export const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn"];

export const installCommands: Record<PackageManager, string> = {
  pnpm: "pnpm add @formura/core @formura/adapters",
  npm: "npm install @formura/core @formura/adapters",
  yarn: "yarn add @formura/core @formura/adapters",
};

export const isPackageManager = (value: string): value is PackageManager =>
  PACKAGE_MANAGERS.includes(value as PackageManager);
