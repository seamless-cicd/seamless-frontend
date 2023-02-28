import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const submitButtonStyle = "mt-10 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const errorMsgStyle = "bg-red-100 px-4 py-2 text-red-700";

const inputBorderStyle = "ml-6 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";


const schema = yup.object().shape({
  serviceName: yup.string().required(),
  dockerBaseImage: yup.string().required(),
  // checkboxes: yup.array().of(yup.boolean()),
  mergeMain: yup.boolean().default(false),
  openPullRequest: yup.boolean().default(false),
  pushPullRequest: yup.boolean().default(false),
});

const ServiceSetUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  

  const onSubmit = (data: any) => {
    console.log(data, ' ... sending to API with axios');
    console.log('navigating to next step...')
    // navigate('/next-step...');
  }

  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Service Set Up</h2>
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



      </div>
 

      <button 
      className={submitButtonStyle}
      type="submit">Submit</button>
    </form>
  </div>
  )
}

export default ServiceSetUp
