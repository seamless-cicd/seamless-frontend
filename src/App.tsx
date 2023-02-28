import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import PipelineSetUp from './components/PipelineSetUp';
import Services from './components/Services';
import ServiceSetUp from './components/ServiceSetUp';
import Service from './components/Service';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pipeline-set-up" element={<PipelineSetUp />} />
          <Route path="/service-set-up" element={<ServiceSetUp />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceID" element={<Service />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App
