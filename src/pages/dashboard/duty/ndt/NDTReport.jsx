import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import { EditOutlined }from '@ant-design/icons';
import { message, Divider } from 'antd';
import { Table } from "antd";
import IconBtn from '../../../../components/DKG_IconBtn';
import data from "../../../../utils/db.json";

const { ndtRailWiseData: sampleData } = data;

const columns = [
  {
    title: "S.No.",
    dataIndex: "serialNumber",
    key: "serialNumber",
    fixed: "left",
  },
  {
    title: "Rail ID",
    dataIndex: "railID",
    key: "railID",
    fixed: "left",
  },
  {
    title: "Heat No.",
    dataIndex: "heatNumber",
    key: "heatNumber",
  },
  {
    title: "Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
  },
  {
    title: "Surface Defect",
    dataIndex: "surfaceDefect",
    key: "surfaceDefect",
  },
  {
    title: "Dimensional Defect",
    dataIndex: "dimensionDefect",
    key: "dimensionDefect",
  },
  {
    title: "UT Defect",
    dataIndex: "utDefect",
    key: "utDefect",
  },
  {
    title: "NDT Report",
    dataIndex: "ndtReport",
    key: "ndtReport",
  },
];

const NDTReport = () => {
  const [shiftDetails, setShiftDetails] = useState(null);

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
      <SubHeader title='NDT - Report' link='/ndt/home' />

      {
        shiftDetails &&
          <section className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 relative border p-1 border-gray-500 rounded-sm">
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
            pageSize: 8,
            showSizeChanger: true,
            pageSizeOptions: ["8", "16", "32"],
          }}
        />
      </section>
    </>
  )
}

export default NDTReport