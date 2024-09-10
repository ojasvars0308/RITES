import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/SubHeader'
import CustomDatePicker from '../../../../components/CustomDatePicker'
import {EditOutlined, PlusCircleOutlined }from '@ant-design/icons';
import IconBtn from '../../../../components/IconBtn';
import FormDropdownItem from '../../../../components/FormDropdownItem'
import { message, Checkbox } from 'antd';
import FormBody from '../../../../components/FormBody';
import FormInputItem from '../../../../components/FormInputItem';
import Btn from '../../../../components/Btn';
import { useNavigate } from 'react-router-dom'
import TextAreaComponent from '../../../../components/TextAreaComponent';

const checkBoxItems = [
  { "key": 1, "value": "Gauging & End Straightness Checked at both the ends" },
]

const defectMapping = {
    'Dimension': ['HH', 'LH', 'OHT', 'UHT', 'NF', 'WF', 'TF(+)', 'TF(-)', 'HF(+)', 'HF(-)', 'HS', 'LS', 'TNW', 'TKW', 'Asy(+)', 'Asy(-)', 'OL', 'SL', 'OS', 'FBC', 'FBCX', 'CP(+)', 'CP(-)', 'Other'],
    'Surface': ['NMI', 'MDF', 'MDM', 'LAP', 'GM', 'BR', 'Crack', 'BNT', 'CE', 'Other'],
    'Straightness': ['KK', 'TW', '-C -R/C', 'WY', 'NS', 'BE', 'US', 'DS', 'Other'],
    'Others': ['NHN', 'RM', 'UT', 'HNP', 'Other']
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

  const railClassList = [
    {
      key: 'A',
      value: 'A'
    },
    {
      key: 'A + 0.1',
      value: 'A + 0.1'
    },
  ]

  const positionList = [
    {
      key: 'Head',
      value: 'Head'
    },
    {
      key: 'Foot',
      value: 'Foot'
    },
    {
        key: 'WBS',
        value: 'WBS'
    },
    {
    key: 'WNBS',
    value: 'WNBS'
    },
  ]

  const acceptedLengthUList = [
    {
      key: '130',
      value: '130'
    },
    {
      key: '117',
      value: '117'
    },
    {
      key: '86.67',
      value: '86.67'
    },
    {
      key: '65',
      value: '65'
    },
    {
      key: '52',
      value: '52'
    },
    {
        key: '26',
        value: '26'
    },
    {
        key: '25',
        value: '25'
    },
    {
        key: '24',
        value: '24'
    },
    {
        key: '13',
        value: '13'
    },
    {
        key: '12',
        value: '12'
    },
    {
        key: '11',
        value: '11'
    },
    {
        key: '10',
        value: '10'
    },
  ]

  const acceptedLengthRList = [
    {
      key: '65',
      value: '65'
    },
    {
      key: '52',
      value: '52'
    },
    {
        key: '26',
        value: '26'
    },
    {
        key: '25',
        value: '25'
    },
    {
        key: '24',
        value: '24'
    },
    {
        key: '13',
        value: '13'
    },
    {
        key: '12',
        value: '12'
    },
    {
        key: '11',
        value: '11'
    },
    {
        key: '10',
        value: '10'
    },
  ]

const VisualInspectionForm = () => {
  const [remarks, setRemarks] = useState('')
  const [shiftDetails, setShiftDetails] = useState(null);
  const [checkedValues, setCheckedValues] = useState([]);
  const [formFieldsAcceptance, setFormFieldsAcceptance] = useState([
    { acceptedLength: '', number: '', railClass: '' },
  ]);

  const [defectCategoryDropdownList, setDefectCategoryDropdownList] = useState([])
  const [defectTypeDropdownList, setDefectTypeDropdownList] = useState([])

  const [fields, setFields] = useState([{ id: 1 }]);

  const addField = () => {
    setFields([...fields, { id: fields.length + 1 }]);
  };


  const [formData, setFormData] = useState(
    {
      date: new Date(),
      shift: 'A',
      serialNumber: '001',
      heatNumber: '',
      heatStatus: '',
      offeredLength: '',
      feedback: '',
      dim: '',
      visual: '',
      acceptedLength: '',
      number: '',
      railClass: '',
      defectCategory: '',
      defectType: '',
      location: '',
      position: ''
    }
  );

  const populateData = () => {
    const defectCategoryDropdownList = Object.keys(defectMapping).map( defect => {
      return {
        key: defect,
        value: defect
      }
    })
    setDefectCategoryDropdownList([...defectCategoryDropdownList])
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
    if(defectMapping[formData.defectCategory]){
      const defectTypeDropdownList = defectMapping[formData.defectCategory].map(defect => {
        return {
          key: defect,
          value: defect
        }
      })
      setDefectTypeDropdownList([...defectTypeDropdownList])
    }
  }, [formData.defectCategory, defectCategoryDropdownList])

  const handleAddAcceptanceFields = () => {
    setFormFieldsAcceptance([...formFieldsAcceptance, { acceptedLength: '', number: '', railClass: '' }]);
  };

  const navigate = useNavigate()

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    navigate('/login')
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
        <SubHeader title='Visual Inspection' link='/visual/home' />
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

        <hr />

        <FormBody
            initialValues={formData}
            onFinish={handleFormSubmit}
        >
            <section>
                <h3 className='mb-4 font-semibold'>Rail ID - U110324B034</h3>

                <div className='grid grid-cols-3'>
                    <CustomDatePicker label='Date' name='date' value={formData.date} onChange={handleChange} required/>
                    <FormDropdownItem label='Shift' dropdownArray={shiftDropdownList} name='shift' onChange={handleChange} valueField='key' visibleField='value' className='mr-2 ml-2' required/>
                    <FormInputItem label='S. No.' name='serialNumber' value={formData.serialNumber} onChange={handleChange} defaultValue='001' minLength='3' maxLength='3' required/>
                </div>

                <div className='grid grid-cols-2'>
                    <FormInputItem label='Heat Number' name='heatNumber' value={formData.serialNumber} onChange={handleChange} className='mr-2' required/>
                    <FormInputItem label='Heat Status' name='heatStatus' value={formData.heatStatus} onChange={handleChange} required/>
                </div>

                <div className='grid grid-cols-1'>
                    <FormInputItem label='Actual Offered Length (m)' name='offeredLength' value={formData.offeredLength} onChange={handleChange} required/>
                </div>
            </section>

            <hr />

            <section className='mt-4 mb-4'>
                <h3 className='mb-4 font-semibold'>Feed back from AI System for Dim. & Visual</h3>

                <TextAreaComponent label='UT - ' name='feedback' value={formData.feedback} onChange={handleChange} rows='1' />

                <FormInputItem label='Dim - ' name='dim' value={formData.dim} onChange={handleChange}/>
                <FormInputItem label='Visual - ' name='visual' value={formData.visual} onChange={handleChange}/>
                
                <div className='grid grid-cols-2'>
                    <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to AI Photo</a>
                    <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to NDT Report</a>
                </div>
            </section>

            <hr />

            <section className='mt-4'>
                <Checkbox.Group
                    options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                    value={checkedValues}
                    onChange={(checkedValues) => setCheckedValues(checkedValues)}
                    className='checkbox-group mb-6'
                />
            </section>

            <section>
                <h3 className='underline font-semibold'>
                    Add Acceptance Data
                </h3>

                <div className='grid grid-cols-3 mt-4'>
                    {/* {shiftDetails[0].mill === 'URM' &&
                        <FormDropdownItem name='acceptedLength' dropdownArray={acceptedLengthUList} visibleField='value' valueField='key' onChange={handleChange} required/>
                    }
                    {shiftDetails[0].mill === 'RSM' &&
                        <FormDropdownItem name='acceptedLength' dropdownArray={acceptedLengthRList} visibleField='value' valueField='key' onChange={handleChange} required/>
                    } */}
                    <FormDropdownItem label='Acc. Length' placeholder='Select acceptance length' key={fields.id} dropdownArray={acceptedLengthUList} name='acceptedLength' onChange={handleChange} defaultValue='130' valueField='key' visibleField='value' className='mr-2 ml-2' required/>

                    <FormInputItem label='Number' name='numberOfItems' defaultValue={fields.id} value={formData?.numberOfItems} onChange={handleChange} required/>

                    <FormDropdownItem label='Rail Class' dropdownArray={railClassList} name='railClass' key={fields.id} onChange={handleChange} valueField='key' visibleField='value' defaultValue='A' className='mr-2 ml-2' required/>
                </div>

                {/* <IconBtn 
                    icon={PlusOutlined} 
                    text='add new heat' 
                    className='absolute left-0 bottom-4'
                    onClick={handleAddAcceptanceFields}
                /> */}

                <Btn onClick={addField} icon={<PlusCircleOutlined />}>Add More Acceptance Data</Btn>
            </section>

            <hr />

            <section>
                <h3 className='underline font-semibold mt-4'>
                    Add Defect Data
                </h3>

                <div className='grid grid-cols-3 mt-4'>
                    <FormDropdownItem label='Defect Cat.' name='defectCategory' dropdownArray={defectCategoryDropdownList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
                    <FormDropdownItem label='Defect Type' name='defectType' className='ml-2 mr-2' dropdownArray={defectTypeDropdownList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />

                    <FormInputItem label='Location' name='location' defaultValue={fields.id} value={formData.location} onChange={handleChange} required/>

                    <FormDropdownItem label='Position' dropdownArray={positionList} name='position' key={fields.id} onChange={handleChange} valueField='key' visibleField='value' className='mr-2' required/>
                </div>

                <Btn onClick={addField} icon={<PlusCircleOutlined />}>Add More Defect Data</Btn>
            </section>

            <hr />

            <section>
                
            </section>

            <Btn htmlType='submit' >End Duty</Btn>
        </FormBody>        
    </>
  )
}

export default VisualInspectionForm