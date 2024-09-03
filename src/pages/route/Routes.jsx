import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from '../../components/Layout'
import Dashboard from '../dashboard/Dashboard'
import Login from '../auth/Login'
import PageNotFound from '../pageNotFound/PageNotFound'
import SmsDutyStartForm from '../dashboard/duty/sms/SmsDutyStartForm'

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<PrivateRoutes />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='/smsDutyStart' element={<SmsDutyStartForm />} />
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default RoutesComponent
