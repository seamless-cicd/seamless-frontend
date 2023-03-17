import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PIPELINES_PATH, SERVICES_PATH, WEBHOOKS_PATH } from '../../constants';
import { serviceFormSchema, ServiceFormType } from '../../schema/formSchema';
import {
  axiosGetAuthenticated,
  axiosPostAuthenticated,
} from '../../utils/authentication';
import { Button } from '../ui/Button';
import FormErrorMessage from './ErrorMessage';

const ServiceSetUp = () => {
  const [pipelineId, setPipelineId] = useState('');
  const [githubPat, setGithubPat] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormType>({
    resolver: zodResolver(serviceFormSchema),
  });

  const onSubmit: SubmitHandler<ServiceFormType> = async (data) => {
    const triggerOnMain = data.triggerOnMain;
    const triggerOnPrSync = data.triggerOnPrSync;
    const triggerOnPrOpen = data.triggerOnPrOpen;
    const githubRepoUrl = data.githubRepoUrl;
    const webhooksData = {
      triggerOnMain,
      triggerOnPrOpen,
      triggerOnPrSync,
      githubPat,
      githubRepoUrl,
    };

    data.pipelineId = pipelineId;

    try {
      await axiosPostAuthenticated(WEBHOOKS_PATH + '/create', webhooksData);
      await axiosPostAuthenticated(SERVICES_PATH, data);
      navigate('/services');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchPipeline = async () => {
      const response = await axiosGetAuthenticated(PIPELINES_PATH);
      // Assumes only 1 pipeline exists, and selects the first Service found
      setPipelineId(response.data[0].id);
      setGithubPat(response.data[0].githubPat);
    };
    fetchPipeline();
  }, []);

  return (
    <div className="w-[900px]">
      <h1 className="text-3xl font-medium text-stone-700">Service Setup</h1>
      <p className="mt-4 max-w-prose text-stone-600">
        Pipeline ID:{' '}
        <span className="font-mono text-indigo-700">{pipelineId}</span>
      </p>
      <p className="mt-4 max-w-prose text-stone-600">
        Please provide details about your service, pipeline trigger options, and
        testing commands.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex w-[450px] flex-col gap-2">
          <label htmlFor="name">Service Name </label>
          <input
            type="text"
            id="name"
            placeholder="My Service"
            {...register('name')}
          />
          {errors.name && (
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          )}
        </div>

        <div>
          <h3 className="mt-8 text-xl font-medium text-indigo-700">Triggers</h3>
          <p className="mt-2 max-w-prose text-sm text-stone-600">
            For pushes and merges into Main, the Full Pipeline will execute.
            When opening or syncing to Pull Requests, only the Prepare, Code
            Quality, and Unit Test stages will execute.
          </p>
          <div className="mt-4 flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="checkbox"
              id="triggerOnMain"
              {...register('triggerOnMain', { required: true })}
              defaultChecked={false}
            />
            <label htmlFor="triggerOnMain">On Main</label>
          </div>
          <div className="mt-2 flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="checkbox"
              id="triggerOnPrOpen"
              {...register('triggerOnPrOpen')}
            />
            <label htmlFor="triggerOnPrOpen">On Pull Request Open</label>
          </div>
          <div className="mt-2 flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="checkbox"
              id="triggerOnPrSync"
              {...register('triggerOnPrSync')}
            />
            <label htmlFor="triggerOnPrSync">On Pull Request Sync</label>
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">
            Staging and Auto-Deploy
          </h3>
          <div className="mt-4 flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="checkbox"
              id="useStaging"
              {...register('useStaging', { required: true })}
              defaultChecked={false}
            />
            <label htmlFor="useStaging">
              Deploy to a Staging Environment before Production
            </label>
          </div>
          <div className="mt-2 flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="checkbox"
              id="autoDeploy"
              {...register('autoDeploy', { required: true })}
              defaultChecked={false}
            />
            <label htmlFor="autoDeploy">
              Automatically deploy from Build to Production
            </label>
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">GitHub</h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="githubRepoUrl">Github Repository URL</label>
            <input
              type="text"
              id="githubRepoUrl"
              placeholder="https://github.com/user-org/repo-name"
              {...register('githubRepoUrl')}
            />
            {errors.githubRepoUrl && (
              <FormErrorMessage>
                {errors.githubRepoUrl?.message}
              </FormErrorMessage>
            )}
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">Commands</h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="unitTestCommand">Unit Test Command: </label>
            <input
              type="text"
              id="unitTestCommand"
              placeholder="npm run test"
              {...register('unitTestCommand')}
            />
            {errors.unitTestCommand && (
              <FormErrorMessage>
                {errors.unitTestCommand?.message}
              </FormErrorMessage>
            )}
          </div>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="integrationTestCommand">
              Integration Test Command:{' '}
            </label>
            <input
              type="text"
              id="integrationTestCommand"
              placeholder="npm run integration test"
              {...register('integrationTestCommand')}
            />
            {errors.integrationTestCommand && (
              <FormErrorMessage>
                {errors.integrationTestCommand?.message}
              </FormErrorMessage>
            )}
          </div>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="codeQualityCommand">Code Quality Command: </label>
            <input
              type="text"
              id="codeQualityCommand"
              placeholder="npm run lint"
              {...register('codeQualityCommand')}
            />
            {errors.codeQualityCommand && (
              <FormErrorMessage>
                {errors.codeQualityCommand?.message}
              </FormErrorMessage>
            )}
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">Docker</h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="dockerfilePath">Dockerfile Path</label>
            <input
              type="text"
              id="dockerfilePath"
              placeholder="./"
              {...register('dockerfilePath')}
            />
            {errors.dockerfilePath && (
              <FormErrorMessage>
                {errors.dockerfilePath?.message}
              </FormErrorMessage>
            )}
          </div>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="dockerComposeFilePath">
              Docker Compose File Path
            </label>
            <input
              type="text"
              id="dockerComposefilePath"
              placeholder="./"
              {...register('dockerComposeFilePath')}
            />
            {errors.dockerComposeFilePath && (
              <FormErrorMessage>
                {errors.dockerComposeFilePath?.message}
              </FormErrorMessage>
            )}
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">
            AWS Cluster
          </h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="awsEcsService">AWS ECS Service Name</label>
            <input
              type="text"
              id="awsEcsService"
              placeholder="my-ecs-service-name"
              {...register('awsEcsService')}
            />
            {errors.awsEcsService && (
              <FormErrorMessage>
                {errors.awsEcsService?.message}
              </FormErrorMessage>
            )}
          </div>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="awsEcrRepo">AWS ECR Repository Name</label>
            <input
              type="text"
              id="awsEcrRepo"
              placeholder="my-ecr-repo-name"
              {...register('awsEcrRepo')}
            />
            {errors.awsEcrRepo && (
              <FormErrorMessage>{errors.awsEcrRepo?.message}</FormErrorMessage>
            )}
          </div>
        </div>
        <div className="mt-16">
          <Button type="submit">
            Continue To View Services
            <ArrowRightCircle className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceSetUp;
