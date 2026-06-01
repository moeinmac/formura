// app/signup-form.tsx
"use client";

import React from "react";
import { z } from "zod";
import { createForm } from "@formura/core";
import { clientAction } from "./client-action";

export const userSchema = z.object({
  username: z.string().min(3, "Must span at least 3 characters"),
  password: z.string().min(1, "Filled the password"),
});

const { Form, Field, useFormState } = createForm({
  schema: userSchema,
  action: clientAction,
  defaultValues: { username: "", password: "" },
  GlobalErrorElement: ({ errorMessage }) => <span style={{ color: "red", fontSize: "12px" }}>{errorMessage}</span>,
});

// A localized submit button utilizing action statuses deep within the component tree
const SubmitButton = () => {
  const { isSubmitting } = useFormState();

  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Processing Transaction..." : "Register Account"}
    </button>
  );
};

export default function SignupForm() {
  return (
    <Form className="space-y-4">
      <Field name="username" label="Username" render={({ field }) => <input {...field} className="border p-2" placeholder="Pick a persona" />} />
      <Field name="password" label="Password" render={({ field }) => <input {...field} type="password" className="border p-2" />} />
      <SubmitButton />
    </Form>
  );
}
