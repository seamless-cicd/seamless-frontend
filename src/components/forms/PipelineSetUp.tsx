import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PIPELINES_PATH } from '../../constants';
import { pipelineFormSchema, PipelineFormType } from '../../schema/formSchema';
import { axiosPostAuthenticated } from '../../utils/authentication';
import { Button } from '../ui/Button';

const errorMsgStyle = 'bg-red-100 px-4 py-2 text-red-700 rounded-md text-sm';

const inputBorderStyle =
  'border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';

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
      await axiosPostAuthenticated(PIPELINES_PATH, data);
      navigate('/service-set-up');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">Pipeline Setup</h1>
      <p className="mt-4 max-w-prose text-stone-600">
        Please enter your credentials so we can clone code and provision AWS
        infrastructure on your behalf.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex w-80 flex-col gap-2">
          <label htmlFor="name">Pipeline Name</label>
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

        <div className="mt-6 flex w-80 flex-col gap-2">
          <label htmlFor="githubPat">GitHub PAT (Classic)</label>
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

        <div className="mt-6 flex w-80 flex-col gap-2">
          <label htmlFor="awsAccessKey">AWS Access Key</label>
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

        <div className="mt-6 flex w-80 flex-col gap-2">
          <label htmlFor="awsSecretAccessKey">AWS Secret Access Key</label>
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

        <div className="mt-16">
          <Button type="submit">
            Continue To Service Setup
            <ArrowRightCircle className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PipelineSetUp;
