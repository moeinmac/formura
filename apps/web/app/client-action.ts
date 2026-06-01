import { asClientAction } from "@formura/core";
import { userSchema } from "./page";

export const clientAction = asClientAction<typeof userSchema>(async (values) => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return {
      status: "error",
      message: "Registration failed.",
      fieldErrors: { username: "Username already taken." },
    };
  }

  return { status: "success", data: await res.json() };
});
