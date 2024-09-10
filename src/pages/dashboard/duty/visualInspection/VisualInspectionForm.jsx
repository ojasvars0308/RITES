import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/SubHeader'
import CustomDatePicker from '../../../../components/CustomDatePicker'
import {EditOutlined, PlusCircleOutlined, PlusOutlined }from '@ant-design/icons';
import IconBtn from '../../../../components/IconBtn';
import FormDropdownItem from '../../../../components/FormDropdownItem'
import { message, Checkbox } from 'antd';
import FormBody from '../../../../components/FormBody';
import FormInputItem from '../../../../components/FormInputItem';
import Btn from '../../../../components/Btn';
import { useNavigate } from 'react-router-dom'
import TextAreaComponent from '../../../../components/TextAreaComponent';
import InteractionTable from '../../../../components/InteractionTable';
import FileUploader from '../../../../components/FileUploader';

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

  const [defectCategoryDropdownList, setDefectCategoryDropdownList] = useState([])
  const [defectTypeDropdownList, setDefectTypeDropdownList] = useState([])

  const [acceptanceFields, setAcceptanceFields] = useState([0]);
  const [defectFields, setDefectFields] = useState([0]);

  const [fields, setFields] = useState([{ id: 1 }]);

  const addField = (type) => {
    if (type === 'acceptance') {
      setAcceptanceFields([...acceptanceFields, acceptanceFields.length]);
    } else {
      setDefectFields([...defectFields, defectFields.length]);
    }
  };

  // const removeField = (type, index) => {
  //   if (type === 'acceptance') {
  //     setAcceptanceFields(acceptanceFields.filter((_, i) => i !== index));
  //   } else {
  //     setDefectFields(defectFields.filter((_, i) => i !== index));
  //   }
  // };

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
      acceptedDataList: [
        {
          acceptedLength: '',
          number: '',
          railClass: '',
        }
      ],
      defectDataList: [
        {
          defectCategory: '',
          defectType: '',
          location: '',
          position: '',
        }
      ]
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

  const handleAddAcceptanceFields = () => {
    setFormData(prev => {
      return {
        ...prev,
        acceptedDataList: [
          ...prev.acceptedDataList,
          { acceptedLength: '', number: '', railClass: '' }
        ]
      }
    })
  };

  const handleAddDefectFields = () => {
    setFormData(prev => {
      return {
        ...prev,
        defectDataList: [
          ...prev.defectDataList,
          { defectCategory: '', defectType: '', location: '', position: '' }
        ]
      }
    })
  };
  
  const handleAcceptanceValueChange = (index, fieldName, value) => {
    setFormData(prev => {
      const prevAcceptedDataList = [...prev.acceptedDataList]
      prevAcceptedDataList[index][fieldName] = value
      return {
        ...prev, 
        acceptedDataList: [...prevAcceptedDataList]
      }
    })
  };

  const handleDefectValueChange = (index, fieldName, value) => {
    setFormData(prev => {
      const prevDefectDataList = [...prev.defectDataList]
      prevDefectDataList[index][fieldName] = value
      return {
        ...prev, 
        defectDataList: [...prevDefectDataList]
      }
    })
  };

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

  const navigate = useNavigate()

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    navigate('/visual/home')
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

                <div className='flex flex-wrap'>
                    <CustomDatePicker label='Date' name='date' value={formData.date} onChange={handleChange} required/>
                    <FormDropdownItem label='Shift' dropdownArray={shiftDropdownList} name='shift' onChange={handleChange} valueField='key' visibleField='value' className='mr-2 ml-2' required/>
                    <FormInputItem label='S. No.' name='serialNumber' value={formData.serialNumber} onChange={handleChange} defaultValue='001' minLength='3' maxLength='3' required/>
                </div>

                <div className='flex flex-wrap'>
                    <FormInputItem label='Heat Number' name='heatNumber' value={formData.serialNumber} onChange={handleChange} className='mr-2' required/>
                    <FormInputItem label='Heat Status' name='heatStatus' value={formData.heatStatus} onChange={handleChange} required/>
                </div>

                <div className='flex flex-wrap'>
                    <FormInputItem label='Actual Offered Length (m)' name='offeredLength' value={formData.offeredLength} onChange={handleChange} required/>
                </div>
            </section>

            <hr className='w-[78%]' />

            <section className='mt-4 mb-4'>
                <h3 className='mb-4 font-semibold'>Feed back from AI System for Dim. & Visual</h3>

                <div className='flex flex-wrap'>
                  <TextAreaComponent label='UT - ' name='feedback' value={formData.feedback} onChange={handleChange} rows='1' />
                </div>

                <div className='flex flex-wrap'>
                  <FormInputItem label='Dim - ' name='dim' value={formData.dim} onChange={handleChange}/>
                </div>

                <div className='flex flex-wrap'>
                  <FormInputItem label='Visual - ' name='visual' value={formData.visual} onChange={handleChange}/>
                </div>
                
                <div className='flex flex-wrap'>
                    <a href='#' className='text-blue-500 mt-6 underline mr-6'>Hyperlink to AI Photo</a>
                    <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to NDT Report</a>
                </div>
            </section>

            <hr className='w-[78%]' />

            <section className='mt-4 flex flex-wrap'>
                <Checkbox.Group
                    options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                    value={checkedValues}
                    onChange={(checkedValues) => setCheckedValues(checkedValues)}
                    className='checkbox-group mb-6 w-[80%]'
                />
            </section>

            <section>
                <h3 className='underline font-semibold'>
                    Add Acceptance Data
                </h3>
                {/* {shiftDetails[0].mill === 'URM' &&
                    <FormDropdownItem name='acceptedLength' dropdownArray={acceptedLengthUList} visibleField='value' valueField='key' onChange={handleChange} required/>
                }
                {shiftDetails[0].mill === 'RSM' &&
                    <FormDropdownItem name='acceptedLength' dropdownArray={acceptedLengthRList} visibleField='value' valueField='key' onChange={handleChange} required/>
                } */}
                {formData.acceptedDataList?.map((record, index) => (
                  <>
                    <div className='flex flex-wrap mt-4' key={index}>
                      <FormDropdownItem label='Acc. Length' placeholder='Select acceptance length' key={record.id} dropdownArray={acceptedLengthUList} name='acceptedLength' onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} valueField='key' visibleField='value' className='w-[30%] mr-2' required/>

                      <FormInputItem label='Number' name='numberOfItems' value={record?.numberOfItems} onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} className='w-[20%]' required/>

                      <FormDropdownItem label='Rail Class' dropdownArray={railClassList} name='railClass' key={record.id} onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} valueField='key' visibleField='value'  className='ml-2 w-[22%]' required/>
                    </div>
                  </>
                ))}

                <div className='mb-4'>
                  <IconBtn 
                      icon={PlusOutlined} 
                      text='Add More Acceptance Data' 
                      onClick={handleAddAcceptanceFields}
                  />
                </div>     
            </section>

            <hr className='w-[78%]' />

            <section>
                <h3 className='underline font-semibold mt-4'>
                    Add Defect Data
                </h3>

                {
                  formData.defectDataList?.map((record,index) => (
                    <>
                      <div className='flex flex-wrap mt-4' key={index}>
                        <FormDropdownItem label='Defect Cat.' name='defectCategory' dropdownArray={defectCategoryDropdownList} valueField={'key'} visibleField={'value'} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} className='w-[20%]' required />
                        <FormDropdownItem label='Defect Type' name='defectType' className='ml-2 mr-2' dropdownArray={defectTypeDropdownList} valueField={'key'} visibleField={'value'} onChange = {(fieldName, value) => handleDefectValueChange(index, fieldName, value)} />

                        <FormInputItem label='Location' name='location' value={record?.location} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} className='w-[15%]' required/>

                        <FormDropdownItem label='Position' dropdownArray={positionList} name='position' key={record.id} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} valueField='key' visibleField='value' className='ml-2' required/>
                      </div>
                    </>
                  ))
                }

                <div className='mb-4'>
                  <IconBtn 
                      icon={PlusOutlined} 
                      text='Add More Defect Data' 
                      onClick={handleAddDefectFields}
                  />
                </div> 
            </section>

            <hr className='w-[78%]' />

            <section className='mt-4'>
              <h3 className='font-semibold underline mb-4'>Rejection Details <span className='font-light ml-4'>min (std. off len , off. len) - acp. len.</span></h3>

              <div className='w-[78%]'>
                <InteractionTable />
              </div>
            </section>

            <hr className='w-[78%]' />

            <div className='flex flex-wrap mt-4'>
              <FormInputItem label='Remarks' placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks'/>

              <div className='mt-8 ml-4'>
                <FileUploader />
              </div>
            </div>

            <hr className='w-[78%]' />

            <div className='mt-8'>
              <Btn htmlType='submit' className='w-[50%]'>Save Inspection Data</Btn>
            </div>
        </FormBody>        
    </>
  )
}

export default VisualInspectionForm