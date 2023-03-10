import { z } from 'zod';
import { stageSchema } from './stageSchema';

export const runSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  startedAt: z.date(),
  endedAt: z.date().optional(),
  duration: z.number().optional(),
  commitHash: z.string().optional(),
  commitMessage: z.string().optional(),
  committer: z.string().optional(),
  status: z.string(),
  triggerType: z.string(),
  serviceId: z.string().optional(),
  stages: z.array(stageSchema),
});

export type RunType = z.infer<typeof runSchema>;

export interface RunsListProps {
  runs: RunType[];
  setRuns: React.Dispatch<React.SetStateAction<RunType[]>>;
}

export interface RunCardProps {
  run: RunType;
  setRuns: React.Dispatch<React.SetStateAction<RunType[]>>;
}

export interface RunHeaderProps {
  run: RunType;
}
