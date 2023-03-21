import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RUNS_PATH, SERVICES_PATH } from '../../constants';
import { RunType } from '../../schema/runSchema';
import { ServiceType } from '../../schema/serviceSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import LoadingSpinner from '../ui/LoadingSpinner';
import RunsList from './RunsList';

const POLLING_RATE = 5000;

const Service = () => {
  const serviceId = useParams().serviceId;

  const [service, setService] = useState<ServiceType | null>(null);
  const [runs, setRuns] = useState<RunType[]>([]);

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

    // Poll for latest Run data
    const pollInterval = setInterval(async () => {
      try {
        const runsResponse = await axiosGetAuthenticated(RUNS_PATH, {
          params: { serviceId },
        });

        setRuns(runsResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, POLLING_RATE);

    return () => clearInterval(pollInterval);
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
        Pipeline Runs for this Service
      </h2>
      {runs.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <RunsList runs={runs} setRuns={setRuns} />
      )}
    </div>
  );
};

export default Service;
