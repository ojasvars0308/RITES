import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VIShiftDetails from './forms/VIShiftDetails';
import VIHome from './forms/VIHome';
import VisualInspection from './forms/VisualInspection';
import VIShiftSummary from './forms/VIShiftSummary';
import StageSampleList from './forms/StageSampleList';
import VIAcceptanceSummary from './forms/VIAcceptanceSummary';
import VIDefectAnalysisSummary from './forms/VIDefectAnalysisSummary';
import VIInspectedRailwiseSummary from './forms/VIInspectedRailwiseSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VIShiftDetails />} />
        <Route path='/visual/home' element={<VIHome />}/>
        <Route path='/visual/inspection' element={<VisualInspection />}/>
        <Route path='/visual/shiftSummary' element={<VIShiftSummary />}/>
        <Route path='/stage/testSampleMarking/sampleList' element={<StageSampleList />}/>
        <Route path='/acceptance-summary' element={<VIAcceptanceSummary />}/>
        <Route path='/defect-analysis-summary' element={<VIDefectAnalysisSummary />}/>
        <Route path='/inspected-railwise-summary' element={<VIInspectedRailwiseSummary />}/>
      </Routes>
    </Router>
  );
}

export default App;
