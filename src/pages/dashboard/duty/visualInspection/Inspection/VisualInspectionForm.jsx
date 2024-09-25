import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import {EditOutlined, PlusOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import { message, Checkbox, Table } from 'antd';
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';
import { useNavigate } from 'react-router-dom'
import TextAreaComponent from '../../../../../components/DKG_TextAreaComponent';
import FileUploader from '../../../../../components/DKG_FileUploader';
import data from '../../../../../utils/frontSharedData/visualInspection.json'
import configData from '../../../../../utils/configureData/fetchData.json'

const { checkBoxItemSec, defectMapping: sampleData, shiftDropdownList, railClassList, positionList, acceptedLengthUList, rejectionDetailsColumns, rejectionDetailsData } = data;

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
    <div className='flex flex-col justify-center container'>
        <SubHeader title='Visual Inspection' link='/visual/home' />
      
        {
            shiftDetails &&
            <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] mt-4">
              <h3 className='font-bold'>Date: {shiftDetails[0].date}</h3>
              <h3 className='font-semibold'>Shift: {shiftDetails[0].shift}</h3>
              <h3 className='font-semibold'>Mill: {shiftDetails[0].mill}</h3>
              <h3 className='font-semibold'>Rail Grade: {shiftDetails[0].railGrade}</h3>
              <h3 className='font-semibold'>Line: {shiftDetails[0].lineNumber}</h3>
              <h3 className='font-semibold'>Rail Sec.: {shiftDetails[0].railSection}</h3>
              <h3 className='font-semibold'>Length: {shiftDetails[0].railLength}</h3>
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
                    <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} className='mr-2' required/>
                    <FormInputItem label='Heat Status' name='heatStatus' value={formData.heatStatus} onChange={handleChange} className='w-[44%]' required/>
                </div>

                <div className='flex flex-wrap'>
                    <FormInputItem label='Actual Offered Length' name='offeredLength' value={formData.offeredLength} onChange={handleChange} className='w-[46%]' required/>
                </div>
            </section>

            <hr className='w-full' />

            <section className='mt-4 mb-4'>
                <h3 className='mb-4 font-semibold'>Feedback from AI System for Dimensional & Visual</h3>

                <div className='flex flex-wrap'>
                  <TextAreaComponent label='UT - ' name='feedback' value={formData.feedback} onChange={handleChange} rows='1' />
                </div>

                <div className='flex flex-wrap'>
                  <FormInputItem label='Dim - ' name='dim' value={formData.dim} onChange={handleChange} className='w-[50%]' />
                </div>

                <div className='flex flex-wrap'>
                  <FormInputItem label='Visual - ' name='visual' value={formData.visual} onChange={handleChange} className='w-[50%]' />
                </div>
                
                <div className='flex justify-between flex-wrap'>
                    <a href='#' className='text-blue-500 mt-6 underline mr-6'>Hyperlink to AI Photo</a>
                    <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to NDT Report</a>
                </div>
            </section>

            <hr className='w-full' />

            <section className='mt-4 flex flex-wrap'>
                <Checkbox.Group
                    options={checkBoxItemSec.map(item => ({key: item.key, label: item.value, value: item.key }))}
                    value={checkedValues}
                    onChange={(checkedValues) => setCheckedValues(checkedValues)}
                    className='mb-6 w-[97%]'
                />
            </section>

            <hr className='w-full' />

            <section className='mt-4'>
                <h3 className='underline font-semibold'>
                    Add Acceptance Data
                </h3>

                {formData.acceptedDataList?.map((record, index) => (
                  <>
                    <div className='flex flex-wrap mt-4' key={index}>
                      <FormDropdownItem placeholder='Acc. length' key={record.id} dropdownArray={acceptedLengthUList} name='acceptedLength' onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} valueField='key' visibleField='value' className='w-[35%] mr-2' required/>

                      <FormInputItem placeholder='Number' name='numberOfItems' value={record?.numberOfItems} onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} className='w-[25%]' required/>

                      <FormDropdownItem placeholder='Rail Class' dropdownArray={railClassList} name='railClass' key={record.id} onChange={(fieldName, value) => handleAcceptanceValueChange(index, fieldName, value)} valueField='key' visibleField='value'  className='ml-2 w-[33%]' required/>
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

            <hr className='w-full' />

            <section>
                <h3 className='underline font-semibold mt-4'>
                    Add Defect Data
                </h3>

                {
                  formData.defectDataList?.map((record,index) => (
                    <>
                      <div className='flex flex-wrap mt-4' key={index}>
                        <FormDropdownItem placeholder='Defect category' name='defectCategory' dropdownArray={defectCategoryDropdownList} valueField={'key'} visibleField={'value'} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} className='w-[34%]' required />
                        <FormDropdownItem placeholder='Type' name='defectType' className='w-[27%] ml-2 mr-2' dropdownArray={defectTypeDropdownList} valueField={'key'} visibleField={'value'} onChange = {(fieldName, value) => handleDefectValueChange(index, fieldName, value)} required />

                        <FormInputItem placeholder='Location' name='location' value={record?.location} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} className='w-[32%]' required/>

                        <FormDropdownItem placeholder='Position' dropdownArray={positionList} name='position' key={record.id} onChange={(fieldName, value) => handleDefectValueChange(index, fieldName, value)} valueField='key' visibleField='value' className='w-[32%]' required/>
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

            <hr className='w-full' />

            <section className='mt-4'>
              <h3 className='font-semibold underline mb-4'>Rejection Details</h3>

              <div>
                <Table 
                  dataSource={rejectionDetailsData} 
                  columns={rejectionDetailsColumns} 
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                  }}
                />
              </div>
            </section>

            <hr className='w-full' />

            <div className='flex flex-wrap mt-4 mb-2'>
              <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} className='w-[54%]' required/>

              <div className='mt-8 ml-4'>
                <FileUploader />
              </div>
            </div>

            <hr className='w-full' />

            <div className='flex justify-center mt-8'>
              <Btn htmlType='submit'>Save Inspection Data</Btn>
            </div>
        </FormBody>        
    </div>
  )
}

export default VisualInspectionForm