import { ImageDetail } from '@aws-sdk/client-ecr';
import { z } from 'zod';
import { stageSchema } from './stageSchema';

export const runSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  startedAt: z.string().nullish(),
  endedAt: z.string().nullish(),
  duration: z.number().nullish(),
  commitHash: z.string().optional(),
  commitMessage: z.string().optional(),
  committer: z.string().optional(),
  status: z.string(),
  triggerType: z.string(),
  serviceId: z.string().optional(),
  stages: z.array(stageSchema).nullish(),
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

export const RollbackSchema = z.object({
  runs: z.array(runSchema),
  image: z.object({
    repositoryName: z.string(),
    imagePushedAt: z.date(),
    imageDigest: z.string(),
    imageTags: z.array(z.string()),
  }),
});

export type Rollback = {
  runs: RunType[];
  image: ImageDetail;
};
