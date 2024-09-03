import React from 'react';
import VIShiftDetails from './forms/VIShiftDetails';
import VIHome from './forms/VIHome';
import VisualInspection from './forms/VisualInspection';
import VIShiftSummary from './forms/VIShiftSummary';
import StageSampleList from './forms/StageSampleList';
import Routes from './pages/route/Routes';


function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<VIShiftDetails />} />
    //     <Route path='/visual/home' element={<VIHome />}/>
    //     <Route path='/visual/inspection' element={<VisualInspection />}/>
    //     <Route path='/visual/shiftSummary' element={<VIShiftSummary />}/>
    //     <Route path='/stage/testSampleMarking/sampleList' element={<StageSampleList />}/>
    //   </Routes>
    // </Router>
    <Routes />
  );
}

export default App;
