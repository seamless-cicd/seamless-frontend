import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const TEST_SERVICES_URL = import.meta.env.VITE_TEST_SERVICES_URL;

const submitButtonStyle = "mt-10 mb-10 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const errorMsgStyle = "bg-red-100 px-4 py-2 text-red-700";

const inputBorderStyle = "ml-6 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

const serviceEditFormSchema = z.object({
  name: z.string().min(1, "Service name is required").max(40),
  triggerOnMain: z.boolean().default(false),
  triggerOnPrOpen: z.boolean().default(false),
  triggerOnPrSync: z.boolean().default(false),
  useStaging: z.boolean().default(false),
  autoDeploy: z.boolean().default(false),
  githubRepoUrl: z.string().min(1, "GitHub Repo is required"),
  unitTestCommand: z.string().min(1, "Unit test command is required"),
  integrationTestCommand: z.string().min(1, "Integration test command is required"),
  codeQualityCommand: z.string().min(1, "Code quality command is required"),
  dockerfilePath: z.string().min(1, "Dockerfile path is required"),
  dockerComposeFilePath: z.string().min(1, "Docker compose file path is required"),
})

type ServiceEditFormSchemaType = z.infer<typeof serviceEditFormSchema>;

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
]

const ServiceEdit = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceEditFormSchemaType>({
    resolver: zodResolver(serviceEditFormSchema),
});

  const onSubmit: SubmitHandler<ServiceEditFormSchemaType> = async (data) => {
    console.log(serviceData);
    // need to update here
    // try {
    //   await axios.post(TEST_SERVICES_URL, data);
    //   navigate('/services');
    // } catch (e) {
    //   console.log(e);
    // }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TEST_SERVICES_URL + serviceId);
        setServiceData(response.data);
  
        editableFields.forEach(field => {
          setValue(field, response.data[field])
        })
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

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
        {errors.name && (
            <span className={errorMsgStyle}>
              {errors.name?.message}
            </span>
        )}

      <div>
      <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Triggers</h3>
        <input
          className="mr-2"
          type="checkbox"
          id="triggerOnMain"
          {...register('triggerOnMain', {required: true})}
          defaultChecked={false}
        />
        <label htmlFor="triggerOnMain">Trigger On Main</label>

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

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Auto Deploy</h3>
        <input
          className="mr-2"
          type="checkbox"
          id="autoDeploy"
          {...register('autoDeploy', {required: true})}
          defaultChecked={false}
        />
        <label htmlFor="autoDeploy">Auto Deploy</label>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">GitHub Repository URL</h3>
        <div className = "flex flex-col gap-2 w-64">
          <label htmlFor='githubRepoUrl'>GitHub Repository URL: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="githubRepoUrl"
            {...register("githubRepoUrl")}  
          />
          {errors.githubRepoUrl && (
              <span className={errorMsgStyle}>
                {errors.githubRepoUrl?.message}
              </span>
          )}
        </div>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Unit Test Command</h3>
        <div className = "flex flex-col gap-2 w-64">
          <label htmlFor='githubRepository'>Unit Test Command: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="unitTestCommand"
            {...register("unitTestCommand")}  
          />
          {errors.unitTestCommand && (
              <span className={errorMsgStyle}>
                {errors.unitTestCommand?.message}
              </span>
          )}
        </div>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Integration Test Command</h3>
        <div className = "flex flex-col gap-2 w-64">
          <label htmlFor='githubRepository'>Integration Test Command: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="integrationTestCommand"
            {...register("integrationTestCommand")}  
          />
          {errors.integrationTestCommand && (
            <span className={errorMsgStyle}>
              {errors.integrationTestCommand?.message}
            </span>
          )}
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
          {errors.codeQualityCommand && (
            <span className={errorMsgStyle}>
              {errors.codeQualityCommand?.message}
            </span>
          )}
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
          {errors.dockerfilePath && (
            <span className={errorMsgStyle}>
              {errors.dockerfilePath?.message}
            </span>
          )}
        </div>

        <h3 className="text-xl text-indigo-700 font-bold mb-4 mt-8">Docker Compose File Path</h3>
        <div className = "flex flex-col gap-2 w-64">
          <label htmlFor='githubRepository'>Docker Compose File Path: </label>
          <input 
            className={inputBorderStyle}
            type="text"
            id="dockerComposefilePath"
            {...register("dockerComposeFilePath")}  
          />
          {errors.dockerComposeFilePath && (
            <span className={errorMsgStyle}>
              {errors.dockerComposeFilePath?.message}
            </span>
          )}
        </div>

        </div>
      </div>
      <button 
      className={submitButtonStyle}
      disabled={isSubmitting}
      type="submit">Continue To View Services</button>
    </form>
  </div>
  )
}

export default ServiceEdit;