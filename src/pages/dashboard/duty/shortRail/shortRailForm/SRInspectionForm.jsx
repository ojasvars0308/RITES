import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { useNavigate } from 'react-router-dom'
import configData from '../../../../../utils/configureData/fetchData.json'
import { EditOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { message } from 'antd';

const SRInspectionForm = () => {
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

  return (
    <>
      <SubHeader title='Short Rail Inspection - Form' link='/shortRail/home' />

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
    </>
  )
}

export default SRInspectionForm