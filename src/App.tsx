import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PipelineSetUp from './components/forms/PipelineSetUp';
import Services from './components/services/Services';
import ServiceSetUp from './components/forms/ServiceSetUp';
import Service from './components/service/Service';
import Run from './components/run/Run';
import ServiceEdit from './components/forms/ServiceEdit';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pipeline-set-up" element={<PipelineSetUp />} />
          <Route path="/service-set-up" element={<ServiceSetUp />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<Service />} />
          <Route path="/services/:serviceId/edit" element={<ServiceEdit />} />
          <Route path="/runs/:runId" element={<Run />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App
