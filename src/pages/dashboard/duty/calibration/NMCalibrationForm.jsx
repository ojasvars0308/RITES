import React, { useEffect, useState } from 'react'
import FormDropdownItem from '../../../../components/DKG_FormDropdownItem'
import SubHeader from '../../../../components/DKG_SubHeader'
import FormBody from '../../../../components/DKG_FormBody'
import { message } from 'antd'
import FormInputItem from '../../../../components/DKG_FormInputItem'
import CustomDatePicker from '../../../../components/DKG_CustomDatePicker'
import Btn from '../../../../components/DKG_Btn'
import { useNavigate } from 'react-router-dom';

const instrumentMapping = {
  'Measuring Instrument': ['Vernier', 'Micrometer', 'Feeler Gauge', 'Weighing Scale', 'Measuring Tape', 'Measuring Scale'],
  'Testing Machines': ['Hydris', 'Leco / Gas Analyser', 'Spectro', 'Tensile Testing Machine', 'Hardness', 'TLT Machine', 'FWT System', 'FBW M/C'],
  'Gauge (Working)': [ "Head & Web Gauge", "Height Gauge", "Fish Gauge", "Foot Gauge", "Asymmetry +", "Asymmetry -", "Toe Thk +", "Toe Thk -", "Crown (F)", "Crown (M)", "Foot Concavity", "Hole - Base", "Hole - End", "Right Angle", "FWT Bearer Head", "FWT Striker Head" ],
  'Gauge (Master)': [],
  'Straight Edge': ["3m","2m","1.5m","1m","0.85m","100mm"],
  'Templates': ['FWT Bearer Head', 'FWT Striker Head']
}

const railSectionList = [
    {
      key: '60 E1 - Prime',
      value: '60 E1 - Prime'
    },
    {
      key: '60 E1 - IU',
      value: '60 E1 - IU'
    },
    {
      key: 'IRS 52 - Prime',
      value: 'IRS 52 - Prime'
    },
    {
        key: 'IRS 52 - IU',
        value: 'IRS 52 - IU'
    },
    {
        key: '60E1A1 - Prime',
        value: '60E1A1 - Prime'
    },
    {
        key: '60E1A1 - IU',
        value: '60E1A1 - IU'
    },
    {
        key: 'NA',
        value: 'NA'
    },
  ]

  const resultList = [
    {
      key: 'OK',
      value: 'OK'
    },
    {
      key: 'Not OK',
      value: 'Not OK'
    },
    {
      key: 'Discarded',
      value: 'Discarded'
    }
  ]

const NMCalibrationForm = () => {
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([])
  const [shiftDetails, setShiftDetails] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instrumentCategory: null,
    instrument: null, 
    instrumentDetail: '',
    railSection: null,
    serialNumber: '',
    calibrationDate: new Date(),
    calibrationUptoDate: '',
  })

  const populateData = () => {
    const instrumentCategoryList = Object.keys(instrumentMapping).map(inst => {
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
    console.log("FORM SUBMIT CALLED")
    message.success('Form Submit Called')
  }

  useEffect(()=> {
    populateData()
  }, [])

  useEffect(()=>{
    if(instrumentMapping[formData.instrumentCategory]){
      const instrumentList = instrumentMapping[formData.instrumentCategory].map(inst => {
        return {
          key: inst,
          value: inst
        }
      })
      setInstrumentList([...instrumentList])
    }
  }, [formData.instrumentCategory, instrumentCategoryList])

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/calibrationList');
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
        <SubHeader title='New / Modify Calibration Detail' link='/calibrationList' />

        <div className='flex mt-2'>
            {shiftDetails && 
                <div className='flex flex-wrap mb-4'>
                    <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{shiftDetails[0].date}</span></h6>
                    <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{shiftDetails[0].shift}</span></h6>
                </div>
            }
        </div>

        <div className='w-full border border-black-1 mb-4'/>

        <FormBody
            initialValues={formData}
            onFinish={handleFormSubmit}
        >
            <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
            <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />
            <FormInputItem label='Instrument Detail' name='instrumentDetail' placeholder='Enter Instrument Detail' value={formData?.instrumentDetail} onChange={handleChange} required />
            {
                (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
                <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
            }
            <FormInputItem label='Serial Number' name='serialNumber' placeholder='Enter S. No.' value={formData?.serialNumber} onChange={handleChange} required />
            <CustomDatePicker label='Calibration Date' name='calibrationDate' value={formData?.calibrationDate} onChange={handleChange} required />
            <FormDropdownItem label ='Calibration Result' name='calibrationResult' dropdownArray={resultList} valueField='key' visibleField='value' onChange = {handleChange} required />
            <CustomDatePicker label='Calibration Valid upto Date' name='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} required />
            <Btn htmlType='submit' onClick={handleClick}>Save</Btn>
        </FormBody>
    </>
  )
}

export default NMCalibrationForm