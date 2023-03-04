export interface ServiceType {
  awsEcrRepo: string;
  awsEcsService: string;
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
  triggerOnPrSync: boolean;
  updatedAt: string;
  useStaging: boolean;
}
