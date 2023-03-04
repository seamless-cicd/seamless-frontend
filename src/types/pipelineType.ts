import { ServiceType } from "./serviceType";

export interface PipelineType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  githubPat: string;
  awsAccessKey: string;
  awsSecretAccessKey: string;
  lastRunAt: string;
  services: ServiceType[];
  awsRegion: string;
  awsRds: string;
  awsAvailabilityZone: string;
  awsStepFunction: string;
  awsEcsCluster: string;
}