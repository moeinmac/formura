"use client";

import { createForm, ErrorElementProps } from "@formura/core";
import { FC } from "react";
import z from "zod";

const schema = z.object({
  username: z.string().min(2, "minimum 2"),
  password: z.coerce.number().min(1, "minum 1"),
  otp: z.string().describe("widget:otp"),
});

const ErrorCom: FC<ErrorElementProps> = ({ errorMessage }) => {
  return <div>Error : {errorMessage}</div>;
};

const Home = () => {
  const { Form, Field, AutoFields } = createForm({
    schema,
    action: () => new Promise((res, rej) => {}),
    defaultValues: {
      password: 1,
      username: "salam",
    },
    GlobalErrorElement: ErrorCom,
  });

  return (
    <div>
      <Form>
        <AutoFields />
        {/* <Field name="username" placeholder="Username" />
        <Field name="password" placeholder="Password" />
        <button>submit</button> */}
      </Form>
    </div>
  );
};

export default Home;
