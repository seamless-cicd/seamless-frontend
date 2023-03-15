import { z } from 'zod';

export const logSchema = z.object({
  id: z.string(),
  message: z.string(),
  stageId: z.string(),
  timestamp: z.string(),
  type: z.string(),
  score: z.number().optional(),
});

export type LogType = z.infer<typeof logSchema>;

export interface LogsProps {
  stageId: string;
}
