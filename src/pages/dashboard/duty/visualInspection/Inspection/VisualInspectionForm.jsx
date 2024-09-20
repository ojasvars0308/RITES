import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import {EditOutlined, PlusOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import { message, Checkbox } from 'antd';
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';
import { useNavigate } from 'react-router-dom'
import TextAreaComponent from '../../../../../components/DKG_TextAreaComponent';
import InteractionTable from '../../../../../components/DKG_InteractionTable';
import FileUploader from '../../../../../components/DKG_FileUploader';
import data from '../../../../../utils/frontSharedData/visualInspection.json'
import configData from '../../../../../utils/configureData/fetchData.json'

const { checkBoxItemSec, defectMapping: sampleData, shiftDropdownList, railClassList, positionList, acceptedLengthUList } = data;

const VisualInspectionForm = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
  const [checkedValues, setCheckedValues] = useState([]);

  const [defectCategoryDropdownList, setDefectCategoryDropdownList] = useState([])
  const [defectTypeDropdownList, setDefectTypeDropdownList] = useState([])

  const navigate = useNavigate()

  const [formData, setFormData] = useState(
    {
      date: new Date(), shift: 'A', serialNumber: '001', heatNumber: '', heatStatus: '', offeredLength: '', feedback: '', dim: '', visual: '', remarks: '',
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
    const defectCategoryDropdownList = Object.keys(sampleData).map( defect => {
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

    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  };

  useEffect(()=> {
    populateData()
  }, [])

  useEffect(()=>{
    if(sampleData[formData.defectCategory]){
      const defectTypeDropdownList = sampleData[formData.defectCategory].map(defect => {
        return {
          key: defect,
          value: defect
        }
      })
      setDefectTypeDropdownList([...defectTypeDropdownList])
    }
  }, [formData.defectCategory, defectCategoryDropdownList])

  const handleFormSubmit = () => {
    // const shiftDetail = { formData };

    // fetch(configData.JSON_SERVER_URL , {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(shiftDetail)
    // }).catch(error => console.error('Error fetching shift details:', error));

    message.success("Duty End Called")
    navigate('/visual/home')
  }

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
    <div className='flex flex-col justify-center w-[410px]'>
        <SubHeader title='Visual Inspection' link='/visual/home' />
      
        {
            shiftDetails &&
            <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-4 shadow-[15px_15px_30px_-15px_rgba(0,0,0,0.2)]">
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
                {/* hardcoded */}
                <h3 className='mb-4 font-semibold'>Rail ID - U110324B034</h3>

                <div className='flex flex-wrap'>
                    <CustomDatePicker label='Date' name='date' value={formData.date} onChange={handleChange} required/>
                    <FormDropdownItem label='Shift' dropdownArray={shiftDropdownList} name='shift' onChange={handleChange} valueField='key' visibleField='value' className='mr-2 ml-2 w-32' required/>
                    <FormInputItem label='S. No.' name='serialNumber' value={formData.serialNumber} onChange={handleChange} defaultValue='001' minLength='3' maxLength='3' className='w-28' required/>
                </div>

                <div className='flex flex-wrap'>
                    <FormInputItem label='Heat Number' name='heatNumber' value={formData.serialNumber} onChange={handleChange} className='mr-2' required/>
                    <FormInputItem label='Heat Status' name='heatStatus' value={formData.heatStatus} onChange={handleChange} required/>
                </div>

                <div className='flex flex-wrap'>
                    <FormInputItem label='Actual Offered Length' name='offeredLength' value={formData.offeredLength} onChange={handleChange} className='w-[37%]' required/>
                </div>
            </section>

            <hr className='w-[77%]' />

            <section className='mt-4 mb-4'>
                <h3 className='mb-4 font-semibold'>Feedback from AI System for Dimensional & Visual</h3>

                <div className='flex flex-wrap'>
                  <TextAreaComponent label='UT - ' name='feedback' value={formData.feedback} onChange={handleChange} rows='1' />
                </div>

                <div className='flex flex-wrap'>
                  <FormInputItem label='Dim - ' name='dim' value={formData.dim} onChange={handleChange} className='w-[38%]' />
                </div>

                <div className='flex flex-wrap'>
                  <FormInputItem label='Visual - ' name='visual' value={formData.visual} onChange={handleChange} className='w-[38%]' />
                </div>
                
                <div className='flex flex-wrap'>
                    <a href='#' className='text-blue-500 mt-6 underline mr-6'>Hyperlink to AI Photo</a>
                    <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to NDT Report</a>
                </div>
            </section>

            <hr className='w-[77%]' />

            <section className='mt-4 flex flex-wrap'>
                <Checkbox.Group
                    options={checkBoxItemSec.map(item => ({key: item.key, label: item.value, value: item.key }))}
                    value={checkedValues}
                    onChange={(checkedValues) => setCheckedValues(checkedValues)}
                    className='mb-6 w-[78%]'
                />
            </section>

            <hr className='w-[77%]' />

            <section className='mt-4'>
                <h3 className='underline font-semibold'>
                    Add Acceptance Data
                </h3>

                {formData.acceptedDataList?.map((record, index) => (
                  <>
                    <div className='flex flex-wrap mt-4' key={index}>
                      <FormDropdownItem label='Acc. Length' key={record.id} dropdownArray={acceptedLengthUList} name='acceptedLength' onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} valueField='key' visibleField='value' className='w-[33%] mr-2' required/>

                      <FormInputItem label='Number' name='numberOfItems' value={record?.numberOfItems} onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} className='w-[18%]' required/>

                      <FormDropdownItem label='Rail Class' dropdownArray={railClassList} name='railClass' key={record.id} onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} valueField='key' visibleField='value'  className='ml-2 w-[22%]' required/>
                    </div>
                  </>
                ))}

                <div className='mt-3 mb-4'>
                  <IconBtn 
                      icon={PlusOutlined} 
                      text='Add More Acceptance Data' 
                      onClick={handleAddAcceptanceFields}
                  />
                </div>     
            </section>

            <hr className='w-[77%]' />

            <section>
                <h3 className='underline font-semibold mt-4'>
                    Add Defect Data
                </h3>

                {
                  formData.defectDataList?.map((record,index) => (
                    <>
                      <div className='flex flex-wrap mt-4' key={index}>
                        <FormDropdownItem label='Defect Cat.' name='defectCategory' dropdownArray={defectCategoryDropdownList} valueField={'key'} visibleField={'value'} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} className='w-[22%]' required />
                        <FormDropdownItem label='Defect Type' name='defectType' className='ml-2 mr-2' dropdownArray={defectTypeDropdownList} valueField={'key'} visibleField={'value'} onChange = {(fieldName, value) => handleDefectValueChange(index, fieldName, value)} required />

                        <FormInputItem label='Location' name='location' value={record?.location} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} className='w-[15%]' required/>

                        <FormDropdownItem label='Position' dropdownArray={positionList} name='position' key={record.id} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} valueField='key' visibleField='value' className='ml-2' required/>
                      </div>
                    </>
                  ))
                }

                <div className='mt-3 mb-4'>
                  <IconBtn 
                      icon={PlusOutlined} 
                      text='Add More Defect Data' 
                      onClick={handleAddDefectFields}
                  />
                </div> 
            </section>

            <hr className='w-[77%]' />

            <section className='mt-4'>
              <h3 className='font-semibold underline mb-4'>Rejection Details</h3>

              <div className='w-[78%]'>
                <InteractionTable />
              </div>
            </section>

            <hr className='w-[77%]' />

            <div className='flex flex-wrap mt-4 mb-2'>
              <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} className='w-[40%]' required/>

              <div className='mt-8 ml-4'>
                <FileUploader />
              </div>
            </div>

            <hr className='w-[77%]' />

            <div className='flex justify-center mr-32 mt-8'>
              <Btn htmlType='submit'>Save Inspection Data</Btn>
            </div>
        </FormBody>        
    </div>
  )
}

export default VisualInspectionForm