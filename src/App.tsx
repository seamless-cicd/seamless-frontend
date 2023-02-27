import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import PipelineSetUp from './components/PipelineSetUp';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pipeline-set-up" element={<PipelineSetUp />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App
