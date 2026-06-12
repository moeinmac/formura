"use client";

import { Button } from "@/components/ui/button";
import {
  SignupForm,
  useSignupFormState,
} from "@/lib/create-demo-form";

function SignupFormInner() {
  const { isSubmitting, result } = useSignupFormState();

  return (
    <>
      <Button
        type="submit"
        className="w-full bg-violet-500 text-white hover:bg-violet-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Sign up"}
      </Button>

      {result?.status === "success" && (
        <div className="mt-4 rounded-lg border border-violet-500/30 bg-violet-500/10 p-3 text-sm text-violet-300">
          Account created! User ID: {result.data?.userId}
        </div>
      )}

      {result?.status === "error" && result.message && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {result.message}
        </div>
      )}
    </>
  );
}

export function SignupFormDemo() {
  return (
    <div>
      <SignupForm className="space-y-4">
        <SignupFormInner />
      </SignupForm>

      <p className="mt-4 text-xs text-muted-foreground">
        Try username <code className="text-foreground">admin</code> or email{" "}
        <code className="text-foreground">taken@example.com</code> to see field errors.
      </p>
    </div>
  );
}
