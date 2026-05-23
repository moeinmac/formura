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
  const { Form, Field } = createForm({
    schema,
    action: () => new Promise((res, rej) => {}),
    defaultValues: {
      enum: "hi",
      username: "salam",
    },
    adapter: "",
    GlobalErrorElement: (props) => <div>{props.errorMessage}</div>,
  });

  return (
    <div>
      <Form />
    </div>
  );
};

export default Home;
