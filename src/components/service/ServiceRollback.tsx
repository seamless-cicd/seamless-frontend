import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVICES_PATH } from '../../constants';
import { Rollback, RollbackSchema } from '../../schema/runSchema';
import { ServiceType } from '../../schema/serviceSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import LoadingSpinner from '../ui/LoadingSpinner';
import RollbackCard from './RollbackCard';

const ServiceRollback = () => {
  const serviceId = useParams().serviceId || '';

  const [service, setService] = useState<ServiceType | null>(null);
  const [rollbacks, setRollbacks] = useState<Rollback[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await axiosGetAuthenticated(
          `${SERVICES_PATH}/${serviceId}`,
        );
        setService(serviceResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    const fetchRollbacks = async () => {
      try {
        const rollbacksResponse = await axiosGetAuthenticated(
          `${SERVICES_PATH}/${serviceId}/rollbacks`,
        );

        const validatedRollbacks = RollbackSchema.array().safeParse(
          rollbacksResponse.data,
        );
        if (!validatedRollbacks.success) return;

        const sortedRollbacks = validatedRollbacks.data.sort((a, b) => {
          return (
            new Date(b.image.imagePushedAt).getTime() -
            new Date(a.image.imagePushedAt).getTime()
          );
        });

        setRollbacks(sortedRollbacks);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRollbacks();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">
        Service:{' '}
        <span className="text-indigo-700">{service?.name || 'Loading'}</span>
      </h1>
      <p className="mt-2 font-mono text-xs text-stone-400">{`${serviceId}`}</p>
      {service && (
        <a
          href={service.githubRepoUrl}
          target="_blank"
          className="mt-2 block text-stone-600 underline hover:text-indigo-700"
        >{`${service.githubRepoUrl}`}</a>
      )}

      <h2 className="mt-8 text-2xl font-medium text-stone-700">
        Rollback Images Available for this Service
      </h2>
      {rollbacks.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-4 w-full space-y-8">
          {rollbacks.map((rollback) => (
            <RollbackCard
              key={rollback.image.imageDigest}
              rollback={rollback}
              serviceId={serviceId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceRollback;
