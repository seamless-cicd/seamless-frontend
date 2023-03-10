import { ServicesHeaderProps } from '../../schema/serviceSchema';

const ServicesHeaderCard = ({ pipeline }: ServicesHeaderProps) => {
  return (
    <div>
      <div className="mr-80 mb-8 rounded-lg border p-4 shadow-md shadow-slate-300">
        <h2 className="font-bold text-indigo-700">
          Pipeline Name: {pipeline.name}
        </h2>
        <p className="text-gray-600">{`Pipeline Id: ${pipeline.id}`}</p>
        <p className="text-gray-600">{`Created At: ${pipeline.createdAt}`}</p>
      </div>
    </div>
  );
};

export default ServicesHeaderCard;
