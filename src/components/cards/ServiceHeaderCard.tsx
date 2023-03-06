// service header

import { ServiceHeaderProps } from "../../types/serviceHeaderProps";

const ServiceHeaderCard = ({service}: ServiceHeaderProps) => {
  
  return (
    <div>
    <div className="border rounded-lg shadow-md p-4 mr-80 mb-8">
      <h2 className="font-bold text-indigo-700">Name: {service.name}</h2>
      <p className="text-gray-600">{`Service Id: ${service.id}`}</p>
      <p className="text-gray-600">{`GitHub Repo: ${service.githubRepoUrl}`}</p>

    </div>
    </div>
  )
}

export default ServiceHeaderCard;