import z from "zod";

export const EditPostSchema = z.object({
    title: z.string().min(1, { message: "A cím nem lehet üres" }),
    content: z.string().min(1, { message: "A tartalom nem lehet üres" }),
});
export type EditPostData = z.infer<typeof EditPostSchema>;