import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PIPELINES_PATH, SERVICES_PATH, WEBHOOKS_PATH } from '../../constants';
import {
  serviceEditFormSchema,
  ServiceEditFormType,
} from '../../schema/formSchema';
import {
  axiosGetAuthenticated,
  axiosPatchAuthenticated,
} from '../../utils/authentication';
import { Button } from '../ui/Button';
import FormErrorMessage from './ErrorMessage';

const editableFields: Array<keyof ServiceEditFormType> = [
  'name',
  'triggerOnMain',
  'triggerOnPrOpen',
  'triggerOnPrSync',
  'useStaging',
  'autoDeploy',
  'githubRepoUrl',
  'unitTestCommand',
  'integrationTestCommand',
  'codeQualityCommand',
  'dockerfilePath',
  'dockerComposeFilePath',
];

const ServiceEdit = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [githubPat, setGithubPat] = useState('');
  const [pipelineId, setPipelineIdId] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceEditFormType>({
    resolver: zodResolver(serviceEditFormSchema),
  });

  const onSubmit: SubmitHandler<ServiceEditFormType> = async (editedData) => {
    // new, to set data to be sent to webhook at github
    const triggerOnMain = editedData.triggerOnMain;
    const triggerOnPrSync = editedData.triggerOnPrSync;
    const triggerOnPrOpen = editedData.triggerOnPrOpen;
    const githubRepoUrl = editedData.githubRepoUrl;
    const webhooksData = {
      triggerOnMain,
      triggerOnPrOpen,
      triggerOnPrSync,
      githubPat,
      githubRepoUrl,
    };

    try {
      await axiosPatchAuthenticated(WEBHOOKS_PATH + '/patch', webhooksData);
      await axiosPatchAuthenticated(
        `${SERVICES_PATH}/${serviceId}`,
        editedData,
      );
      alert('Service is being updated.');
      navigate('/services');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
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

    // need pat to edit triggers
    const fetchPipeline = async () => {
      const response = await axiosGetAuthenticated(PIPELINES_PATH);
      // Assumes only 1 pipeline exists, and selects the first Service found
      setPipelineIdId(response.data[0].id);
      setGithubPat(response.data[0].githubPat);
    };
    fetchPipeline();
  }, []);

  return (
    <div className="w-[900px]">
      <h1 className="text-3xl font-medium text-stone-700">Edit Service</h1>
      <p className="mt-4 max-w-prose text-stone-600">
        Pipeline ID:{' '}
        <span className="font-mono text-indigo-700">{pipelineId}</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex w-96 flex-col gap-2">
          <label htmlFor="name">Service Name: </label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && (
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          )}

          <div>
            <h3 className="mt-8 text-xl font-medium text-indigo-700">
              Triggers
            </h3>
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

            <h3 className="mt-8 text-xl font-medium text-indigo-700">
              Commands
            </h3>
            <div className="mt-4 flex w-96 flex-col gap-2">
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
            <div className="mt-6 flex w-96 flex-col gap-2">
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
            <div className="mt-6 flex w-96 flex-col gap-2">
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
            <div className="mt-4 flex w-96 flex-col gap-2">
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
            <div className="mt-6 flex w-96 flex-col gap-2">
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
          </div>
        </div>
        <div className="mt-16">
          <Button type="submit">Update Service</Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceEdit;
