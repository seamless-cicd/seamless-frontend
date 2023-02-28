interface ServiceType {
  name: string;
  repo: string;
  triggers: string[];
  serviceID: string;
}

const Card = ({ name, repo, triggers, serviceID }: ServiceType) => {
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">{name}</h2>
      <p className="text-gray-600">{`ServiceID: ${serviceID}`}</p>
      <p className="text-gray-600">{`Repo: ${repo}`}</p>
      <p className="text-gray-600">{`Triggers: ${triggers.join(',')}`}</p>
    </div>
  );
};

export default Card;