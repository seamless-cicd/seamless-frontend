/* TYPE FOR TESTING
export interface RunType {
  runID: string;
  start: string;
  end: string;
  duration: string;
  triggerEvent: string;
  commitID: string;
  commitHash: string;
  commitMessage: string;
  status: string;
}
*/

export interface RunType {
  commitHash: string;
  commitMessage: string;
  committer: string;
  createdAt: string;
  duration: string;
  endedAt: string;
  id: string;
  serviceId: string;
  startedAt: string;
  status: string;
  triggerType: string;
}