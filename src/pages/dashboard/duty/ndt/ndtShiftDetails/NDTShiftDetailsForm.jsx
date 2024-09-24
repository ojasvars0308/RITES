import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import FormBody from '../../../../../components/DKG_FormBody'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import data from '../../../../../utils/frontSharedData/NDT.json'
import Btn from '../../../../../components/DKG_Btn'
import configData from '../../../../../utils/configureData/fetchData.json'

const { millMaping: sampleData, shiftDropdownList, railGradeList, railSectionList } = data;

const NDTShiftDetailsForm = () => {
    const [millDropdownList, setMillDropdownList] = useState([])
    const [ndtDropdownList, setNdtDropdownList] = useState([])
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            date: '', shift: '', mill: '', ndt: '', railGrade: '', railSection: '',
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

    useEffect(()=> {
        populateData()
    }, [])

    useEffect(()=>{
        if(sampleData[formData.mill]){
          const ndtDropdownList = sampleData[formData.mill].map(mill => {
            return {
              key: mill,
              value: mill
            }
          })
          setNdtDropdownList([...ndtDropdownList])
        }
    }, [formData.mill, millDropdownList])

    const handleFormSubmit = () => {
        navigate('/ndt/home')
        const shiftDetail = { formData };

        fetch(configData.JSON_SERVER_URL , {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shiftDetail)
        }).catch(error => console.error('Error fetching shift details:', error));
    
        message.success('Form Submit Called')
      }

      const handleChange = (fieldName, value) => {
        setFormData(prev => {
          return {
            ...prev,
            [fieldName]: value
          }
        })
      }

  return (
    <>
        <SubHeader title='NDT - Shift Details' link='/dashboard' />

        <FormBody
            initialValues={formData}
            onFinish={handleFormSubmit}
        >
            <div className="grid grid-cols-2">
                <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange} required/>
                <FormDropdownItem label='Shift' name='shift' dropdownArray={shiftDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-4' required/>
            </div>

            <FormDropdownItem label='Mill' name='mill' dropdownArray={millDropdownList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
            <FormDropdownItem label ='NDT' name='ndt' dropdownArray={ndtDropdownList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />
            <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required/>
            <FormDropdownItem label="Rail Section" name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />

            <div className='flex justify-center'>
              <Btn htmlType='submit' className='w-36'>Start Duty</Btn>
            </div>
        </FormBody>
    </>
  )
}

export default NDTShiftDetailsForm