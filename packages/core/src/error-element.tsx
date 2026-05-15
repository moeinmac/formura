import { type FC } from "react";
import { type CreateFormOptions } from "./types";

interface ErrorElementProps {
  errorElement?: CreateFormOptions<any>["errorElement"];
  error: string | undefined;
}

export const ErrorElement: FC<ErrorElementProps> = ({ error, errorElement }) => {
  const GlobalErrorElement = errorElement ? errorElement : null;

  return error ? (
    GlobalErrorElement ? (
      <GlobalErrorElement {...errorElement} errorMessage={error} />
    ) : (
      <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
    )
  ) : (
    <></>
  );
};

export default ErrorElement;
