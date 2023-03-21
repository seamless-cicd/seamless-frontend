import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './components/context_providers/UserContextProvider';
import PipelineSetUp from './components/forms/PipelineSetUp';
import ServiceEdit from './components/forms/ServiceEdit';
import ServiceSetUp from './components/forms/ServiceSetUp';
import Home from './components/Home';
import Nav from './components/nav/Nav';
import ActiveRuns from './components/run/ActiveRuns';
import Run from './components/run/Run';
import Service from './components/service/Service';
import ServiceRollback from './components/service/ServiceRollback';
import Services from './components/services/Services';

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex min-h-screen">
      <Router>
        <Nav />
        <div className="mb-10 w-[900px] pt-14 pl-12">
          {user ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pipeline-setup" element={<PipelineSetUp />} />
              <Route path="/service-setup" element={<ServiceSetUp />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<Service />} />
              <Route
                path="/services/:serviceId/edit"
                element={<ServiceEdit />}
              />
              <Route
                path="/services/:serviceId/rollbacks"
                element={<ServiceRollback />}
              />
              <Route path="/runs/:runId" element={<Run />} />
              <Route path="/activeruns" element={<ActiveRuns />} />
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
