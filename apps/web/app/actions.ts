"use server";

import type { ActionResult } from "@formura/core";
import { asServerAction } from "@formura/core/server";

type SignupData = {
  userId: string;
  username: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
};

export const signupAction = asServerAction<SignupData>(
  async (_prevState, formData): Promise<ActionResult<SignupData>> => {
    const username = formData.get("username");
    const email = formData.get("email");

    if (username === "admin") {
      return {
        status: "error",
        message: "Database rejection",
        fieldErrors: { username: "This handle is strictly reserved." },
      };
    }

    if (email === "taken@example.com") {
      return {
        status: "error",
        message: "Email already registered.",
        fieldErrors: { email: "This email is already in use." },
      };
    }

    return {
      status: "success",
      data: { userId: "user_99a8f", username, email },
    };
  },
);
