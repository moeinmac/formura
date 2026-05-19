"use client";

import { createForm, ErrorElementProps } from "@formura/core";
import { FC } from "react";
import z from "zod";

const schema = z.object({
  username: z.string().min(2, "minimum 2"),
  enum: z.enum(["salam", "hi"]),
});

const ErrorCom: FC<ErrorElementProps> = ({ errorMessage }) => {
  return <div>Error : {errorMessage}</div>;
};

const Home = () => {
  const { Form, Field, AutoFields } = createForm({
    schema,
    action: () => new Promise((res, rej) => {}),
    defaultValues: {
      enum: "hi",
      username: "salam",
    },
    adapter: "",
    GlobalErrorElement: ErrorCom,
  });

  return (
    <div>
      <Form>
        <Field
          name="enum"
          render={({ field }) => {
            return <div>{field.value}</div>;
          }}
        />
        {/* <AutoFields /> */}
        {/* <Field name="password" placeholder="Password" /> */}
        <button>submit</button>
      </Form>
    </div>
  );
};

export default Home;
