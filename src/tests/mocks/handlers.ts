import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://users", () =>
    HttpResponse.json(
      [
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
      ],
      { status: 200 },
    ),
  ),
];
