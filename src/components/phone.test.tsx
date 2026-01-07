import { describe, expect, it } from "vitest";

import { NO_DATA_MESSAGE } from "@/lib/constants";
import { customRender, screen } from "@/lib/test-utils";
import { formatPhoneNumber } from "@/lib/utils";
import Phone from "./phone";

describe("Phone component", () => {
  it("should render the no data message when the phone number is undefined", () => {
    customRender(<Phone phone={undefined} />);
    expect(screen.getByText(NO_DATA_MESSAGE)).toBeVisible();
  });

  it("should render the phone number with the correct format when the phone number is defined", () => {
    customRender(<Phone phone="1234567890" />);
    expect(screen.getByText(formatPhoneNumber("1234567890"))).toBeVisible();
  });
});
