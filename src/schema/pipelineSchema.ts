import { z } from "zod";
import { serviceSchema } from "./serviceSchema";

export const pipelineSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().optional(),
  githubPat: z.string(),
  awsAccessKey: z.string(),
  awsSecretAccessKey: z.string(),
  services: z.array(serviceSchema),
});

export type PipelineType = z.infer<typeof pipelineSchema>;