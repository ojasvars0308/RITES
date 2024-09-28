import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from '../../components/DKG_CustomLayout'
import Dashboard from '../dashboard/Dashboard'
import Login from '../auth/Login'
import PageNotFound from '../pageNotFound/PageNotFound'
import SmsDutyStartForm from '../dashboard/duty/sms/SmsDutyStartForm'
import SmsDutyEnd from '../dashboard/duty/sms/SmsDutyEnd'
import SmsBloomInspection from '../dashboard/duty/sms/SmsBloomInspection'
import ShiftReports from '../dashboard/duty/sms/ShiftReports'
import SmsHeatList from '../dashboard/duty/sms/SmsHeatList'
import SmsCheckList from '../dashboard/duty/sms/SmsCheckList'
import SmsVerification from '../dashboard/duty/sms/SmsVerification'
import SmsHeatSummary from '../dashboard/duty/sms/SmsHeatSummary'
import VisualInspectionForm from '../dashboard/duty/visualInspection/inspection/VisualInspectionForm'
import VIShiftDetailsForm from '../dashboard/duty/visualInspection/shiftDetails/ShiftDetailsForm'
import Home from '../dashboard/duty/visualInspection/home/Home'
import VIShiftSummary from '../dashboard/duty/visualInspection/shiftSummary/VIShiftSummary'
import StageShiftDetailsForm from "../dashboard/duty/stage/rollingStage/shiftDetails/ShiftDetailsForm"
import StageHome from "../dashboard/duty/stage/rollingStage/home/Home"
import NDTStartDutyForm from "../dashboard/duty/ndt/shiftDetails/StartDutyForm"
import NDTHome from "../dashboard/duty/ndt/home/Home"
import NCalibrationForm from '../dashboard/duty/ndt/calibration/NCalibrationForm'
import NReport from "../dashboard/duty/ndt/report/NReport"

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<PrivateRoutes />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            {/* <Route path='/sms'>
              <Route index element={<SmsDutyStartForm />} />
              <Route path='heatSummary' element={<SmsHeatSummary />} />
              <Route path='dutyStart' element={<SmsDutyStartForm />} />
              <Route path='dutyEnd' element={<SmsDutyEnd />} />
              <Route path='bloomInspection' element={<SmsBloomInspection />} />
              <Route path='shiftReports'>
                <Route index element={<ShiftReports />} />
                <Route path='heatList' element={<SmsHeatList />} />
                <Route path='checkList' element={<SmsCheckList />} />
                <Route path='verification' element={<SmsVerification />} />
              </Route>
            </Route> */}

            <Route path='/visual'>
              <Route index element={<VIShiftDetailsForm />} />
              <Route path='startDuty' element={<VIShiftDetailsForm />} />
              <Route path='home' element={<Home />} />
              <Route path='inspection' element={<VisualInspectionForm />} />
              <Route path='summary' element={<VIShiftSummary />} />
            </Route>

            <Route path='/stage'>
              <Route index element={<StageShiftDetailsForm />} />
              <Route path='startDuty' element={<StageShiftDetailsForm />} />
              <Route path='home' element={<StageHome />} />
            </Route>

            <Route path='/ndt'>
              <Route index element={<NDTStartDutyForm />} />
              <Route path='startDuty' element={<NDTStartDutyForm />} />
              <Route path='home' element={<NDTHome />} />
              <Route path='calibration' element={<NCalibrationForm  />} />
              <Route path='report' element={<NReport />} />
            </Route>
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default RoutesComponent
