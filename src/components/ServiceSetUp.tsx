// To Do: create a service ID when this form is submitted either on backend or frontend. ID needed to identify single service

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const submitButtonStyle = "mt-10 mb-10 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const errorMsgStyle = "bg-red-100 px-4 py-2 text-red-700";

const inputBorderStyle = "ml-6 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";


const schema = yup.object().shape({
  serviceName: yup.string().required(),
  repo: yup.string().required(),
  mergeMain: yup.boolean().default(false),
  openPullRequest: yup.boolean().default(false),
  pushPullRequest: yup.boolean().default(false),
  dockerBaseImage: yup.string().required(),
  lintCommand: yup.string().required(),
  unitTestCommand: yup.string().required(),
  ecrRepoName: yup.string().required(),
  fargateServiceName: yup.string().required(),
  maxRetries: yup.number().min(0).max(5),
  useStagingEnvironment: yup.boolean().default(false),
});

const ServiceSetUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  

  const onSubmit = (data: any) => {
    console.log(data, ' ... sending to API with axios');
    console.log('navigating to next step...')
    navigate('/services');
  }

  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Service Set Up</h2>
    <p className="mb-4">Pipeline ID: (retrieve from backend)</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className = "flex flex-col gap-2 w-64">
      <label htmlFor='serviceName'>Service Name: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="serviceName"
          {...register("serviceName")}  
        />
        {errors.serviceName && <p className={errorMsgStyle}>{errors.serviceName.message}</p>}

        <label htmlFor='repo'>GitHub Repo: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="repo"
          {...register("repo")}  
        />
        {errors.repo && <p className={errorMsgStyle}>{errors.repo.message}</p>}


      <div>
      <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Triggers</h3>
        <input
          className="mr-2"
          type="checkbox"
          id="mergeMain"
          {...register('mergeMain', {required: true})}
          defaultChecked={false}
        />
        <label htmlFor="mergeMain">Merge To Main</label>

        <br></br>
        <input
          className="mr-2"
          type="checkbox"
          id="openPullRequest"
          {...register('openPullRequest')}
        />
        <label htmlFor="openPullRequest">Open Pull Request</label>
      
        <br></br>
        <input
          className="mr-2"
          type="checkbox"
          id="Push Pull Request"
          {...register('Push Pull Request')}
        />
        <label htmlFor="mergeMain">Push Pull Request</label>
    
      </div>



      <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Prepare Stage</h3>
      <label>Docker Base Image: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="dockerBaseImage"
          {...register("dockerBaseImage")} 
        />
        {errors.dockerBaseImage && <p className={errorMsgStyle}>{errors.dockerBaseImage.message}</p>}


        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Lint Stage</h3>
      <label>Lint Command: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="lintCommand"
          {...register("lintCommand")} 
        />
        {errors.lintCommand && <p className={errorMsgStyle}>{errors.lintCommand.message}</p>}

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Unit Test Stage</h3>
        <label>Unit Test Command: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="unitTestCommand"
            {...register("unitTestCommand")} 
          />
        {errors.unitTestCommand && <p className={errorMsgStyle}>{errors.unitTestCommand.message}</p>}

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Build and Push Stage</h3>
        <label>AWS ECR Repository Name: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="ecrRepoName"
            {...register("ecrRepoName")} 
          />
        {errors.ecrRepoName && <p className={errorMsgStyle}>{errors.ecrRepoName.message}</p>}

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Fargate Settings</h3>
        <label>Fargate Service Name: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="fargateServiceName"
            {...register("fargateServiceName")} 
          />
        {errors.fargateServiceName && <p className={errorMsgStyle}>{errors.fargateServiceName.message}</p>}

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Other Settings</h3>
        <label>Max Retries: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="maxRetries"
            {...register("maxRetries")} 
          />
        {errors.maxRetries && <p className={errorMsgStyle}>{errors.maxRetries.message}</p>}

        <label>Use Staging Environment (true/false): </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="useStagingEnvironment"
            {...register("useStagingEnvironment")} 
          />
        {errors.useStagingEnvironment && <p className={errorMsgStyle}>{errors.useStagingEnvironment.message}</p>}



      </div>
 

      <button 
      className={submitButtonStyle}
      type="submit">Submit</button>
    </form>
  </div>
  )
}

export default ServiceSetUp
