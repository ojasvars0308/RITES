import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import IconBtn from '../../../../components/DKG_IconBtn';
import {EditOutlined, FileSearchOutlined, PieChartOutlined, TrademarkCircleOutlined, FileMarkdownOutlined }from '@ant-design/icons';
import { message } from 'antd';
import TabList from '../../../../components/DKG_TabList';
import FormBody from '../../../../components/DKG_FormBody';
import FormInputItem from '../../../../components/DKG_FormInputItem';
import Btn from '../../../../components/DKG_Btn';
import { useNavigate } from 'react-router-dom'

const ndtHomeTabs = [
  {
    title: 'NDT Calibration',
    icon: <TrademarkCircleOutlined />,
    link: "/ndt/calibration"
  },
  {
    title: 'Shift Summary',
    icon: <FileSearchOutlined />,
    link: "/ndt/shiftSummary"
  },
  {
    title: 'NDT Report',
    icon: <PieChartOutlined />,
    link: "/ndt/report"
  },
  {
    title: 'Test Sample Marking',
    icon: <FileMarkdownOutlined />,
    link: "/stage/testSample/list"
  },
]

const NDTHomeForm = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
  const [remarks, setRemarks] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/shiftDetails')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setShiftDetails([...data])
        })
        .catch(error => console.error('Error fetching shift details:', error));
  }, []);

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    navigate('/login')
  }

  return (
    <>
      <SubHeader title='NDT - Home' link='/ndt/dutyStart' />
      {
        shiftDetails &&
          <section className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 relative border p-1 border-gray-500 rounded-sm">
          <h3>Date: {shiftDetails[1].formData.date}</h3>
          <h3>Shift: {shiftDetails[1].formData.shift}</h3>
          <h3>Mill: {shiftDetails[1].formData.mill}</h3>
          <h3>NDT: {shiftDetails[1].formData.ndt}</h3>
          <h3>Rail Grade: {shiftDetails[1].formData.railGrade}</h3>
          <h3>Rail Section: {shiftDetails[1].formData.railSection}</h3>
          <div className='absolute top-0 right-0'>
            <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
          </div>
        </section>
      }

      <section className='mb-4'>
        <TabList tabList={ndtHomeTabs} />
      </section>

      <hr />

      <section>
        <FormBody
          initialValues={remarks}
          onFinish={handleFormSubmit}
        >
          <FormInputItem label='Shift Remarks' placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks' required/>
          <Btn htmlType='submit' className='w-[25%]'>End Duty</Btn>
        </FormBody>
      </section>
    </>
  )
}

export default NDTHomeForm