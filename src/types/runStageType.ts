export interface RunStageType {
  id: string;
  createdAt: string;
  startedAt: string;
  endedAt: string;
  duration: string;
  commitHash: string;
  commitMessage: string;
  committer: string;
  status: string;
  triggerType: string;
  serviceId: string;
}