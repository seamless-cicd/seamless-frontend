import { z } from 'zod';

// Pipeline Setup Form
export const pipelineFormSchema = z.object({
  name: z.string().min(1, 'Pipeline name is required').max(40),
  awsEcsCluster: z.string().min(1, 'ECS Cluster name is required').max(40),
  awsEcsClusterStaging: z.string().optional(),
});

export type PipelineFormType = z.infer<typeof pipelineFormSchema>;

// Service Edit Form
export const serviceFormSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(40),
  triggerOnMain: z.boolean().default(true),
  triggerOnPrOpen: z.boolean().default(false),
  triggerOnPrSync: z.boolean().default(false),
  useStaging: z.boolean().default(false),
  autoDeploy: z.boolean().default(false),
  githubRepoUrl: z.string().min(1, 'GitHub repo is required'),
  unitTestCommand: z.string().min(1, 'Unit test command is required'),
  codeQualityCommand: z.string().min(1, 'Code quality command is required'),
  dockerfilePath: z.string().min(1, 'Dockerfile path is required'),
  githubIntegrationTestRepoUrl: z.string().optional(),
  dockerComposeFilePath: z.string().optional(),
  dockerComposeServiceName: z.string().optional(),
  dockerComposeIntegrationTestServiceName: z.string().optional(),
  awsEcsService: z.string().min(1, 'ECS Service is required'),
  awsEcsServiceStaging: z.string().optional(),
  pipelineId: z.string().uuid().optional(),
});

export type ServiceFormType = z.infer<typeof serviceFormSchema>;
