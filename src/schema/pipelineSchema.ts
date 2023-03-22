import { z } from 'zod';
import { serviceSchema } from './serviceSchema';

export const pipelineSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().nullable(),
  awsEcsCluster: z.string(),
  awsEcsClusterStaging: z.string().nullable(),
  githubClientId: z.string().nullable(),
  githubClientSecret: z.string().nullable(),
  githubOauthToken: z.string().nullable(),
  services: z.array(serviceSchema).optional(),
});

export type PipelineType = z.infer<typeof pipelineSchema>;
