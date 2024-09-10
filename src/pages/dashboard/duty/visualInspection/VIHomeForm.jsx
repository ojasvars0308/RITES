import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/SubHeader'
import {EditOutlined, FileSearchOutlined, EyeOutlined, PieChartOutlined}from '@ant-design/icons';
import IconBtn from '../../../../components/IconBtn';
import { message, Checkbox } from 'antd';
import FormBody from '../../../../components/FormBody';
import FormInputItem from '../../../../components/FormInputItem';
import Btn from '../../../../components/Btn';
import TabList from '../../../../components/TabList';
import { useNavigate } from 'react-router-dom'

const visualHomeTabs = [
  {
    title: 'Visual Inspection',
    icon: <EyeOutlined />,
    link: "/visual/inspection"
  },
  {
    title: 'Shift Inspection Summary',
    icon: <FileSearchOutlined />,
    link: "/visual/shiftSummary"
  },
  {
    title: 'Test Sample Marking',
    icon: <PieChartOutlined />,
    link: "/stage/testSample/list"
  },
]

const checkBoxItems = [
  { "key": 1, "value": "Mark right if other IEs confirmation are done" },
]

const VIHomeForm = () => {
  const [remarks, setRemarks] = useState('')
  const [shiftDetails, setShiftDetails] = useState(null);
  const [checkedValues, setCheckedValues] = useState([])

  const navigate = useNavigate()

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    navigate('/login')
  }

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

  return (
    <>
    <SubHeader title='Visual Inspection - Home' link='/viShiftStart' />
      {
        shiftDetails &&
          <section className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 relative border p-1 border-gray-500 rounded-sm">
          <h3>Date: {shiftDetails[0].date}</h3>
          <h3>Shift: {shiftDetails[0].shift}</h3>
          <h3>Mill: {shiftDetails[0].mill}</h3>
          <h3>Rail Grade: {shiftDetails[0].railGrade}</h3>
          <h3>Line: {shiftDetails[0].lineNumber}</h3>
          <h3>Rail Sec.: {shiftDetails[0].railSection}</h3>
          <h3>Length: {shiftDetails[0].railLength}</h3>
          <div className='absolute top-0 right-0'>
            <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
          </div>
        </section>
      }

      <section>
        <TabList tabList={visualHomeTabs} />
      </section>

      <section>
        <FormBody
          initialValues={remarks}
          onFinish={handleFormSubmit}
        >
          <section>
            <Checkbox.Group
              options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
              value={checkedValues}
              onChange={(checkedValues) => setCheckedValues(checkedValues)}
              className='checkbox-group mb-6'
              />
          </section>

          <FormInputItem placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks' required/>
          <Btn htmlType='submit'>End Duty</Btn>
        </FormBody>
      </section>
      
    </>
  )
}

export default VIHomeForm