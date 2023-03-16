import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { serviceFormSchema, ServiceFormType } from '../../schema/formSchema';

import { ArrowRightCircle } from 'lucide-react';
import {
  API_BASE_URL,
  PIPELINES_PATH,
  SERVICES_PATH,
  WEBHOOKS_PATH,
} from '../../constants';
import {
  axiosGetAuthenticated,
  axiosPostAuthenticated,
} from '../../utils/authentication';
const PIPELINES_URL = `${API_BASE_URL}/${PIPELINES_PATH}`;
const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const WEBHOOKS_URL = `${API_BASE_URL}/${WEBHOOKS_PATH}`;

const submitButtonStyle =
  'bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded';

const errorMsgStyle = 'bg-red-100 px-4 py-2 text-red-700 rounded-md text-sm';

const inputBorderStyle =
  'border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';

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
      await axiosPostAuthenticated(WEBHOOKS_URL + '/create', webhooksData);
      await axiosPostAuthenticated(SERVICES_URL, data);
      navigate('/services');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {    
    const fetchPipeline = async () => {
      const response = await axiosGetAuthenticated(PIPELINES_URL);
      // NOTE THESE ASSUME ONE PIPELINE - TAKES FIRST FROM QUERY
      setPipelineId(response.data[0].id);
      setGithubPat(response.data[0].githubPat);
    };
    fetchPipeline();
  }, []);
  

  return (
      <div className="w-[900px]">
      <h1 className="text-3xl font-medium text-stone-700">Service Setup</h1>
      <p className="mt-4 max-w-prose text-stone-600">
        Your new Pipeline ID is:{' '}
        <span className="font-mono text-indigo-700">{pipelineId}</span>
      </p>
      <p className="mt-4 max-w-prose text-stone-600">
        Now let's get some details about your microservice, pipeline trigger
        methods, and testing commands.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex w-96 flex-col gap-2">
          <label htmlFor="name">Service Name </label>
          <input
            className={inputBorderStyle}
            type="text"
            id="name"
            placeholder="My Service"
            {...register('name')}
          />
          {errors.name && (
            <span className={errorMsgStyle}>{errors.name?.message}</span>
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
          <div className="mt-4 flex w-96 flex-col gap-2">
            <label htmlFor="githubRepoUrl">Github Repository URL</label>
            <input
              className={inputBorderStyle}
              type="text"
              id="githubRepoUrl"
              placeholder="https://github.com/user-org/repo-name"
              {...register('githubRepoUrl')}
            />
            {errors.githubRepoUrl && (
              <span className={errorMsgStyle}>
                {errors.githubRepoUrl?.message}
              </span>
            )}
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">Commands</h3>
          <div className="mt-4 flex w-96 flex-col gap-2">
            <label htmlFor="unitTestCommand">Unit Test Command: </label>
            <input
              className={inputBorderStyle}
              type="text"
              id="unitTestCommand"
              placeholder="npm run test"
              {...register('unitTestCommand')}
            />
            {errors.unitTestCommand && (
              <span className={errorMsgStyle}>
                {errors.unitTestCommand?.message}
              </span>
            )}
          </div>
          <div className="mt-6 flex w-96 flex-col gap-2">
            <label htmlFor="integrationTestCommand">
              Integration Test Command:{' '}
            </label>
            <input
              className={inputBorderStyle}
              type="text"
              id="integrationTestCommand"
              placeholder="npm run integration test"
              {...register('integrationTestCommand')}
            />
            {errors.integrationTestCommand && (
              <span className={errorMsgStyle}>
                {errors.integrationTestCommand?.message}
              </span>
            )}
          </div>
          <div className="mt-6 flex w-96 flex-col gap-2">
            <label htmlFor="codeQualityCommand">Code Quality Command: </label>
            <input
              className={inputBorderStyle}
              type="text"
              id="codeQualityCommand"
              placeholder="npm run lint"
              {...register('codeQualityCommand')}
            />
            {errors.codeQualityCommand && (
              <span className={errorMsgStyle}>
                {errors.codeQualityCommand?.message}
              </span>
            )}
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">Docker</h3>
          <div className="mt-4 flex w-96 flex-col gap-2">
            <label htmlFor="dockerfilePath">Dockerfile Path</label>
            <input
              className={inputBorderStyle}
              type="text"
              id="dockerfilePath"
              placeholder="./"
              {...register('dockerfilePath')}
            />
            {errors.dockerfilePath && (
              <span className={errorMsgStyle}>
                {errors.dockerfilePath?.message}
              </span>
            )}
          </div>
          <div className="mt-6 flex w-96 flex-col gap-2">
            <label htmlFor="dockerComposeFilePath">
              Docker Compose File Path
            </label>
            <input
              className={inputBorderStyle}
              type="text"
              id="dockerComposefilePath"
              placeholder="./"
              {...register('dockerComposeFilePath')}
            />
            {errors.dockerComposeFilePath && (
              <span className={errorMsgStyle}>
                {errors.dockerComposeFilePath?.message}
              </span>
            )}
          </div>

          <h3 className="mt-8 text-xl font-medium text-indigo-700">
            AWS Cluster
          </h3>
          <div className="mt-4 flex w-96 flex-col gap-2">
            <label htmlFor="awsEcsService">AWS ECS Service Name</label>
            <input
              className={inputBorderStyle}
              type="text"
              id="awsEcsService"
              placeholder="my-ecs-service-name"
              {...register('awsEcsService')}
            />
            {errors.awsEcsService && (
              <span className={errorMsgStyle}>
                {errors.awsEcsService?.message}
              </span>
            )}
          </div>
          <div className="mt-6 flex w-96 flex-col gap-2">
            <label htmlFor="awsEcrRepo">AWS ECR Repository Name</label>
            <input
              className={inputBorderStyle}
              type="text"
              id="awsEcrRepo"
              placeholder="my-ecr-repo-name"
              {...register('awsEcrRepo')}
            />
            {errors.awsEcrRepo && (
              <span className={errorMsgStyle}>
                {errors.awsEcrRepo?.message}
              </span>
            )}
          </div>
        </div>
        <button
          className={submitButtonStyle + ` mt-16 flex items-center gap-x-2`}
          type="submit"
        >
          <span>Continue To View Services</span> <ArrowRightCircle />
        </button>
      </form>
    </div>
  );
};

export default ServiceSetUp;
