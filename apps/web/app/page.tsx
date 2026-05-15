"use client";

import { createForm } from "@formura/core";

const Home = () => {
  const { Field, Form } = createForm({ action: () => {}, schema: {} });
  return <div>Hello World!</div>;
};

export default Home;
