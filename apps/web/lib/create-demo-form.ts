import { asClientAction, createForm } from "@formura/core";
import shadcnAdapter from "@formura/adapters/shadcn";
import { signupAction } from "@/lib/actions";
import { demoSchema, signupSchema } from "./schemas";

export const demoClientAction = asClientAction<typeof demoSchema>(
  async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (values.username.toLowerCase() === "taken") {
      return {
        status: "error",
        message: "Username unavailable.",
        fieldErrors: { username: "This username is already taken." },
      };
    }

    return { status: "success", data: values };
  },
);

export const {
  Form: DemoForm,
  Field: DemoField,
  useFormState: useDemoFormState,
} = createForm({
  schema: demoSchema,
  adapter: shadcnAdapter,
  action: demoClientAction,
  defaultValues: {
    username: "",
    email: "",
    role: "developer",
    terms: false,
  },
});

export const {
  Form: SignupForm,
  Field: SignupField,
  useFormState: useSignupFormState,
} = createForm({
  schema: signupSchema,
  adapter: shadcnAdapter,
  action: signupAction,
  defaultValues: {
    username: "",
    email: "",
  },
});
