import { z } from "zod";

export const logSchema = z.object({
  id: z.string(),
  log: z.string(),
  stageId: z.string(),
  timestamp: z.string(),
});

export type LogType = z.infer<typeof logSchema>;

export interface LogsProps {
  stageId: string;
}