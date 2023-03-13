import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PipelineSetUp from './components/forms/PipelineSetUp';
import ServiceEdit from './components/forms/ServiceEdit';
import ServiceSetUp from './components/forms/ServiceSetUp';
import Home from './components/Home';
import Nav from './components/nav/Nav';
import Run from './components/run/Run';
import Service from './components/service/Service';
import Services from './components/services/Services';

// const WebhookIdContext = React.createContext(0);


// // create provider component
// function CountProvider({ children }: any) {
//   const [id, setId] = useState();

//   // create a function to update count
//   function updateId(newId: number) {
//     setId(newId);
//   }

//   // create a context object with the count state and updateCount function
//   const context = {
//     id,
//     updateWebhookId,
//   };


// // create a custom hook to use context

// return <WebhookIdContext.Provider value={context}>{children}</WebhookIdContext.Provider>;
// }

// const { webhookId, updateWebhookId } = useContext(WebhookIdContext);

function App() {
  const [webhookId, setWebhookId] = useState(0);

  return (
    <div className="flex min-h-screen">
      <Router>
        <Nav />
        <div className="mb-10 w-[900px] pt-14 pl-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pipeline-set-up" element={<PipelineSetUp />} />
            <Route path="/service-set-up" element={<ServiceSetUp setWebhookId={setWebhookId}/>} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<Service />} />
            <Route path="/services/:serviceId/edit" element={<ServiceEdit webhookId={webhookId} />} />
            <Route path="/runs/:runId" element={<Run />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
