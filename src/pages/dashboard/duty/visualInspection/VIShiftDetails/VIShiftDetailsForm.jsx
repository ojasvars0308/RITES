import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import FormBody from '../../../../../components/DKG_FormBody'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import FormInputItem from '../../../../../components/DKG_FormInputItem'
import Btn from '../../../../../components/DKG_Btn'
import { message } from 'antd'
import SelectSearch from '../../../../../components/DKG_SelectSearch'
import { useNavigate } from 'react-router-dom'
import data from '../../../../../utils/frontSharedData/visualInspection.json'
import configData from '../../../../../utils/configureData/fetchData.json'

const { millMaping: sampleData, millsMaping: secSampleData, shiftDropdownList, railGradeList, railSectionList } = data;

const VIShiftDetailsForm = () => {
  const [millDropdownList, setMillDropdownList] = useState([])
  const [lineNumberDropdownList, setLineNumberDropdownList] = useState([])
  const [stdRailLengthList, setStdRailLengthList] = useState([])

  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      date: '', shift: '', mill: '', lineNumber: '', railGrade: '', railSection: '', stdRailLength: '', otherIE: '', rclIE: ''
    }
  );

  const populateData = () => {
    const millDropdownList = Object.keys(sampleData).map( mill => {
      return {
        key: mill,
        value: mill
      }
    })
    setMillDropdownList([...millDropdownList])
  }

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  useEffect(()=> {
    populateData()
  }, [])

  useEffect(()=>{
    if(sampleData[formData.mill]){
      const lineNumberDropdownList = sampleData[formData.mill].map(mill => {
        return {
          key: mill,
          value: mill
        }
      })
      setLineNumberDropdownList([...lineNumberDropdownList])
    }
  }, [formData.mill, millDropdownList])

  useEffect(()=>{
    if(secSampleData[formData.mill]){
      const stdRailLengthList = secSampleData[formData.mill].map(mill => {
        return {
          key: mill,
          value: mill
        }
      })
      setStdRailLengthList([...stdRailLengthList])
    }
  }, [formData.mill, millDropdownList])

  const handleFormSubmit = () => {
    const shiftDetail = { formData };

    fetch(configData.JSON_SERVER_URL , {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shiftDetail)
    }).catch(error => console.error('Error fetching shift details:', error));

    message.success('Form Submit Called')
    navigate('/visual/home')
  }

  return (
    <>
      <div className='flex justify-center'>
        <SubHeader className='text-3xl font-semibold' title='Visual Inspection - Shift Details' link='/dashboard' />
      </div>
      
      <FormBody
        initialValues={formData}
        onFinish={handleFormSubmit}
      >
        <div className="grid grid-cols-2">
          <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange} required/>
          <FormDropdownItem label='Shift' dropdownArray={shiftDropdownList} name='shift' onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
        </div>

        <FormDropdownItem label='Mill' name='mill' dropdownArray={millDropdownList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
        <FormDropdownItem label ='Line Number' name='lineNumber' dropdownArray={lineNumberDropdownList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />

        <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required/>
        <FormDropdownItem label="Rail Section" name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
        <FormDropdownItem label="Std. offered Rail Length" name='stdRailLength' dropdownArray={stdRailLengthList} visibleField={'value'} valueField={'key'} onChange={handleChange} required />
        <SelectSearch label='Add Other IE' placeholder='Search a IE' name='otherIE' value={formData.otherIE} onChange={handleChange} className='w-full' required />
        <FormInputItem label='Add Name of RCL IE' name='rclIE' value={formData.rclIE} onChange={handleChange} required/>
        <div className='flex justify-center'>
          <Btn htmlType='submit' className='w-36'>Start Inspection</Btn>
        </div>
      </FormBody>
    </>
  )
}

export default VIShiftDetailsForm