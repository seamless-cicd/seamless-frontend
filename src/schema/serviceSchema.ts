import { z } from 'zod';
import { PipelineType } from './pipelineSchema';
import { runSchema } from './runSchema';

export const serviceSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().nullable(),
  lastRunAt: z.coerce.date().nullable(),
  triggerOnMain: z.boolean(),
  triggerOnPrOpen: z.boolean(),
  triggerOnPrSync: z.boolean(),
  useStaging: z.boolean(),
  autoDeploy: z.boolean(),
  githubRepoUrl: z.string(),
  unitTestCommand: z.string().nullable(),
  codeQualityCommand: z.string().nullable(),
  dockerfilePath: z.string(),
  githubIntegrationTestRepoUrl: z.string().nullable(),
  dockerComposeFilePath: z.string().nullable(),
  dockerComposeServiceName: z.string().nullable(),
  dockerComposeIntegrationTestServiceName: z.string().nullable(),
  awsEcsServiceStaging: z.string().nullable(),
  awsEcsService: z.string(),
  pipelineId: z.string().uuid().nullable(),
  runs: z.array(runSchema).optional(),
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
