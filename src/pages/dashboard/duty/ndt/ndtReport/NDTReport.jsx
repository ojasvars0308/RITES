import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { EditOutlined }from '@ant-design/icons';
import { message, Divider } from 'antd';
import { Table } from "antd";
import IconBtn from '../../../../../components/DKG_IconBtn';
import data from "../../../../../utils/db.json";
import configData from '../../../../../utils/configureData/fetchData.json'
import { useNavigate } from 'react-router-dom'
import Btn from '../../../../../components/DKG_Btn';

const { ndtRailWiseData: sampleData, columns } = data;

const NDTReport = () => {
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
    navigate('/ndt/home')
  }

  return (
    <>
      <SubHeader title='NDT - Report' link='/ndt/home' />

      {
        shiftDetails &&
          <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] mt-4">
          <h3>Date: {shiftDetails[2].formData.date}</h3>
          <h3>Shift: {shiftDetails[2].formData.shift}</h3>
          <h3>Mill: {shiftDetails[2].formData.mill}</h3>
          <h3>NDT: {shiftDetails[2].formData.ndt}</h3>
          <h3>Rail Grade: {shiftDetails[2].formData.railGrade}</h3>
          <h3>Rail Section: {shiftDetails[2].formData.railSection}</h3>
          <div className='absolute top-0 right-0'>
            <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
          </div>
        </section>
      }

      <Divider>Rail Wise Record</Divider>

      <section>
        <Table
          dataSource={sampleData}
          columns={columns}
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </section>

      <div className='flex justify-center mt-4'>
        <Btn htmlType='submit' onClick={handleClick}>Home</Btn>
      </div>
    </>
  )
}

export default NDTReport