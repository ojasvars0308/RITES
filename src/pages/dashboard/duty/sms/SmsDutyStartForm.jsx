import React, { useState } from 'react'
import SubHeader from '../../../../components/SubHeader'
import CustomDatePicker from '../../../../components/CustomDatePicker'
import FormBody from '../../../../components/FormBody'
import FormDropdownItem from '../../../../components/FormDropdownItem'
import FormInputItem from '../../../../components/FormInputItem'
import Btn from '../../../../components/Btn'
import moment from 'moment'
import { message } from 'antd'

const shiftDropdownList = [
  {
    key: 'A',
    value: 'A'
  },
  {
    key: 'B',
    value: 'B'
  },
  {
    key: 'C',
    value: 'C'
  },
]
const smsList = [
  {
    key: 'SMS 2',
    value: 'SMS 2'
  },
  {
    key: 'SMS 3',
    value: 'SMS 3'
  },
]

const railGradeList = [
  {
    key: 'R260',
    value: 'R260'
  },
  {
    key: '880',
    value: '880'
  },
  {
    key: '1175HT',
    value: '1175HT'
  },
  {
    key: '1080HH',
    value: '1080HH'
  },
]
const SmsDutyStartForm = () => {
  const [formData, setFormData] = useState(
    {
      date: '',
      shift: '',
      sms: '',
      railGrade: ''
    }
  )
  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = () => {
    console.log("FORM SUBMIT CALLED")
    message.success('Form Submit Called')
  }
  return (
    <>
    <SubHeader title='SMS - Duty Start' link='/' />
    <FormBody
      initialValues={formData}
      onFinish={handleFormSubmit}
    >
      <div className="grid grid-cols-2">
      <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange}/>
      <FormDropdownItem label='Shift' dropdownArray={shiftDropdownList} name='shift' onChange={handleChange} valueField='key' visibleField='value' />
      </div>
      <FormDropdownItem label="SMS" name='sms' dropdownArray={smsList} visibleField='value' valueField='key' onChange={handleChange} />
      <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} />
      <Btn htmlType='submit'>Submit</Btn>
    </FormBody>
      
    </>
  )
}

export default SmsDutyStartForm
