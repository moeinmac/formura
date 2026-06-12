import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

export default function ActionsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">Actions</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Formura routes your submit handler automatically — tag it once and forget
        about wiring.
      </p>

      <DocsCallout className="mt-6">
        Client action? Server action? Formura doesn&apos;t care, it just works.
      </DocsCallout>

      <DocsSection id="overview" title="How actions work" className="mt-10">
        <p className="text-sm text-muted-foreground">
          On submit, Formura validates with your Zod schema first. If validation
          passes, it calls your action and maps any{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            fieldErrors
          </code>{" "}
          back onto the form fields.
        </p>
      </DocsSection>

      <DocsSection id="server-actions" title="Server Actions" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            asServerAction
          </code>{" "}
          from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            @formura/core/server
          </code>{" "}
          in a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            &quot;use server&quot;
          </code>{" "}
          file. The handler receives{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            prevState
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            formData
          </code>
          .
        </p>
        <CopyCodeBlock title="actions.ts">{`"use server";

import type { ActionResult } from "@formura/core";
import { asServerAction } from "@formura/core/server";

type SignupData = { userId: string };

export const signupAction = asServerAction<SignupData>(
  async (_prevState, formData): Promise<ActionResult<SignupData>> => {
    const username = formData.get("username");

    if (username === "admin") {
      return {
        status: "error",
        message: "Database rejection",
        fieldErrors: { username: "This handle is strictly reserved." },
      };
    }

    return {
      status: "success",
      data: { userId: "user_99a8f" },
    };
  },
);`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="client-actions" title="Client Actions" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Use{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            asClientAction
          </code>{" "}
          when you want typed values instead of raw FormData — perfect for REST
          APIs or client-side flows.
        </p>
        <DocsCallout className="my-4">
          Formura: Because writing forms shouldn&apos;t make you question your
          career choices.
        </DocsCallout>
        <CopyCodeBlock title="client-action.ts">{`import { asClientAction } from "@formura/core";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
});

export const clientAction = asClientAction<typeof schema>(
  async (values) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      return {
        status: "error",
        fieldErrors: { username: "Already taken." },
      };
    }

    return { status: "success", data: await res.json() };
  },
);`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="action-result" title="ActionResult" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Every action must return one of these shapes:
        </p>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Fields</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/40">
                <td className="px-4 py-3 font-mono text-foreground">
                  &quot;success&quot;
                </td>
                <td className="px-4 py-3">
                  <code>data?</code>, <code>message?</code>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-foreground">
                  &quot;error&quot;
                </td>
                <td className="px-4 py-3">
                  <code>message?</code>, <code>fieldErrors?</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CopyCodeBlock>{`// Success
{ status: "success", data: { userId: "user_123" }, message: "Welcome!" }

// Error with field-level feedback
{ status: "error", message: "Validation failed", fieldErrors: { email: "Taken" } }`}</CopyCodeBlock>
      </DocsSection>

      <DocsSection id="use-form-state" title="useFormState" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Read submission state inside your form tree:
        </p>
        <CopyCodeBlock title="signup-form.tsx">{`const { Form, useFormState } = createForm({ ... });

function SubmitButton() {
  const { isSubmitting, result, submitCount } = useFormState();

  return (
    <>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign up"}
      </button>

      {result?.status === "success" && (
        <p>Account created! ID: {result.data?.userId}</p>
      )}

      {result?.status === "error" && result.message && (
        <p>{result.message}</p>
      )}
    </>
  );
}`}</CopyCodeBlock>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>
            <code className="text-foreground">isSubmitting</code> — true while
            the action is in flight
          </li>
          <li>
            <code className="text-foreground">result</code> — last{" "}
            <code className="text-foreground">ActionResult</code> or null
          </li>
          <li>
            <code className="text-foreground">submitCount</code> — number of
            submissions
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="callbacks" title="Lifecycle callbacks" className="mt-10">
        <p className="text-sm text-muted-foreground">
          Pass optional callbacks to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            createForm
          </code>
          :
        </p>
        <CopyCodeBlock>{`createForm({
  schema,
  action,
  adapter: shadcnAdapter,
  onSuccess: (result) => console.log("done", result.data),
  onError: (result) => console.log("failed", result.message),
  onSettled: (result) => console.log("settled", result.status),
});`}</CopyCodeBlock>
      </DocsSection>

      <DocsNextLink
        href="/docs/create-form"
        title="createForm API"
        description="Every option on createForm, explained."
      />
    </article>
  );
}
