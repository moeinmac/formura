import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/arrow-right";

const examples = [
  {
    title: "Signup (Server Action)",
    description:
      "A signup form powered by a Next.js Server Action. Try reserved usernames to see field-level errors.",
    href: "/examples/signup",
    badge: "Live",
    available: true,
  },
  {
    title: "All Widgets",
    description:
      "A showcase of every inferred widget type — text, password, OTP, select, checkbox, and more.",
    href: "/examples/all-widgets",
    badge: "Coming soon",
    available: false,
  },
];

const ExamplesPage = () => (
  <div className="mx-auto min-h-screen max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
    <h1 className="text-3xl font-bold tracking-tight">Examples</h1>
    <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
      Real forms built with Formura. Fork them, break them, learn from them.
    </p>

    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {examples.map((example) => (
        <Card
          key={example.title}
          className="group border-border/60 transition hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{example.title}</CardTitle>
              <Badge
                variant={example.available ? "default" : "secondary"}
                className={
                  example.available
                    ? "bg-violet-500/15 text-violet-400 hover:bg-violet-500/15"
                    : ""
                }
              >
                {example.badge}
              </Badge>
            </div>
            <CardDescription>{example.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {example.available ? (
              <Link
                href={example.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-400 transition group-hover:gap-2"
              >
                View example
                <ArrowRightIcon size={20} />
              </Link>
            ) : (
              <span className="text-sm text-muted-foreground">
                Available in a future release
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ExamplesPage;
