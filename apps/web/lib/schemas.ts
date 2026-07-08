import { z } from "zod";

export const demoSchema = z.object({
  username: z.string().min(2, "At least 2 characters"),
  email: z.email("Invalid email"),
  role: z.enum(["developer", "designer", "manager"]),
  terms: z.boolean().refine((v) => v, "You must accept the terms"),
});

export type DemoSchema = typeof demoSchema;

export const signupSchema = z.object({
  username: z.string().min(2, "At least 2 characters"),
  email: z.email("Invalid email"),
});

export type SignupSchema = typeof signupSchema;
