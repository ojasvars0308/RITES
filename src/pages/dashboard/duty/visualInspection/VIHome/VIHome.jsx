import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { EditOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { message, Checkbox } from 'antd';
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';
import TabList from '../../../../../components/DKG_TabList';
import { useNavigate } from 'react-router-dom'
import visualHomeTabs from '../../../../../utils/frontSharedData/VIHome';
import data from '../../../../../utils/frontSharedData/visualInspection.json'
import configData from '../../../../../utils/configureData/fetchData.json'

const { checkBoxItem } = data;

const VIHomeForm = () => {
  const [remarks, setRemarks] = useState('')
  const [shiftDetails, setShiftDetails] = useState(null);
  const [checkedValues, setCheckedValues] = useState([])

  const navigate = useNavigate()

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    navigate('/dashboard')
  }

  useEffect(() => {
    fetch(configData.JSON_SERVER_URL)
        .then(res => {
            return res.json()
        })
        .then((data) => {
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
              options={checkBoxItem.map(item => ({key: item.key, label: item.value, value: item.key }))}
              value={checkedValues}
              onChange={(checkedValues) => setCheckedValues(checkedValues)}
              className='mb-6'
              />
          </section>

          <FormInputItem placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks' required/>
          <div className='flex justify-center'>
            <Btn htmlType='submit' className='w-36'>End Duty</Btn>
          </div>
        </FormBody>
      </section>
    </>
  )
}

export default VIHomeForm