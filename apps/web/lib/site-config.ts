export const siteConfig = {
  name: "Formura",
  tagline: "Schema in. Form out.",
  heroSlogan:
    "One schema to rule them all, one adapter to render them.",
  description:
    "Schema goes in, complete forms come out. Zero boilerplate, infinite DX, and Server Actions built right in.",
  githubUrl: "https://github.com/moeinmac/formura",
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Examples", href: "/examples" },
  { label: "GitHub", href: siteConfig.githubUrl, external: true },
];

export type DocsNavItem = {
  label: string;
  href: string;
};

export type DocsNavGroup = {
  title: string;
  items: DocsNavItem[];
};

export const docsNavGroups: DocsNavGroup[] = [
  {
    title: "Guide",
    items: [
      { label: "Getting Started", href: "/docs" },
      { label: "Actions", href: "/docs/actions" },
      { label: "createForm API", href: "/docs/create-form" },
      { label: "Fields", href: "/docs/fields" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Widgets", href: "/docs/widgets" },
      { label: "Adapters", href: "/docs/adapters" },
    ],
  },
];
