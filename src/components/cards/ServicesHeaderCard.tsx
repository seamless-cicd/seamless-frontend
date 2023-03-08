import { ServicesHeaderProps } from "../../types/servicesHeaderProps";

const ServicesHeaderCard = ({pipeline}: ServicesHeaderProps) => {
  
  return (
    <div>
    <div className="border rounded-lg shadow-md p-4 mr-80 mb-8">
      <h2 className="font-bold text-indigo-700">Pipeline Name: {pipeline.name}</h2>
      <p className="text-gray-600">{`Pipeline Id: ${pipeline.id}`}</p>
      <p className="text-gray-600">{`Created At: ${pipeline.createdAt}`}</p>
    </div>
    </div>
  )
}

export default ServicesHeaderCard;