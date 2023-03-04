// To Do: inactivate submit button if no triggers are selected

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";

const TEST_SERVICES_URL = import.meta.env.VITE_TEST_SERVICES_URL;

const submitButtonStyle = "mt-10 mb-10 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const errorMsgStyle = "bg-red-100 px-4 py-2 text-red-700";

const inputBorderStyle = "ml-6 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

const schema = yup.object().shape({
  name: yup.string().required(),
  triggerOnCommit: yup.boolean().default(false),
  triggerOnPrOpen: yup.boolean().default(false),
  triggerOnPrSync: yup.boolean().default(false),
  useStaging: yup.boolean().default(false),
  githubRepository: yup.string().required(),
  testCommand: yup.string().required(),
  codeQualityCommand: yup.string().required(),
  dockerfilePath: yup.string().required(),
});

const ServiceSetUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log('sending data to backend and db')
      await axios.post(TEST_SERVICES_URL, data);
      navigate('/services');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Service Set Up</h2>
    <p className="mb-4">Pipeline ID: (retrieve from backend)</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className = "flex flex-col gap-2 w-64">
      <label htmlFor='name'>Service Name: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="name"
          {...register("name")}  
        />
        {errors.name && <p className={errorMsgStyle}>{errors.name.message}</p>}

      <div>
      <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Triggers</h3>
        <input
          className="mr-2"
          type="checkbox"
          id="triggerOnCommit"
          {...register('triggerOnCommit', {required: true})}
          defaultChecked={false}
        />
        <label htmlFor="triggerOnCommit">Trigger On Commit</label>

        <br></br>
        <input
          className="mr-2"
          type="checkbox"
          id="triggerOnPrOpen"
          {...register('triggerOnPrOpen')}
        />
        <label htmlFor="triggerOnPrOpen">Trigger On Pr Open</label>
      
        <br></br>
        <input
          className="mr-2"
          type="checkbox"
          id="triggerOnPrSync"
          {...register('triggerOnPrSync')}
        />
        <label htmlFor="triggerOnPrSync">Trigger On Pr Sync</label>
    
        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Use Staging</h3>
        <input
          className="mr-2"
          type="checkbox"
          id="useStaging"
          {...register('useStaging', {required: true})}
          defaultChecked={false}
        />
        <label htmlFor="useStaging">Use Staging</label>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">GitHub Repository</h3>
        <div className = "flex flex-col gap-2 w-64">
        <label htmlFor='githubRepository'>GitHub Repository: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="githubRepository"
          {...register("githubRepository")}  
        />
        {errors.githubRepository && <p className={errorMsgStyle}>{errors.githubRepository.message}</p>}
        </div>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Test Command</h3>
        <div className = "flex flex-col gap-2 w-64">
        <label htmlFor='githubRepository'>Test Command: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="testCommand"
          {...register("testCommand")}  
        />
        {errors.testCommand && <p className={errorMsgStyle}>{errors.testCommand.message}</p>}
        </div>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Code Quality Command</h3>
        <div className = "flex flex-col gap-2 w-64">
        <label htmlFor='githubRepository'>Code Quality Command: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="codeQualityCommand"
          {...register("codeQualityCommand")}  
        />
        {errors.codeQualityCommand && <p className={errorMsgStyle}>{errors.codeQualityCommand.message}</p>}
        </div>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Dockerfile Path</h3>
        <div className = "flex flex-col gap-2 w-64">
        <label htmlFor='githubRepository'>Dockerfile Path: </label>
        <input 
          className={inputBorderStyle}
          type="text"
          id="dockerfilePath"
          {...register("dockerfilePath")}  
        />
        {errors.dockerfilePath && <p className={errorMsgStyle}>{errors.dockerfilePath.message}</p>}
        </div>
        </div>
      </div>
 
    {/* To Do: inactivate submit button if no triggers are selected */}
      <button 
      className={submitButtonStyle}
      type="submit">Continue To View Services</button>
    </form>
  </div>
  )
}

export default ServiceSetUp