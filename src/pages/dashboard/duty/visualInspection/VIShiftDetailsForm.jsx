import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/SubHeader'
import CustomDatePicker from '../../../../components/CustomDatePicker'
import FormBody from '../../../../components/FormBody'
import FormDropdownItem from '../../../../components/FormDropdownItem'
import FormInputItem from '../../../../components/FormInputItem'
import Btn from '../../../../components/Btn'
import { message } from 'antd'

const millMapping = {
  'URM': ['1', '2', '3', '4', '5', '6'],
  'RSM': ['1', '2'],
}

const millsMapping = {
  'URM': ['130'],
  'RSM': ['78', '65']
}

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

const millDropdownList = [
  {
    key: 'URM',
    value: 'URM'
  },
  {
    key: 'RSM',
    value: 'RSM'
  },
]

const lineNumberDropdownList = [
  {
    key: '1',
    value: '1'
  },
  {
    key: '2',
    value: '2'
  },
  {
    key: '3',
    value: '3'
  },
  {
    key: '4',
    value: '4'
  },
  {
    key: '5',
    value: '5'
  },
  {
    key: '6',
    value: '6'
  },
]

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

const VIShiftDetailsForm = () => {
  const [lineNumbers, setLineNumbers] = useState([]);
  const [millDropdownList, setMillDropdownList] = useState([])
  const [lineNumberDropdownList, setLineNumberDropdownList] = useState([])
  const [stdRailLengthList, setStdRailLengthList] = useState([])

  const [formData, setFormData] = useState(
    {
      date: '',
      shift: '',
      mill: '',
      lineNumber: '',
      railGrade: '',
      railSection: '',
      stdRailLength: '',
      otherIE: '',
      rclIE: '',
    }
  )

  const populateData = () => {
    const millDropdownList = Object.keys(millMapping).map( mill => {
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
    if(millMapping[formData.mill]){
      const lineNumberDropdownList = millMapping[formData.mill].map(mill => {
        return {
          key: mill,
          value: mill
        }
      })
      setLineNumberDropdownList([...lineNumberDropdownList])
    }
  }, [formData.mill, millDropdownList])

  useEffect(()=>{
    if(millsMapping[formData.mill]){
      const stdRailLengthList = millsMapping[formData.mill].map(mill => {
        return {
          key: mill,
          value: mill
        }
      })
      setStdRailLengthList([...stdRailLengthList])
    }
  }, [formData.mill, millDropdownList])

  const handleFormSubmit = () => {
    console.log("FORM SUBMIT CALLED")
    message.success('Form Submit Called')
  }

  return (
    <>
      <SubHeader title='Visual Inspection - Shift Details' link='/' />
      <FormBody
        initialValues={formData}
        onFinish={handleFormSubmit}
      >
        <div className="grid grid-cols-2">
          <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange} required/>
          <FormDropdownItem label='Shift' dropdownArray={shiftDropdownList} name='shift' onChange={handleChange} valueField='key' visibleField='value' required/>
        </div>

        <FormDropdownItem label='Mill' name='mill' dropdownArray={millDropdownList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
        <FormDropdownItem label ='Line Number' name='lineNumber' dropdownArray={lineNumberDropdownList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />

        <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required/>
        <FormDropdownItem label="Rail Section" name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
        <FormDropdownItem label="Std. offered Rail Length" name='stdRailLength' dropdownArray={stdRailLengthList} visibleField={'value'} valueField={'key'} onChange={handleChange} required />
        <FormInputItem label='Add Other IE' name='otherIE' value={formData.otherIE} onChange={handleChange} required/>
        <Btn htmlType='submit'>Submit</Btn>
      </FormBody>
    </>
  )
}

export default VIShiftDetailsForm