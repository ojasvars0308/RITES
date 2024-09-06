import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from '../../components/Layout'
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
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default RoutesComponent
