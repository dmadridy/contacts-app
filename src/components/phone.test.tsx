import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NO_DATA_MESSAGE } from "@/lib/constants";
import { formatPhoneNumber } from "@/lib/utils";
import Phone from "./phone";

describe("Phone component", () => {
  it("should render the no data message when the phone number is undefined", () => {
    render(<Phone phone={undefined} />);
    expect(screen.getByText(NO_DATA_MESSAGE)).toBeVisible();
  });

  it("should render the phone number with the correct format when the phone number is defined", () => {
    render(<Phone phone="1234567890" />);
    expect(screen.getByText(formatPhoneNumber("1234567890"))).toBeVisible();
  });
});
