import { z } from 'zod';
import { serviceSchema } from './serviceSchema';

export const pipelineSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().optional(),
  githubClientId: z.string().optional(),
  githubClientSecret: z.string().optional(),
  githubOauthToken: z.string().optional(),
  services: z.array(serviceSchema),
});

export type PipelineType = z.infer<typeof pipelineSchema>;
