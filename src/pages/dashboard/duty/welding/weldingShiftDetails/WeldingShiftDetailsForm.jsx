import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import FormBody from '../../../../../components/DKG_FormBody'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import Btn from '../../../../../components/DKG_Btn'
import data from '../../../../../utils/frontSharedData/Welding.json'
import configData from '../../../../../utils/configureData/fetchData.json'

const { millMaping: sampleData, shiftDropdownList, railGradeList, railSectionList } = data;

const WeldingShiftDetailsForm = () => {
    const [millDropdownList, setMillDropdownList] = useState([])
    const [weldingDropdownList, setWeldingDropdownList] = useState([])
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            date: '', shift: '', mill: '', weldingLine: '', railGrade: '', railSection: ''
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
          const weldingDropdownList = sampleData[formData.mill].map(mill => {
            return {
              key: mill,
              value: mill
            }
          })
          setWeldingDropdownList([...weldingDropdownList])
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
        navigate('/welding/home')
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
        <SubHeader title='Welding - Shift Details' link='/dashboard' />

        <FormBody
            initialValues={formData}
            onFinish={handleFormSubmit}
        >
            <div className="grid grid-cols-2">
                <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange} required/>
                <FormDropdownItem label='Shift' name='shift' dropdownArray={shiftDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-4' required/>
            </div>

            <FormDropdownItem label='Mill' name='mill' dropdownArray={millDropdownList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
            <FormDropdownItem label ='Welding Line' name='weldingLine' dropdownArray={weldingDropdownList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />
            <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required/>
            <FormDropdownItem label="Rail Section" name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />

            <Btn htmlType='submit' className='w-[40%] mt-2'>Start Duty</Btn>
        </FormBody>
    </>
  )
}

export default WeldingShiftDetailsForm