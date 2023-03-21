import { z } from 'zod';
import { PipelineType } from './pipelineSchema';
import { runSchema } from './runSchema';

export const serviceSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string().optional(),
  lastRunAt: z.string().nullish(),
  awsEcsService: z.string(),
  awsEcsServiceStaging: z.string().optional(),
  triggerOnMain: z.boolean().optional(),
  triggerOnPrOpen: z.boolean(),
  triggerOnPrSync: z.boolean(),
  useStaging: z.boolean(),
  autoDeploy: z.boolean(),
  githubRepoUrl: z.string(),
  unitTestCommand: z.string().optional(),
  integrationTestCommand: z.string().nullish(),
  codeQualityCommand: z.string().optional(),
  dockerfilePath: z.string(),
  dockerComposeFilePath: z.string().nullish(),
  pipelineId: z.string().optional(),
  runs: z.array(runSchema),
});

export type ServiceType = z.infer<typeof serviceSchema>;

export interface ServicesListProps {
  services: ServiceType[];
  setServices: React.Dispatch<React.SetStateAction<ServiceType[]>>;
}

export interface ServiceHeaderProps {
  service: ServiceType;
}

export interface ServiceCardProps {
  service: ServiceType;
  setServices: React.Dispatch<React.SetStateAction<ServiceType[]>>;
}

export interface ServicesHeaderProps {
  pipeline: PipelineType;
}

export interface ServiceRollbackProps {
  service: ServiceType;
}
