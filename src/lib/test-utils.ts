import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

import TestWrapper from "@/components/test-wrapper";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: TestWrapper, ...options });

export * from "@testing-library/react";
export { customRender };
