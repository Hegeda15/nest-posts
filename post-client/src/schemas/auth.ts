import z from "zod";

export const SignInSchema = z.object({
  email: z.email({ message: "Érvénytelen email" }),
  password: z.string().min(6, { message: "A jelszónak legalább 6 karakternek kell lennie" }),
});

export const SignUpSchema = SignInSchema.extend({
  name: z.string().min(2, { message: "A név legalább 2 karakter legyen" }),
});

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;
