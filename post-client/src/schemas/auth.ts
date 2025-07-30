import z from "zod";

export const signUpSchema = z.object({
    email: z.string().email(" Email is required"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).trim(),
    name: z.string().min(2, { message: "name must be at least 2 charaters long" })
})
export type SignUpData = z.infer<typeof signUpSchema>;

