// app/signup-form.tsx
"use client";

import React from "react";
import { z } from "zod";
import { signupAction } from "./actions";
import { createForm } from "@formura/core";

const userSchema = z.object({
  username: z.string().min(3, "Must span at least 3 characters"),
  email: z.email("Invalid email layout"),
});

const { Form, Field, useFormState } = createForm({
  schema: userSchema,
  action: signupAction,
  defaultValues: { username: "", email: "" },
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

      <Field name="email" label="Email Address" render={({ field }) => <input {...field} type="email" className="border p-2" />} />

      <SubmitButton />
    </Form>
  );
}
