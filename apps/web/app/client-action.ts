import { asClientAction } from "@formura/core";
import { demoSchema } from "@/lib/schemas";

export const clientAction = asClientAction<typeof demoSchema>(
  async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (values.username.toLowerCase() === "taken") {
      return {
        status: "error",
        message: "Registration failed.",
        fieldErrors: { username: "Username already taken." },
      };
    }

    return { status: "success", data: values };
  },
);
