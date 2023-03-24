import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PIPELINES_PATH, SERVICES_PATH, WEBHOOKS_PATH } from '../../constants';
import { serviceFormSchema, ServiceFormType } from '../../schema/formSchema';

import {
  axiosGetAuthenticated,
  axiosPatchAuthenticated,
  axiosPostAuthenticated,
} from '../../utils/authentication';
import { Button } from '../ui/Button';
import FormErrorMessage from './ErrorMessage';

const editableFields: Array<keyof ServiceFormType> = [
  'name',
  'triggerOnMain',
  'triggerOnPrOpen',
  'triggerOnPrSync',
  'useStaging',
  'autoDeploy',
  'githubRepoUrl',
  'unitTestCommand',
  'codeQualityCommand',
  'dockerfilePath',
  'githubIntegrationTestRepoUrl',
  'dockerComposeFilePath',
  'dockerComposeServiceName',
  'dockerComposeIntegrationTestServiceName',
  'awsEcsService',
  'awsEcsServiceStaging',
];

const ServiceSetup = () => {
  const { serviceId } = useParams(); // Used to check if setting up new Service or editing Service
  const [pipelineId, setPipelineId] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormType>({
    resolver: zodResolver(serviceFormSchema),
  });

  const onSubmit: SubmitHandler<ServiceFormType> = async (data) => {
    const { triggerOnMain, triggerOnPrSync, triggerOnPrOpen, githubRepoUrl } =
      data;
    const webhooksData = {
      triggerOnMain,
      triggerOnPrOpen,
      triggerOnPrSync,
      githubRepoUrl,
    };

    data.pipelineId = pipelineId;

    try {
      if (serviceId) {
        await axiosPatchAuthenticated(WEBHOOKS_PATH + '/patch', webhooksData);
        await axiosPatchAuthenticated(`${SERVICES_PATH}/${serviceId}`, data);
      } else {
        await axiosPostAuthenticated(WEBHOOKS_PATH + '/create', webhooksData);
        await axiosPostAuthenticated(SERVICES_PATH, data);
      }
      navigate('/services');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (serviceId) {
      const fetchData = async () => {
        try {
          const response = await axiosGetAuthenticated(
            `${SERVICES_PATH}/${serviceId}`,
          );

          editableFields.forEach((field) =>
            setValue(field, response.data[field]),
          );
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }

    const fetchPipeline = async () => {
      const response = await axiosGetAuthenticated(`${PIPELINES_PATH}/first`);
      setPipelineId(response.data.id);
    };
    fetchPipeline();
  }, []);

  return (
    <div className="w-[900px]">
      <h1 className="text-3xl font-medium text-stone-700">
        {serviceId ? 'Edit Service' : 'Service Setup'}
      </h1>
      <p className="mt-4 max-w-prose text-stone-600">
        Pipeline ID:{' '}
        <span className="font-mono text-indigo-700">{pipelineId}</span>
      </p>
      <p className="mt-4 max-w-prose text-stone-600">
        Please provide details about your service, pipeline trigger options, and
        test configuration.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex w-[450px] flex-col gap-2">
          <label htmlFor="name">Service Name</label>
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
          <h3 className="mt-10 text-xl font-medium text-indigo-700">
            Triggers
          </h3>
          <p className="mt-2 max-w-prose text-sm text-stone-600">
            When pushing to Main, the Full Pipeline will execute. When opening
            or syncing to Pull Requests, only the Prepare, Code Quality, and
            Unit Test stages will execute.
          </p>
          <div className="mt-4 flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="checkbox"
              id="triggerOnMain"
              {...register('triggerOnMain', { required: true })}
              defaultChecked={true}
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

          <h3 className="mt-10 text-xl font-medium text-indigo-700">
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

          <h3 className="mt-10 text-xl font-medium text-indigo-700">GitHub</h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="githubRepoUrl">Github Repository URL</label>
            <input
              type="text"
              id="githubRepoUrl"
              placeholder="https://github.com/organization/repo"
              {...register('githubRepoUrl')}
            />
            {errors.githubRepoUrl && (
              <FormErrorMessage>
                {errors.githubRepoUrl?.message}
              </FormErrorMessage>
            )}
          </div>

          <h3 className="mt-10 text-xl font-medium text-indigo-700">
            Commands
          </h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="unitTestCommand">Unit Test Command</label>
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
            <label htmlFor="codeQualityCommand">Code Quality Command</label>
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

          <h3 className="mt-10 text-xl font-medium text-indigo-700">Docker</h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="dockerfilePath">
              Path to <span className="font-mono">Dockerfile</span> (relative to
              repo root)
            </label>
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

          <h3 className="mt-10 text-xl font-medium text-indigo-700">
            Integration Test with Docker Compose
          </h3>
          <p className="mt-1 max-w-prose text-sm text-stone-600">
            Assumes you have created a separate repository for the test
            container
          </p>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="githubIntegrationTestRepoUrl">
              Github Repository URL for Integration Tester
            </label>
            <input
              type="text"
              id="githubIntegrationTestRepoUrl"
              placeholder="https://github.com/organization/app"
              {...register('githubIntegrationTestRepoUrl')}
            />
            {errors.githubIntegrationTestRepoUrl && (
              <FormErrorMessage>
                {errors.githubIntegrationTestRepoUrl?.message}
              </FormErrorMessage>
            )}
          </div>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="dockerComposeFilePath">
              Path to <span className="font-mono">.docker-compose.yml</span>{' '}
              (relative to repo root)
            </label>
            <input
              type="text"
              id="dockerComposefilePath"
              placeholder="."
              {...register('dockerComposeFilePath')}
            />
            {errors.dockerComposeFilePath && (
              <FormErrorMessage>
                {errors.dockerComposeFilePath?.message}
              </FormErrorMessage>
            )}
          </div>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="dockerComposeServiceName">
              Service name of application container
            </label>
            <input
              type="text"
              id="dockerComposeServiceName"
              placeholder="app"
              {...register('dockerComposeServiceName')}
            />
            {errors.dockerComposeServiceName && (
              <FormErrorMessage>
                {errors.dockerComposeServiceName?.message}
              </FormErrorMessage>
            )}
          </div>
          <div className="mt-6 flex w-[450px] flex-col gap-2">
            <label htmlFor="dockerComposeIntegrationTestServiceName">
              Service name of integration test container
            </label>
            <input
              type="text"
              id="dockerComposeIntegrationTestServiceName"
              placeholder="integration-test"
              {...register('dockerComposeIntegrationTestServiceName')}
            />
            {errors.dockerComposeIntegrationTestServiceName && (
              <FormErrorMessage>
                {errors.dockerComposeIntegrationTestServiceName?.message}
              </FormErrorMessage>
            )}
          </div>

          <h3 className="mt-10 text-xl font-medium text-indigo-700">
            AWS Elastic Container Service
          </h3>
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="awsEcsService">Production Service</label>
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
          <div className="mt-4 flex w-[450px] flex-col gap-2">
            <label htmlFor="awsEcsService">Staging Service</label>
            <input
              type="text"
              id="awsEcsServiceStaging"
              placeholder="my-ecs-service-staging-name"
              {...register('awsEcsServiceStaging')}
            />
            {errors.awsEcsServiceStaging && (
              <FormErrorMessage>
                {errors.awsEcsServiceStaging?.message}
              </FormErrorMessage>
            )}
          </div>
        </div>
        <div className="mt-16">
          {serviceId ? (
            <Button type="submit">Update Service</Button>
          ) : (
            <Button type="submit">Continue To View Services</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ServiceSetup;
