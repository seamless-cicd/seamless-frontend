import { ImageDetail } from '@aws-sdk/client-ecr';
import { z } from 'zod';
import { stageSchema } from './stageSchema';

export const runSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  startedAt: z.coerce.date().nullable(),
  endedAt: z.coerce.date().nullable(),
  duration: z.number().nullable(),
  commitHash: z.string().nullable(),
  commitMessage: z.string().nullable(),
  committer: z.string().nullable(),
  status: z.string(),
  triggerType: z.string(),
  serviceId: z.string().uuid().nullable(),
  stages: z.array(stageSchema).optional(),
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
    imagePushedAt: z.coerce.date(),
    imageDigest: z.string(),
    imageTags: z.array(z.string()),
  }),
});

export type Rollback = {
  runs: RunType[];
  image: ImageDetail;
};
