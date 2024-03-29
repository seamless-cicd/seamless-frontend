import { z } from 'zod';

export const StatusSchema = z.enum([
  'SUCCESS',
  'FAILURE',
  'IN_PROGRESS',
  'IDLE',
  'AWAITING_APPROVAL',
]);

export type Status = z.infer<typeof StatusSchema>;

const StageSchema = z.object({
  id: z.string(),
  status: StatusSchema,
});

const RunStatusSchema = z.object({
  run: StageSchema,
  stages: z.object({
    prepare: StageSchema,
    codeQuality: StageSchema,
    unitTest: StageSchema,
    build: StageSchema,
    integrationTest: StageSchema.optional(),
    deployStaging: StageSchema.optional(),
    deployProduction: StageSchema,
  }),
});

export default RunStatusSchema;
