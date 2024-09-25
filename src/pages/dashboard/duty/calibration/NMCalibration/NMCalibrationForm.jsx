import React, { useEffect, useState } from 'react'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import SubHeader from '../../../../../components/DKG_SubHeader'
import FormBody from '../../../../../components/DKG_FormBody'
import { message } from 'antd'
import FormInputItem from '../../../../../components/DKG_FormInputItem'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import Btn from '../../../../../components/DKG_Btn'
import IconBtn from '../../../../../components/DKG_IconBtn';
import { EditOutlined }from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import data from '../../../../../utils/frontSharedData/Calibration.json'
import configData from '../../../../../utils/configureData/fetchData.json'

const { instrumentMapping: sampleData, railSectionList, resultList } = data;

const NMCalibrationForm = () => {
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([])
  const [shiftDetails, setShiftDetails] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instrumentCategory: null, instrument: null,  instrumentDetail: '', railSection: null, serialNumber: '', calibrationDate: '', calibrationUptoDate: '',
  })

  const populateData = () => {
    const instrumentCategoryList = Object.keys(sampleData).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })
    setInstrumentCategoryList([...instrumentCategoryList])
  }

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = (e) => {
    message.success('Form Submit Called')
    navigate('/calibration/calibrationList');
  }

  useEffect(()=> {
    populateData()
  }, [])

  useEffect(()=>{
    if(sampleData[formData.instrumentCategory]){
      const instrumentList = sampleData[formData.instrumentCategory].map(inst => {
        return {
          key: inst,
          value: inst
        }
      })
      setInstrumentList([...instrumentList])
    }
  }, [formData.instrumentCategory, instrumentCategoryList])

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
        <SubHeader title='New / Modify Calibration Detail' link='/calibration/lists' />

        {shiftDetails && 
          <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-2 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] mt-4">
            <h3>Date: {shiftDetails[0].date}</h3>
            <h3>Shift: {shiftDetails[0].shift}</h3>
            <div className='absolute top-0 right-0'>
                <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
            </div>
          </section>
        }

        <FormBody
            initialValues={formData}
            onFinish={handleFormSubmit}
        >
          <div className='grid grid-cols-2'>
            <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
            <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange} className='ml-4' required />
          </div>

          <div className='grid grid-cols-2'>
            <FormInputItem label='Instrument Detail' name='instrumentDetail' placeholder='Enter Instrument Detail' value={formData?.instrumentDetail} onChange={handleChange} required />
            {
                (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
                <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} className='ml-4' required />
            }
          </div>

          <div className='grid grid-cols-2'>
            <FormInputItem label='Serial Number' name='serialNumber' placeholder='Enter S. No.' value={formData?.serialNumber} onChange={handleChange} required />
            <CustomDatePicker label='Calibration Date' name='calibrationDate' value={formData?.calibrationDate} onChange={handleChange} className='ml-4' required />
          </div>

          <div className='grid grid-cols-2'>
            <FormDropdownItem label ='Calibration Result' name='calibrationResult' dropdownArray={resultList} valueField='key' visibleField='value' onChange = {handleChange} required />
            <CustomDatePicker label='Cal. Valid upto Date' name='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} className='ml-4' required />
          </div>

          <div className='flex justify-center mt-4'>
            <Btn htmlType='submit'>Save</Btn>
          </div>
        </FormBody>
    </>
  )
}

export default NMCalibrationForm