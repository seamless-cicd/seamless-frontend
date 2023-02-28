import { useState, useEffect } from "react";

const sampleServices = [
  {
    name: 'Payment Microservice',
    repo: 'https://github.com/seamless-cicd/payment-service',
    triggers: ['Merge into main', 'Open PR', 'Push to PR'],
    serviceID: 't01 (retrieved)',
  },
  {
    name: 'Ecommerce Microservice',
    repo: 'https://github.com/seamless-cicd/ecommerce-service',
    triggers: ['Merge into main'],
    serviceID: 't02 (retrieved)',
  },
];

interface ServiceType {
  name: string;
  repo: string;
  triggers: string[];
  serviceID: string;
}

const Card = ({ name, repo, triggers, serviceID }: ServiceType) => {
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold">{name}</h2>
      <p className="text-gray-600">{`ServiceID: ${serviceID}`}</p>
      <p className="text-gray-600">{`Repo: ${repo}`}</p>
      <p className="text-gray-600">{`Triggers: ${triggers.join(',')}`}</p>
    </div>
  );
};

const CardList = ({ data }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((name: any, repo:any, triggers:any, sercviceID:string) => (
        <Card name={data.name} repo={data.repo} serviceID={data.serviceID} triggers={data.triggers} />
      ))}
    </div>
  );
};





const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      // To Do: get data using
      // const result = await axios.get('backendURL')
      setServices(sampleServices);
    }
    fetchServices();
  }, []);

  return (
    <div className="mt-8 ml-8">
      <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Pipeline Services</h2>
      {/* {services.map(service => {
        return <li key={service.serviceID}>{service.name} {service.repo}</li>
      })} */}
    

{/* Old formatting working */}
    {/* <div className="border rounded-lg shadow-md p-4">
      {services.map(service => {
        return Object.entries(service).map(([key, value]) => {
          return (
            <div className="mb-2" key={key}>
            <div className="text-gray-500 font-bold">{key}</div>
            <div className="text-gray-800">{value}</div>
            </div>
          )
        })

        
      })}
    </div> */}



{/* // EXPERIMENTAL */}

    <div className="border rounded-lg shadow-md p-4 mr-80">
      {services.map(service => {
        return <Card name={service.name} repo={service.repo} triggers={service.triggers} serviceID={service.serviceID} />
      })}
    </div>





    </div>
  )
}

export default Services;