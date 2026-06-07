"use client";

import React from "react";
import { z } from "zod";
import { createForm } from "@formura/core";
import { clientAction } from "./client-action";
import shadcnAdapter from "@formura/adapters/shadcn";

export const userSchema = z.object({
  username: z.string().min(3, "Must span at least 3 characters"),
  password: z
    .string()
    .min(1, "Filled the password")
    .describe("widget:password"),
  role: z.enum(["admin", "user"]),
  interests: z
    .array(z.enum(["code", "design", "music"]))
    .min(1, "Pick at least one interest"),
});

const { Form, useFormState, Field } = createForm({
  schema: userSchema,
  // adapter: shadcnAdapter,
  action: clientAction,
  defaultValues: {
    username: "",
    password: "",
    role: "user",
    interests: [],
  },
  GlobalErrorElement: ({ errorMessage }) => (
    <span className="text-xs text-red-600">{errorMessage}</span>
  ),
  fields: {
    role: {
      render({ field }) {
        return <div>{field.value}</div>;
      },
    },
  },
});

const SubmitButton = () => {
  const { isSubmitting } = useFormState();

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
    >
      {isSubmitting ? "Processing Transaction..." : "Register Account"}
    </button>
  );
};

export default function SignupForm() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-neutral-600">
          All fields are rendered automatically from the schema.
        </p>
      </div>
      {/* Fields are auto-mounted from the schema — only add non-field children here */}
      <Form className="flex flex-col gap-4">
        <Field
          name="password"
          render={({ field }) => <div>{field.name}</div>}
        />
        <SubmitButton />
      </Form>
      {/* Optional: override one field with a custom widget */}
      {/* <Form><Field name="password" render={({ field }) => <CustomInput {...field} />} /><SubmitButton /></Form> */}
    </main>
  );
}
