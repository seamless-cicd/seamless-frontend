import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { pipelineFormSchema, PipelineFormType } from '../../schema/formSchema';

import { API_BASE_URL, PIPELINES_PATH } from '../../constants';
const PIPELINES_URL = `${API_BASE_URL}/${PIPELINES_PATH}`;

const submitButtonStyle =
  'mt-10 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded';

const errorMsgStyle = 'bg-red-100 px-4 py-2 text-red-700';

const inputBorderStyle =
  'ml-6 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';

const PipelineSetUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PipelineFormType>({
    resolver: zodResolver(pipelineFormSchema),
  });

  const onSubmit: SubmitHandler<PipelineFormType> = async (data) => {
    try {
      console.log(data);
      await axios.post(PIPELINES_URL, data);
      navigate('/service-set-up');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-8 ml-8">
      <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">
        Pipeline Set Up
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 w-64">
          <label htmlFor="name">Pipeline Name: </label>
          <input
            className={inputBorderStyle}
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <span className={errorMsgStyle}>{errors.name?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-64">
          <label htmlFor="githubPat">GitHub PAT: </label>
          <input
            className={inputBorderStyle}
            type="text"
            id="githubPat"
            {...register('githubPat')}
          />
          {errors.githubPat && (
            <span className={errorMsgStyle}>{errors.githubPat?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-64">
          <label htmlFor="awsAccessKey">AWS Access Key: </label>
          <input
            className={inputBorderStyle}
            type="text"
            id="awsAccessKey"
            {...register('awsAccessKey')}
          />
          {errors.awsAccessKey && (
            <span className={errorMsgStyle}>
              {errors.awsAccessKey?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-64">
          <label htmlFor="awsSecretAccessKey">AWS Secret Access Key: </label>
          <input
            className={inputBorderStyle}
            type="text"
            id="awsSecretAccessKey"
            {...register('awsSecretAccessKey')}
          />
          {errors.awsSecretAccessKey && (
            <span className={errorMsgStyle}>
              {errors.awsSecretAccessKey?.message}
            </span>
          )}
        </div>

        <button className={submitButtonStyle} type="submit">
          Continue To View Services
        </button>
      </form>
    </div>
  );
};

export default PipelineSetUp;
