import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsSection } from "@/components/docs/docs-section";
import { DocsNextLink } from "@/components/docs/docs-next-link";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";

const ActionsPage = () => (
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
        Actions are tagged functions. Tagging is what lets Formura route them
        correctly at runtime — a{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          _tag
        </code>{" "}
        property is attached so the form engine knows whether to call it as a
        server action (via <code className="text-foreground">useFormState</code>{" "}
        / React transitions) or invoke it directly as a client function.
      </p>
    </DocsSection>

    <DocsSection id="validation-flow" title="Validation flow" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Understanding the exact submit sequence prevents confusion about when
        your action runs and where errors come from:
      </p>
      <ol className="mt-4 space-y-4">
        {[
          {
            step: "1",
            title: "Client-side validation",
            desc: "Formura validates all field values against your Zod schema before any network call. This happens entirely in the browser.",
          },
          {
            step: "2",
            title: "Validation fails → field errors, stop",
            desc: "If validation fails, errors are mapped onto the relevant fields immediately. The action is never called and isSubmitting returns to false.",
          },
          {
            step: "3",
            title: "Validation passes → call action",
            desc: "For server actions, values are serialized to FormData automatically. For client actions, they are passed as a typed object. Your action is called.",
          },
          {
            step: "4",
            title: "Action returns ActionResult",
            desc: "If the result contains fieldErrors, they are mapped onto field error state — overwriting any previous validation errors for those fields. The result is stored and useFormState().result updates.",
          },
          {
            step: "5",
            title: "Lifecycle callbacks fire",
            desc: "onSuccess, onError, or onSettled are called with the result, depending on the status.",
          },
        ].map((row) => (
          <li key={row.step} className="flex gap-4">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-400">
              {row.step}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground font-mono">
                {row.title}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{row.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </DocsSection>

    <DocsSection
      id="server-vs-client"
      title="Server vs client actions"
      className="mt-10"
    >
      <p className="text-sm text-muted-foreground">
        Pick the action type based on what your handler needs to do:
      </p>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium"></th>
              <th className="px-4 py-3 text-left font-medium">Server Action</th>
              <th className="px-4 py-3 text-left font-medium">Client Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-medium text-foreground">Import</td>
              <td className="px-4 py-3 font-mono text-xs">
                @formura/core/server
              </td>
              <td className="px-4 py-3 font-mono text-xs">@formura/core</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-medium text-foreground">
                Receives
              </td>
              <td className="px-4 py-3">
                <code>prevState</code>, <code>formData</code> (raw FormData)
              </td>
              <td className="px-4 py-3">
                <code>values</code> (typed object), <code>formData</code>
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-medium text-foreground">
                File directive
              </td>
              <td className="px-4 py-3">
                Must be in a <code>&quot;use server&quot;</code> file
              </td>
              <td className="px-4 py-3">
                Works anywhere, including client components
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-medium text-foreground">
                Use when
              </td>
              <td className="px-4 py-3">
                Database writes, auth, server-only secrets, revalidation
              </td>
              <td className="px-4 py-3">
                REST API calls, client-side logic, no server needed
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">
                Requires Next.js?
              </td>
              <td className="px-4 py-3">Yes (14+)</td>
              <td className="px-4 py-3">No — works with any React setup</td>
            </tr>
          </tbody>
        </table>
      </div>
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
        in a file marked{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          &quot;use server&quot;
        </code>
        . The handler receives{" "}
        <code className="text-foreground">prevState</code> (the last
        ActionResult or null) and raw{" "}
        <code className="text-foreground">formData</code>. Parse values yourself
        or let the schema handle it.
      </p>
      <CopyCodeBlock title="actions.ts">{`"use server";

import type { ActionResult } from "@formura/core";
import { asServerAction } from "@formura/core/server";

type SignupData = { userId: string };

export const signupAction = asServerAction<SignupData>(
  async (_prevState, formData): Promise<ActionResult<SignupData>> => {
    const username = String(formData.get("username") ?? "");

    if (username === "admin") {
      return {
        status: "error",
        message: "Database rejection",
        fieldErrors: { username: "This handle is strictly reserved." },
      };
    }

    // Do your DB write, send email, etc.
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
        when you want typed, validated values instead of raw FormData — perfect
        for REST APIs, third-party SDKs, or any client-side flow that does not
        need a server boundary.
      </p>
      <CopyCodeBlock title="client-action.ts">{`import { asClientAction } from "@formura/core";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(2),
  email: z.email(),
});

// values is typed as { username: string; email: string }
export const clientAction = asClientAction<typeof schema>(
  async (values, formData) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        Every action must return one of two shapes. The{" "}
        <code className="text-foreground">TData</code> generic on the success
        branch flows through to{" "}
        <code className="text-foreground">useFormState().result</code>:
      </p>
      <CopyCodeBlock>{`// Success — data is typed as TData
{ status: "success", data?: TData, message?: string }

// Error — fieldErrors keys are plain strings, not typed to the schema
{ status: "error", message?: string, fieldErrors?: Record<string, string> }`}</CopyCodeBlock>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Fields</th>
              <th className="px-4 py-3 text-left font-medium">Notes</th>
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
              <td className="px-4 py-3">
                Triggers <code>onSuccess</code>. Result available in{" "}
                <code>useFormState().result</code>.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">
                &quot;error&quot;
              </td>
              <td className="px-4 py-3">
                <code>message?</code>, <code>fieldErrors?</code>
              </td>
              <td className="px-4 py-3">
                <code>fieldErrors</code> keys are mapped onto field error state.
                Triggers <code>onError</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsSection>

    <DocsSection id="use-form-state" title="useFormState" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Read submission state anywhere inside your form tree. The hook reads
        from the same context the{" "}
        <code className="text-foreground">&lt;Form&gt;</code> component provides
        — it will throw if used outside a Form:
      </p>
      <CopyCodeBlock title="signup-form.tsx">{`const { Form, useFormState } = createForm({ ... });

const SubmitButton = () => {
  const { isSubmitting, result, submitCount } = useFormState();

  return (
    <>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign up"}
      </button>

      {result?.status === "success" && (
        <p className="text-green-500">
          Account created! ID: {result.data?.userId}
        </p>
      )}

      {result?.status === "error" && result.message && (
        <p className="text-red-500">{result.message}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Submitted {submitCount} time{submitCount !== 1 ? "s" : ""}
      </p>
    </>
  );
};`}</CopyCodeBlock>
      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Property</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">
                isSubmitting
              </td>
              <td className="px-4 py-3 font-mono text-xs">boolean</td>
              <td className="px-4 py-3">
                True while the action is in flight. False during client-side
                validation failures.
              </td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="px-4 py-3 font-mono text-foreground">result</td>
              <td className="px-4 py-3 font-mono text-xs">
                ActionResult&lt;TData&gt; | null
              </td>
              <td className="px-4 py-3">
                The last ActionResult returned by your action. null before first
                submission.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-foreground">
                submitCount
              </td>
              <td className="px-4 py-3 font-mono text-xs">number</td>
              <td className="px-4 py-3">
                Total number of submissions including validation-failed ones.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsSection>

    <DocsSection id="callbacks" title="Lifecycle callbacks" className="mt-10">
      <p className="text-sm text-muted-foreground">
        Pass optional callbacks to{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
          createForm
        </code>{" "}
        to react to action outcomes outside the form component — for toast
        notifications, redirects, analytics, etc.:
      </p>
      <CopyCodeBlock>{`createForm({
  schema,
  action,
  adapter: shadcnAdapter,
  onSuccess: (result) => {
    toast.success("Account created!");
    router.push("/dashboard");
  },
  onError: (result) => {
    toast.error(result.message ?? "Something went wrong.");
  },
  onSettled: (result) => {
    analytics.track("form_submitted", { status: result.status });
  },
});`}</CopyCodeBlock>
      <p className="text-sm text-muted-foreground">
        Callbacks are defined at factory time, not per-render. They receive the
        full <code className="text-foreground">ActionResult</code> object with
        the typed <code className="text-foreground">data</code> or{" "}
        <code className="text-foreground">fieldErrors</code>.
      </p>
    </DocsSection>

    <DocsNextLink
      href="/docs/create-form"
      title="createForm API"
      description="Every option on createForm, explained."
    />
  </article>
);

export default ActionsPage;
