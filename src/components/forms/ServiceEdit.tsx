import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  serviceEditFormSchema,
  ServiceEditFormType,
} from '../../schema/formSchema';


import {
  axiosGetAuthenticated,
  axiosPatchAuthenticated,
} from '../../utils/authentication';

import { API_BASE_URL, SERVICES_PATH, PIPELINES_PATH, WEBHOOKS_PATH } from '../../constants';

const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const PIPELINES_URL = `${API_BASE_URL}/${PIPELINES_PATH}`;
const WEBHOOKS_URL = `${API_BASE_URL}/${WEBHOOKS_PATH}`;

const submitButtonStyle =
  'bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded';

const errorMsgStyle = 'bg-red-100 px-4 py-2 text-red-700 rounded-md text-sm';

const inputBorderStyle =
  'border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';

const editableFields = [
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
      triggerOnMain, triggerOnPrOpen, triggerOnPrSync, githubPat, githubRepoUrl
    }
    
    try {
      await axiosPatchAuthenticated(WEBHOOKS_URL + '/patch', webhooksData);
      await axiosPatchAuthenticated(`${SERVICES_URL}/${serviceId}`, editedData);4
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
          `${SERVICES_URL}/${serviceId}`
        );

        editableFields.forEach((field) =>
          setValue(field, response.data[field])
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    // need pat to edit triggers
    const fetchPipeline = async () => {
      const response = await axios.get(PIPELINES_URL);
      // NOTE THESE ASSUME ONE PIPELINE - TAKES FIRST FROM QUERY
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
        <span className="font-mono text-indigo-700">
           {pipelineId}
        </span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex w-96 flex-col gap-2">
          <label htmlFor="name">Service Name: </label>
          <input
            className={inputBorderStyle}
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <span className={errorMsgStyle}>{errors.name?.message}</span>
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

            <h3 className="mt-8 text-xl font-medium text-indigo-700">
              Commands
            </h3>
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
          </div>
        </div>
        <button className={submitButtonStyle + ' mt-16'} type="submit">
          Update Service
        </button>
      </form>
    </div>
  );
};

export default ServiceEdit;
