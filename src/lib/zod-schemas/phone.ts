import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine(
    (val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 10;
    },
    { message: "Phone number must be 10 digits" },
  );
