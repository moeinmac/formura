export const siteConfig = {
  name: "Formura",
  tagline: "Schema in. Form out.",
  heroSlogan:
    "One schema to rule them all, one adapter to render them.",
  description:
    "Schema goes in, complete forms come out. Zero boilerplate, infinite DX, and Server Actions built right in.",
  docsDescription:
    "Formura is a schema-first form library for React and Next.js. Give createForm a Zod object schema, wire a server or client action, and get auto-rendered fields, built-in validation, field-level errors, and typed submission state — no register calls, no field arrays, no adapter boilerplate.",
  githubUrl: "https://github.com/moeinmac/formura",
  githubApiUrl: "https://api.github.com/repos/moeinmac/formura",
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Examples", href: "/examples" },
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
