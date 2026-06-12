import { DocsNav } from "@/components/layout/docs-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <aside className="lg:w-48 lg:shrink-0">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Documentation
          </p>
          <DocsNav />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
