import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Counter from "./counter";

describe("Counter component", () => {
  it("should display count as 0 when first initialized", () => {
    render(<Counter />);
    expect(screen.queryByText("0")).toBeVisible();
  });

  it("should increase the count when the increment button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementButton);

    expect(screen.getByText("1")).toBeVisible();
  });

  it("should decrease the count when the decrement button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    // First increment to have a count > 0
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementButton);
    expect(screen.getByText("1")).toBeVisible();

    // Then decrement
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    await user.click(decrementButton);

    expect(screen.getByText("0")).toBeVisible();
  });

  it("should reset the count to 0 when the reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    // First increment a few times
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(screen.getByText("3")).toBeVisible();

    // Then reset
    const resetButton = screen.getByRole("button", { name: /reset/i });
    await user.click(resetButton);

    expect(screen.getByText("0")).toBeVisible();
  });
});
