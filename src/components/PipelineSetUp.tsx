// To Do: create pipeline ID either on backend when this is submitted or on front end

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const submitButtonStyle = "mt-10 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const errorMsgStyle = "bg-red-100 px-4 py-2 text-red-700";

const inputBorderStyle = "ml-6 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";


const schema = yup.object().shape({
  pipelineName: yup.string().required('Name is required'),
  // PAT has a length of 40 chars
  gitHubPAT: yup.string().required().min(40, 'Must be 40 characters').max(40, 'Must be 40 characters'),
  // awsAccountID is a 12 digit number from what I have seen
  awsAccountID: yup.number().required().min(100000000000, 'Must be 12 digits').max(999999999999, 'Must be 12 digits'),
  // will automatically lowercase it
  awsRegion: yup.string().lowercase().required(),
  awsAvailabilityZone: yup.string().lowercase().required(),
  awsAccessKeyID: yup.string().required(),
  awsSecretAccessKey: yup.string().required(),
  awsFargateClusterName: yup.string().required(),
});

const PipelineSetUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data, ' ... sending to API with axios');
    navigate('/service-set-up');
  }

  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Pipeline Set Up</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className = "flex flex-col gap-2 w-64">
      <label htmlFor='pipelineName'>Pipeline Name: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="pipelineName"
          {...register("pipelineName")}  
        />
        {errors.pipelineName && <p className={errorMsgStyle}>{errors.pipelineName.message}</p>}


      <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">GitHub</h3>
      <label>GitHub PAT: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="gitHubPAT"
          {...register("gitHubPAT")} 
        />
        {errors.gitHubPAT && <p className={errorMsgStyle}>{errors.gitHubPAT.message}</p>}

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">AWS</h3>
        <label>AWS Account ID: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="awsAccountID"
          {...register("awsAccountID")} 
        />
        {errors.awsAccountID && <p className={errorMsgStyle}>{errors.awsAccountID.message}</p>}

        <label>AWS Region: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="awsRegion"
          {...register("awsRegion")} 
        />
        {errors.awsRegion && <p className={errorMsgStyle}>{errors.awsRegion.message}</p>}

        <label>AWS Availability Zone: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="awsAvailabilityZone"
          {...register("awsAvailabilityZone")} 
        />
        {errors.awsAvailabilityZone && <p className={errorMsgStyle}>{errors.awsAvailabilityZone.message}</p>}

        <label>AWS Access Key ID: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="awsAccessKeyID"
          {...register("awsAccessKeyID")} 
        />
        {errors.awsAccessKeyID && <p className={errorMsgStyle}>{errors.awsAccessKeyID.message}</p>}

        <label>AWS Secret Access Key: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="awsSecretAccessKey"
          {...register("awsSecretAccessKey")} 
        />
        {errors.awsSecretAccessKey && <p className={errorMsgStyle}>{errors.awsSecretAccessKey.message}</p>}

        <label>AWS Fargate Cluster Name: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="awsFargateClusterName"
          {...register("awsFargateClusterName")} 
        />
        {errors.awsFargateClusterName && <p className={errorMsgStyle}>{errors.awsFargateClusterName.message}</p>}



      </div>
 

      <button 
      className={submitButtonStyle}
      type="submit">Submit</button>
    </form>
  </div>
  )
}

export default PipelineSetUp
