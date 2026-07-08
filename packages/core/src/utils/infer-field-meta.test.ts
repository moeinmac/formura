import { describe, expect, it } from "vitest";
import { z } from "zod";
import { inferFieldMeta } from "./fieldMeta.utils";

describe("inferFieldMeta", () => {
  const schema = z.object({
    username: z.string().min(3),
    password: z.string().describe("widget:password"),
    code: z.string().length(6).describe("widget:otp"),
    age: z.number(),
    role: z.enum(["admin", "user"]),
    tags: z.array(z.enum(["a", "b"])),
    agree: z.boolean(),
    bio: z.string().describe("widget:textarea"),
    nickname: z.string().optional(),
    birthDate: z.coerce.date(),
    appointmentAt: z.coerce.date().describe("widget:datetime"),
    reminderTime: z.string().describe("widget:time"),
    eventDate: z.date().optional(),
  });

  it("infers text for plain string", () => {
    expect(inferFieldMeta(schema, "username")).toEqual({ widget: "text" });
  });

  it("infers password from describe", () => {
    expect(inferFieldMeta(schema, "password")).toEqual({ widget: "password" });
  });

  it("infers otp from describe", () => {
    expect(inferFieldMeta(schema, "code")).toEqual({ widget: "otp" });
  });

  it("infers number", () => {
    expect(inferFieldMeta(schema, "age")).toEqual({ widget: "number" });
  });

  it("infers select with options from enum", () => {
    expect(inferFieldMeta(schema, "role")).toEqual({
      widget: "select",
      options: [
        { value: "admin", label: "admin" },
        { value: "user", label: "user" },
      ],
    });
  });

  it("infers multiSelect from array of enum", () => {
    expect(inferFieldMeta(schema, "tags")).toEqual({
      widget: "multiSelect",
      options: [
        { value: "a", label: "a" },
        { value: "b", label: "b" },
      ],
    });
  });

  it("infers checkbox for boolean", () => {
    expect(inferFieldMeta(schema, "agree")).toEqual({ widget: "checkbox" });
  });

  it("infers textarea from describe", () => {
    expect(inferFieldMeta(schema, "bio")).toEqual({ widget: "textarea" });
  });

  it("unwraps optional wrappers", () => {
    expect(inferFieldMeta(schema, "nickname")).toEqual({ widget: "text" });
  });

  it("infers date for z.coerce.date()", () => {
    expect(inferFieldMeta(schema, "birthDate")).toEqual({ widget: "date" });
  });

  it("infers dateTime from describe on date schema", () => {
    expect(inferFieldMeta(schema, "appointmentAt")).toEqual({
      widget: "dateTime",
    });
  });

  it("infers time from describe on string schema", () => {
    expect(inferFieldMeta(schema, "reminderTime")).toEqual({ widget: "time" });
  });

  it("unwraps optional date wrappers", () => {
    expect(inferFieldMeta(schema, "eventDate")).toEqual({ widget: "date" });
  });
});
