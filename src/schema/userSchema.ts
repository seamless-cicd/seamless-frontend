import { z } from 'zod';

export const userSchema = z.object({
  login: z.string(),
  avatar_url: z.string().url(),
});

export type UserType = z.infer<typeof userSchema>;
