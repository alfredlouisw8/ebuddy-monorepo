import { z } from "zod";

export const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string().min(1),
	createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

//export * from "@repo/shared/models/user";
//cant get it to work with firebase functions
