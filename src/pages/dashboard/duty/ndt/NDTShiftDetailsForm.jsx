import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import FormBody from '../../../../components/DKG_FormBody'
import FormDropdownItem from '../../../../components/DKG_FormDropdownItem'
import CustomDatePicker from '../../../../components/DKG_CustomDatePicker'
import Btn from '../../../../components/DKG_Btn'

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

const millMapping = {
    'URM': ['NDT 1', 'NDT 2'],
    'RSM': ['LR', 'SR'],
}

const railGradeList = [
    {
      key: 'R260',
      value: 'R260'
    },
    {
      key: '350HT',
      value: 'R260'
    },
    {
      key: '1080HH',
      value: '1080HH'
    },
    {
      key: '880',
      value: '880'
    },
    {
      key: '880NC',
      value: '880NC'
    },
]
  
const railSectionList = [
    {
      key: '60E1',
      value: '60E1'
    },
    {
      key: 'IRS 52',
      value: 'IRS 52'
    },
    {
      key: 'UIC 60',
      value: 'UIC 60'
    },
    {
      key: '60E1A1',
      value: '60E1A1'
    },
    {
      key: '136RE',
      value: '136RE'
    },
]

const NDTShiftDetailsForm = () => {
    const [millDropdownList, setMillDropdownList] = useState([])
    const [ndtDropdownList, setNdtDropdownList] = useState([])

    const [formData, setFormData] = useState(
        {
            date: '',
            shift: '',
            mill: '',
            ndt: '',
            railGrade: '',
            railSection: '',
        }
    );

    const navigate = useNavigate()

    const populateData = () => {
        const millDropdownList = Object.keys(millMapping).map( mill => {
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
        if(millMapping[formData.mill]){
          const ndtDropdownList = millMapping[formData.mill].map(mill => {
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
    
        fetch('http://localhost:8000/shiftDetails', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shiftDetail)
        }).then(() => {
            console.log('new shift details added');
        })
    
        console.log("FORM SUBMIT CALLED")
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

            <Btn htmlType='submit' className='w-[40%]'>Start Duty</Btn>
        </FormBody>
    </>
  )
}

export default NDTShiftDetailsForm