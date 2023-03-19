import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PIPELINES_PATH } from '../../constants';
import { pipelineFormSchema, PipelineFormType } from '../../schema/formSchema';
import { axiosPostAuthenticated } from '../../utils/authentication';

import { Button } from '../ui/Button';
import FormErrorMessage from './ErrorMessage';

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
      navigate('/service-setup');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">Pipeline Setup</h1>
      <p className="mt-4 max-w-prose text-stone-600">
        Please provide details about your pipeline and AWS infrastructure.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex w-96 flex-col gap-2">
          <label htmlFor="name">Pipeline Name</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && (
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          )}
        </div>

        <div className="mt-6 flex w-96 flex-col gap-2">
          <label htmlFor="awsEcsCluster">AWS ECS Cluster Name</label>
          <input
            type="text"
            id="awsEcsCluster"
            {...register('awsEcsCluster')}
          />
          {errors.awsEcsCluster && (
            <FormErrorMessage>{errors.awsEcsCluster?.message}</FormErrorMessage>
          )}
        </div>

        <div className="mt-6 flex w-96 flex-col gap-2">
          <label htmlFor="awsEcsClusterStaging">
            AWS ECS Cluster (Staging) Name
          </label>
          <input
            type="text"
            id="awsEcsClusterStaging"
            {...register('awsEcsClusterStaging')}
          />
          {errors.awsEcsClusterStaging && (
            <FormErrorMessage>
              {errors.awsEcsClusterStaging?.message}
            </FormErrorMessage>
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
