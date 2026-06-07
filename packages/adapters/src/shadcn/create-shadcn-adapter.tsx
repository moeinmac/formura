import type { FormAdapter } from "@formura/core";
import { ShadcnFieldWrapper } from "./field-wrapper";
import { renderShadcnWidget } from "./fields/render-widget";

export const createShadcnAdapter = (): FormAdapter => ({
  renderField: (props) => renderShadcnWidget(props),
  FieldWrapper: ShadcnFieldWrapper,
});
