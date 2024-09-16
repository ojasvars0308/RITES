import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from '../../components/DKG_Layout'
import Dashboard from '../dashboard/Dashboard'
import Login from '../auth/Login'
import PageNotFound from '../pageNotFound/PageNotFound'
import SmsDutyStartForm from '../dashboard/duty/sms/SmsDutyStart/SmsDutyStartForm'
import VIShiftDetailsForm from '../dashboard/duty/visualInspection/VIShiftDetails/VIShiftDetailsForm'
import VIHome from '../dashboard/duty/visualInspection/VIHome/VIHome'
import CalibrationListForm from '../dashboard/duty/calibration/CalibrationListForm'
import NMCalibrationForm from '../dashboard/duty/calibration/NMCalibrationForm'
import BulkCalibrationForm from '../dashboard/duty/calibration/BulkCalibrationForm'
import SmsDutyEnd from '../dashboard/duty/sms/SmsDutyEnd'
import SmsBloomInspection from '../dashboard/duty/sms/SmsBloomInspection'
import ShiftReports from '../dashboard/duty/sms/ShiftReports'
import SmsHeatList from '../dashboard/duty/sms/SmsHeatList'
import SmsCheckList from '../dashboard/duty/sms/SmsCheckList'
import SmsVerification from '../dashboard/duty/sms/SmsVerification'
import SmsHeatSummary from '../dashboard/duty/sms/SmsHeatSummary'
import VisualInspectionForm from '../dashboard/duty/visualInspection/Inspection/VisualInspectionForm'
import VIShiftSummary from '../dashboard/duty/visualInspection/VIShiftSummary/VIShiftSummary'
import NDTShiftDetailsForm from '../dashboard/duty/ndt/NDTShiftDetailsForm'
import NDTHomeForm from '../dashboard/duty/ndt/NDTHomeForm'
import NDTCalibration from '../dashboard/duty/ndt/NDTCalibration'
import NDTShiftSummary from '../dashboard/duty/ndt/NDTShiftSummary'
import NDTReport from '../dashboard/duty/ndt/NDTReport'

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<PrivateRoutes />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='/sms'>
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
            </Route>

            <Route path='/ndt'>
              <Route index element={<NDTShiftDetailsForm />} />
              <Route path='dutyStart' element={<NDTShiftDetailsForm />} />
              <Route path='home' element={<NDTHomeForm />} />
              <Route path='calibration' element={<NDTCalibration />} />
              <Route path='shiftSummary' element={<NDTShiftSummary />} />
              <Route path='report' element={<NDTReport />} />
            </Route>

            <Route path='/viShiftStart' element={<VIShiftDetailsForm />} />
            <Route path='/visual/home' element={<VIHome />} />
            <Route path='/visual/inspection' element={<VisualInspectionForm />} />
            <Route path='/visual/shiftSummary' element={<VIShiftSummary />} />
            
            <Route path='/calibrationList' element={<CalibrationListForm />} />
            <Route path='/new-modify-calibration' element={<NMCalibrationForm />} />
            <Route path='/bulkCalibration' element={<BulkCalibrationForm />} />
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default RoutesComponent
