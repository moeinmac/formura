import { type FC } from "react";
import { type CreateFormOptions } from "./types";

interface ErrorElementProps {
  GlobalErrorElement?: CreateFormOptions<any>["GlobalErrorElement"];
  error: string | undefined;
}

export const ErrorElement: FC<ErrorElementProps> = ({ error, GlobalErrorElement }) => {
  return error ? (
    GlobalErrorElement ? (
      <GlobalErrorElement {...GlobalErrorElement} errorMessage={error} />
    ) : (
      <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
    )
  ) : (
    <></>
  );
};

export default ErrorElement;
