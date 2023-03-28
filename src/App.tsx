import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './components/context_providers/UserContextProvider';
import PipelineSetup from './components/forms/PipelineSetup';
import ServiceSetup from './components/forms/ServiceSetup';
import Home from './components/Home';
import Nav from './components/nav/Nav';
import Services from './components/pipeline/Services';
import ActiveRuns from './components/run/ActiveRuns';
import Run from './components/run/Run';
import Service from './components/service/Service';
import ServiceRollback from './components/service/ServiceRollback';

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex min-h-screen">
      <Router>
        <Nav />
        <div className="mb-10 w-[950px] pt-14 pl-12">
          {user ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pipeline-setup" element={<PipelineSetup />} />
              <Route path="/service-setup" element={<ServiceSetup />} />
              <Route
                path="/services/:serviceId/edit"
                element={<ServiceSetup />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<Service />} />
              <Route
                path="/services/:serviceId/rollbacks"
                element={<ServiceRollback />}
              />
              <Route path="/runs/:runId" element={<Run />} />
              <Route path="/active-runs" element={<ActiveRuns />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          ) : (
            <Home />
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
