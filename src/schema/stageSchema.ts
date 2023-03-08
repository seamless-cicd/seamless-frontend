import { z } from "zod";

export const stageSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  type: z.string(),
  startedAt: z.date().optional(),
  endedAt: z.date().optional(),
  durationAt: z.number().optional(),
  status: z.string(),
  runId: z.string().optional(),
});

export type StageType = z.infer<typeof stageSchema>;

export interface StagesListProps {
  stages: StageType[];
}

export interface StageCardProps {
  stage: StageType;
}