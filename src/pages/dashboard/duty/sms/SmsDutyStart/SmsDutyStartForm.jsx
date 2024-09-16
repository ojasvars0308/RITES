import React, { useCallback, useEffect, useState } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import FormBody from '../../../../../components/DKG_FormBody'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import Btn from '../../../../../components/DKG_Btn'
import { message } from 'antd'
import data from '../../../../../utils/db.json'
import { useNavigate } from 'react-router-dom'
import sampledata from '../../../../../utils/frontSharedData/visualInspection.json'

const { railGradeList } = sampledata;

const SmsDutyStartForm = () => {
  const [shiftList, setShiftList] = useState([]);
  const [smsList, setSmsList] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      date: '', shift: '', sms: '', railGrade: ''
    }
  )

  const populateShiftSmsList = useCallback(() => {
    setShiftList([...data.shiftList])
    setSmsList([...data.smsList])
  }, [])

  useEffect(() => {
    populateShiftSmsList()
  }, [populateShiftSmsList])

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = () => {
    message.success('SMS duty start triggered.')
    navigate('/sms/dutyEnd')
  }
  return (
    <>
      <SubHeader title='SMS - Duty Start' link='/' />

      <FormBody
        initialValues={formData}
        onFinish={handleFormSubmit}
      >
        <div className="grid grid-cols-2">
          <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange} required />
          <FormDropdownItem label='Shift' dropdownArray={shiftList} name='shift' onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required />
        </div>
        
        <FormDropdownItem label="SMS" name='sms' dropdownArray={smsList} visibleField='value' valueField='key' onChange={handleChange} required />
        <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required />

        <hr />

        <div className='flex justify-center mt-6'>
          <Btn htmlType='submit' className='w-36'>Start Duty</Btn>
        </div>
      </FormBody>
    </>
  )
}

export default SmsDutyStartForm