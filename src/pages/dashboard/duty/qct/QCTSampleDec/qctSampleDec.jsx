import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import configData from '../../../../../utils/configureData/fetchData.json'
import { message, Table, Divider } from 'antd';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { EditOutlined }from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FormBody from '../../../../../components/DKG_FormBody'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import FormInputItem from '../../../../../components/DKG_FormInputItem'
import Btn from '../../../../../components/DKG_Btn'
import data from '../../../../../utils/frontSharedData/qctSample.json'
import DKG_InteractionTable from '../../../../../components/DKG_QCTSampleDecTable';

const { millDropdownList, railSectionList, railGradeList, qctList } = data;

const QctSampleDec = () => {
  const [shiftDetails, setShiftDetails] = useState(null); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      mill: '', railSection: '', railGrade: '', date: '', qct: '', numberSamples: '', remarks: ''
    }
  );

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  };

  const handleFormSubmit = () => {
    const shiftDetail = { formData };

    fetch(configData.JSON_SERVER_URL , {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shiftDetail)
    }).catch(error => console.error('Error fetching shift details:', error));

    message.success('Form Submit Called')
    navigate('/qct/samples')
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
    <>
      <SubHeader title='QCT - Sample Declaration' link='/qct/samples' />

      {
        shiftDetails &&
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 relative border p-1 border-gray-500 rounded-sm">
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
        <section className='w-[87%]'>
          <div className="grid grid-cols-2">
            <FormDropdownItem label='Mill' name='mill' dropdownArray={millDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
            <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
          </div>

          <div className="grid grid-cols-2">
            <FormDropdownItem label='Rail Grade' name='railGrade' dropdownArray={railGradeList} onChange={handleChange} valueField='key' visibleField='value' required/>
            <CustomDatePicker label='Date' name='date' value={formData?.date} onChange={handleChange} className='ml-2' />
          </div>

          <div className="grid grid-cols-2">
            <FormDropdownItem label='QCT' name='qct' dropdownArray={qctList} onChange={handleChange} valueField='key' visibleField='value' required/>
            <FormInputItem label='No. of Samples' name='numberSamples' value={formData.numberSamples} onChange={handleChange} className='ml-2' required/>
          </div>

          <hr />

          <div>
            <Divider>Samples Declared for Testing</Divider>

            <DKG_InteractionTable />
          </div>

          <hr />

          <div className='mt-4'>
            <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} className='w-[40%]' required/>
          </div>

          <hr />

          <div className='flex justify-center mt-6'>
            <Btn htmlType='submit' className='w-36'>Save</Btn>
          </div>
        </section>
      </FormBody>
    </>
  )
}

export default QctSampleDec