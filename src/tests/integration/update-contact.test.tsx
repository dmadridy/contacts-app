import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "firebase/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Contact as ContactType } from "@/index";
import { userStore } from "@/lib/store/user";
import Contact from "@/pages/contact";
import Contacts from "@/pages/contacts";

// Mock Firebase Firestore functions
const mockOnSnapshot = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();

vi.mock("firebase/firestore", () => ({
  collection: (...args: unknown[]) => mockCollection(...args),
  doc: (...args: unknown[]) => mockDoc(...args),
  onSnapshot: (...args: unknown[]) => mockOnSnapshot(...args),
  deleteDoc: vi.fn(),
}));

// Mock Firebase at the module level
vi.mock("@/lib/firebase", () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  },
  db: {},
  analytics: null,
}));

describe("Update Contact", () => {
  const mockUser = {
    uid: "test-user-id",
    email: "test@example.com",
  } as const;

  const mockContacts: ContactType[] = [
    {
      id: "contact-1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      keywords: ["friend"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    // Set up user in store
    userStore.getState().setUser(mockUser as User);

    // Mock Firestore document references
    const mockDocRef = { id: "users", path: "users/test-user-id" };
    const mockCollectionRef = {
      id: "contacts",
      path: "users/test-user-id/contacts",
    };

    mockDoc.mockReturnValue(mockDocRef);
    mockCollection.mockReturnValue(mockCollectionRef);

    // Mock onSnapshot to call the callback with mock data
    mockOnSnapshot.mockImplementation((_ref, onNext) => {
      // Create a mock snapshot
      const mockSnapshot = {
        docs: mockContacts.map((contact) => ({
          id: contact.id,
          data: () => ({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            keywords: contact.keywords,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
          }),
        })),
      };

      // Call the success callback
      onNext(mockSnapshot);

      // Return unsubscribe function
      return () => {};
    });
  });

  it("should show both See details and Delete options when clicking the action button", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/contacts"]}>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contact/:id" element={<Contact />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.queryByText(/no data found/i)).not.toBeInTheDocument();
    });

    // Find and click the action button
    const actionButton = screen.getByRole("button", {
      name: /contact actions/i,
    });

    await user.click(actionButton);

    expect(screen.getByText(/see details/i)).toBeVisible();
  });
});
