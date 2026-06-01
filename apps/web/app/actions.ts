"use server";

import { asServerAction } from "@formura/core/server";

export const signupAction = asServerAction(async (prevState, formData) => {
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
});
