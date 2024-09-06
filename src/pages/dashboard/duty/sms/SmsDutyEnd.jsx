import React, { useState } from 'react'
import SubHeader from '../../../../components/SubHeader'
import {EditOutlined, FileSearchOutlined, EyeOutlined, PieChartOutlined}from '@ant-design/icons';
import IconBtn from '../../../../components/IconBtn';
import { message } from 'antd';
import FormBody from '../../../../components/FormBody';
import FormInputItem from '../../../../components/FormInputItem';
import Btn from '../../../../components/Btn';
import TabList from '../../../../components/TabList';

const smsDutyEndTabs = [
  {
    title: 'SMS Summary',
    icon: <FileSearchOutlined />,
    link: "/sms/heatSummary"
  },
  {
    title: 'Bloom Inspection',
    icon: <EyeOutlined />,
    link: "/sms/bloomInspection"
  },
  {
    title: 'Shift Reports',
    icon: <PieChartOutlined />,
    link: "/sms/shiftReports"
  },
]

const SmsDutyEnd = () => {
  const [remarks, setRemarks] = useState('')

  const handleFormSubmit = () => {
    message.success("Duty End Called")
  }
  return (
    <>
    <SubHeader title='SMS - Duty End' link='/' />
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 relative border p-1 border-gray-500 rounded-sm">
        <h3>Date: 13/12/2001</h3>
        <h3>Shift: A</h3>
        <h3>SMS: SMS 3</h3>
        <h3>Rail Grade: R260</h3>
        <div className='absolute top-0 right-0'>
          <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
        </div>
      </section>

      <section>
        <TabList tabList={smsDutyEndTabs} />
      </section>

      <section>
        <FormBody
          initialValues={remarks}
          onFinish={handleFormSubmit}
        >
          <FormInputItem placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks'/>
            <Btn htmlType='submit'>End Duty</Btn>
        </FormBody>
      </section>
      
    </>
  )
}

export default SmsDutyEnd
