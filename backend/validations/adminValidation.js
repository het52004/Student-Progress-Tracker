import { z } from "zod";

export const adminSignupValidation = z.object({
  adminName: z
    .string()
    .min(3, { message: "Username must be greater than 2 characters" })
    .max(14, { message: "Username must be less than 15 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username can only contain letters and numbers.",
    }),
  adminPassword: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .max(15, { message: "Password must be at most 15 characters long." }),
  adminEmail: z
    .string()
    .email({ message: "Invalid email format." })
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com.",
    }),
});

export const adminLoginValidation = z.object({
  adminEmail: z
    .string()
    .email({ message: "Invalid email format." })
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com.",
    }),
  adminPassword: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .max(15, { message: "Password must be at most 15 characters long." }),
});
