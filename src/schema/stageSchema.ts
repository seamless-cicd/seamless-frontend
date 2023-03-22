import { z } from 'zod';

export const stageSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  type: z.string(),
  startedAt: z.coerce.date().nullable(),
  endedAt: z.coerce.date().nullable(),
  duration: z.number().nullable(),
  status: z.string(),
  runId: z.string().uuid().optional(),
});

export type StageType = z.infer<typeof stageSchema>;

export interface StagesListProps {
  stages: StageType[];
}

export interface StageCardProps {
  stage: StageType;
  viewType: string;
  setViewType: React.Dispatch<React.SetStateAction<string>>;
}

export const StatusToName: Record<string, string> = {
  SUCCESS: 'Success',
  FAILURE: 'Failure',
  IN_PROGRESS: 'In Progress',
  IDLE: 'Idle',
  AWAITING_APPROVAL: 'Awaiting Approval',
};

export const StageTypeToName: Record<string, string> = {
  PREPARE: 'Prepare',
  CODE_QUALITY: 'Code Quality',
  UNIT_TEST: 'Unit Test',
  BUILD: 'Build',
  INTEGRATION_TEST: 'Integration Test',
  DEPLOY_STAGING: 'Deploy to Staging',
  DEPLOY_PROD: 'Deploy to Prod',
};
