import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Users from "@/pages/users";

describe("Get Users", () => {
  it("should get users", async () => {
    render(<Users />);
    expect(
      screen.getByRole("heading", { level: 3, name: /users/i }),
    ).toBeVisible();
  });

  it("should render the users", async () => {
    render(<Users />);

    const response = await fetch("https://api.escuelajs.co/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await expect(response.json()).resolves.toEqual([
      {
        id: "abc-123",
        name: "John Maverick",
        email: "john@example.com",
        role: "admin",
      },
      {
        id: "abc-124",
        name: "Jane Doe",
        email: "john2@example.com",
        role: "user",
      },
    ]);
  });
});
