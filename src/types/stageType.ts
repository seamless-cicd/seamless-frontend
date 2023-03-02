// export interface StageType {
//   name: string;
//   duration: string;
//   status: string;
//   containerID: string;
//   attempts: string;
// }

export interface StageType {
  id: string;
  createdAt: string;
  type: string;
  startedAt: string;
  endedAt: string;
  duration: string;
  status: string;
  containerId: string;
  runId: string;
}
