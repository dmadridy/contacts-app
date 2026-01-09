import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { formatPhoneNumber } from "@/lib/utils";
import BasicStep from "@/pages/create-contact/basic-step";
import ContactStep from "@/pages/create-contact/contact-step";
import SummaryStep from "@/pages/create-contact/summary-step";

describe("Create Contact", () => {
  it("should create a contact", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/create-contact"]}>
        <Routes>
          <Route path="/create-contact">
            <Route index element={<BasicStep />} />
            <Route path="contact" element={<ContactStep />} />
            <Route path="summary" element={<SummaryStep />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const nextButton = screen.getByRole("button", { name: /next/i });

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");

    await user.click(nextButton);

    const emailInput = await screen.findByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    const nextButton2 = screen.getByRole("button", { name: /next/i });

    await user.type(emailInput, "john.doe@example.com");
    await user.type(phoneInput, "1234567890");

    expect(emailInput).toHaveValue("john.doe@example.com");
    expect(phoneInput).toHaveValue(formatPhoneNumber("1234567890"));

    await user.click(nextButton2);

    const createContactButton = await screen.findByRole("button", {
      name: /create contact/i,
    });

    expect(createContactButton).toBeVisible();
  });
});
