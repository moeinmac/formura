import Link from "next/link";
import { SignupFormDemo } from "@/components/demos/signup-form";
import { CodeBlock } from "@/components/marketing/code-block";

export default function SignupExamplePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/examples"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← All examples
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Signup with Server Action
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        This form uses <code className="text-foreground">asServerAction</code> to
        handle submissions on the server with automatic field error mapping.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/50 p-6">
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            Live form
          </h2>
          <SignupFormDemo />
        </div>

        <div>
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            Server action
          </h2>
          <CodeBlock>{`"use server";

export const signupAction = asServerAction(
  async (prevState, formData) => {
    const username = formData.get("username");

    if (username === "admin") {
      return {
        status: "error",
        fieldErrors: {
          username: "This handle is reserved.",
        },
      };
    }

    return {
      status: "success",
      data: { userId: "user_99a8f" },
    };
  }
);`}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
