import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import IconBtn from '../../../../../components/DKG_IconBtn';
import { EditOutlined }from '@ant-design/icons';
import { message } from 'antd';
import TabList from '../../../../../components/DKG_TabList';
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';
import ndtHomeTabs from '../../../../../utils/frontSharedData/NDTHome';
import { useNavigate } from 'react-router-dom'
import configData from '../../../../../utils/configureData/fetchData.json'

const NDTHomeForm = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

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

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    navigate('/dashboard')
  }

  return (
    <>
      <SubHeader title='NDT - Home' link='/ndt/dutyStart' />
      {
        shiftDetails &&
          <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] mt-4">
            <h3>Date: {shiftDetails[1].formData.date}</h3>
            <h3>Shift: {shiftDetails[1].formData.shift}</h3>
            <h3>Mill: {shiftDetails[1].formData.mill}</h3>
            <h3>NDT: {shiftDetails[1].formData.ndt}</h3>
            <h3>Rail Grade: {shiftDetails[1].formData.railGrade}</h3>
            <h3>Rail Section: {shiftDetails[1].formData.railSection}</h3>
            <div className='absolute top-0 right-0'>
              <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
            </div>
          </section>
      }

      <section className='mb-4'>
        <TabList tabList={ndtHomeTabs} />
      </section>

      <hr />

      <section>
        <FormBody
          initialValues={remarks}
          onFinish={handleFormSubmit}
        >
          <FormInputItem label='Shift Remarks' placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks' required/>
          <div className='flex justify-center'>
            <Btn htmlType='submit' className='w-36'>End Duty</Btn>
          </div>
        </FormBody>
      </section>
    </>
  )
}

export default NDTHomeForm