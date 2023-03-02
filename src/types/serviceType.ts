// TESTING TYPE
// export interface ServiceType {
//   name: string;
//   repo: string;
//   triggers: string[];
//   serviceID: string;
// }

export interface ServiceType {
  awsEcrRepository: string;
  awsFargateService: string;
  codeQualityCommand: string;
  createdAt: string;
  dockerfilePath: string;
  githubRepository: string;
  id: string;
  name: string;
  pipelineId: string;
  testCommand: string;
  triggerOnCommit: boolean;
  triggerOnPrOpen: boolean;
  triggerOnPrSync: string;
  updatedAt: string;
  useStaging: boolean;
}
