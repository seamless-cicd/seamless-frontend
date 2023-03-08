import { z } from "zod";

// SERVICE SET UP FORM
export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required").max(40),
  triggerOnMain: z.boolean().default(false),
  triggerOnPrOpen: z.boolean().default(false),
  triggerOnPrSync: z.boolean().default(false),
  useStaging: z.boolean().default(false),
  autoDeploy: z.boolean().default(false),
  githubRepoUrl: z.string().min(1, "GitHub Repo is required"),
  unitTestCommand: z.string().min(1, "Unit test command is required"),
  integrationTestCommand: z.string().min(1, "Integration test command is required"),
  codeQualityCommand: z.string().min(1, "Code quality command is required"),
  dockerfilePath: z.string().min(1, "Dockerfile path is required"),
  dockerComposeFilePath: z.string().min(1, "Docker compose file path is required"),
  awsEcrRepo: z.string().min(1, "AWS ECR repo is required"),
  awsEcsService: z.string().min(1, "AWS ECS Service is required"),
  pipelineId: z.string().optional(),
})

export type ServiceType = z.infer<typeof serviceSchema>;

// SERVICE EDIT FORM
export const serviceEditSchema = z.object({
  name: z.string().min(1, "Service name is required").max(40),
  triggerOnMain: z.boolean().default(false),
  triggerOnPrOpen: z.boolean().default(false),
  triggerOnPrSync: z.boolean().default(false),
  useStaging: z.boolean().default(false),
  autoDeploy: z.boolean().default(false),
  githubRepoUrl: z.string().min(1, "GitHub Repo is required"),
  unitTestCommand: z.string().min(1, "Unit test command is required"),
  integrationTestCommand: z.string().min(1, "Integration test command is required"),
  codeQualityCommand: z.string().min(1, "Code quality command is required"),
  dockerfilePath: z.string().min(1, "Dockerfile path is required"),
  dockerComposeFilePath: z.string().min(1, "Docker compose file path is required"),
});

export type ServiceEditType = z.infer<typeof serviceEditSchema>;

// PIPELINE SET UP FORM
export const pipelineSchema = z.object({
  name: z.string().min(1, "Pipeline name is required").max(40),
  // after testing change min to 40
  githubPat: z.string().min(1, "40 character GitHub PAT is required").max(40),
  // after testing change min to 40
  awsAccessKey: z.string().min(1, "20 character AWS Access Key is required").max(20),
  // after testing change min to 40
  awsSecretAccessKey: z.string().min(1, "40 character AWS Secret Access Key is required").max(40),
});

export type PipelineType = z.infer<typeof pipelineSchema>;