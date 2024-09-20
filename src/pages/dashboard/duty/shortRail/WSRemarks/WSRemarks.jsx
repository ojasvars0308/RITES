import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { useNavigate } from 'react-router-dom'
import configData from '../../../../../utils/configureData/fetchData.json'
import { EditOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { message } from 'antd';
import Btn from '../../../../../components/DKG_Btn';

const WSRemarks = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
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

  const handleClick = () => {
    message.success("Duty End Called")
    navigate('/shortRail/home')
  }

  return (
    <>
      <SubHeader title='Other Workstation Remarks' link='/shortRail/home' />

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

      <hr />

      <section>
        <h3>SMS 2: <span className='font-light'>Shift Remarks</span></h3>
        <h3 className='mt-3'>SMS 3: <span className='font-light'>Shift Remarks</span></h3>
        <h3 className='mt-3'>RSM Rolling Stage: <span className='font-light'>Shift Remarks</span></h3>
        <h3 className='mt-3'>URM Rolling Stage: <span className='font-light'>Shift Remarks</span></h3>
        <h3 className='mt-3'>NDT:
          <section className='mt-2 ml-10'>
            <h3>RSM - LR: <span className='font-light'>Shift Remarks</span></h3>
            <h3 className='mt-3'>RSM - SR: <span className='font-light'>Shift Remarks</span></h3>
            <h3 className='mt-3'>URM - NDT1: <span className='font-light'>Shift Remarks</span></h3>
            <h3 className='mt-3'>URM - NDT2: <span className='font-light'>Shift Remarks</span></h3>
          </section>
        </h3>

        <h3 className='mt-3'>Testing: <span className='font-light'>Shift Remarks</span></h3>

        <h3 className='mt-3'>Visual Inspection:
          <section className='mt-2 ml-10'>
            <h3>URM: <span className='font-light'>Shift Remarks</span></h3>
            <h3 className='mt-3'>RSM: <span className='font-light'>Shift Remarks</span></h3>
          </section>
        </h3>

        <h3 className='mt-3 mb-8'>Welding:
          <section className='mt-1 ml-10'>
            <h3>RSM: <span className='font-light'>Shift Remarks</span></h3>
            <h3 className='mt-2'>URM:
              <section className='mt-1 ml-10'>
                <h3>L3: <span className='font-light'>Shift Remarks</span></h3>
                <h3 className='mt-2'>L4: <span className='font-light'>Shift Remarks</span></h3>
                <h3 className='mt-2'>L5: <span className='font-light'>Shift Remarks</span></h3>
                <h3 className='mt-2'>L6: <span className='font-light'>Shift Remarks</span></h3>
              </section>
            </h3>
          </section>
        </h3>

        <hr />

        <div className='flex justify-center mt-4'>
          <Btn htmlType='submit' className='w-36' onClick={handleClick}>Ok</Btn>
        </div>
      </section>
    </>
  )
}

export default WSRemarks