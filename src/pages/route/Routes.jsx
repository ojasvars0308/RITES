import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from '../../components/Layout'
import Dashboard from '../dashboard/Dashboard'
import Login from '../auth/Login'
import PageNotFound from '../pageNotFound/PageNotFound'
import SmsDutyStartForm from '../dashboard/duty/sms/SmsDutyStartForm'
import VIShiftDetailsForm from '../dashboard/duty/visualInspection/VIShiftDetailsForm'
import VIShiftDetails from '../../forms/VIShiftDetails'
import VIHome from '../../forms/VIHome'
import VisualInspection from '../../forms/VisualInspection'
import VIShiftSummary from '../../forms/VIShiftSummary'
import VIAcceptanceSummary from '../../forms/VIAcceptanceSummary'
import VIDefectAnalysisSummary from '../../forms/VIDefectAnalysisSummary'
import VIInspectedRailwiseSummary from '../../forms/VIInspectedRailwiseSummary'

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<PrivateRoutes />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='/smsDutyStart' element={<SmsDutyStartForm />} />
            {/* <Route path='/viShiftStart' element={<VIShiftDetailsForm />} /> */}
            <Route path='/visual' element={<VIShiftDetails />} />
            <Route path='/visual/home' element={<VIHome />} />
            <Route path='/visual/inspection' element={<VisualInspection />} />
            <Route path='/visual/shiftSummary' element={<VIShiftSummary />} />
            <Route path='/acceptance-summary' element={<VIAcceptanceSummary />} />
            <Route path='/defect-analysis-summary' element={<VIDefectAnalysisSummary />} />
            <Route path='/inspected-railwise-summary' element={<VIInspectedRailwiseSummary />} />
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default RoutesComponent
