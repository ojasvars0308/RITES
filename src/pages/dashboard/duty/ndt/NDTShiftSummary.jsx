import React, { useState,useEffect } from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import { message, Table } from 'antd';
import IconBtn from '../../../../components/DKG_IconBtn';
import {EditOutlined }from '@ant-design/icons';
import InteractionTable from '../../../../components/DKG_InteractionTable';

const ndtReportData = [
  { key: '1', null: 'Rolling Table Speed during Testing', noll: '', nill: '' },
  { key: '2', null: 'Total Rails Inspected', noll: '', nill: '' },
  { key: '3', null: 'Total UT Marked Rails', noll: '', nill: '' },
  { key: '4', null: 'Total ECT Marked Rails', noll: '', nill: '' },
  { key: '5', null: 'Body Startightness Results', noll: 'A', nill: '' },
  { key: '6', null: '', noll: 'A + 0.1', nill: '' },
  { key: '7', null: '', noll: 'Marked', nill: '' },
  { key: '8', null: 'Total Profile Marked', noll: '', nill: '' },
];

const NDTShiftSummary = () => {
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

  const ndtReportColumns = [
    { title: '', dataIndex: 'null', key: 'null' },
    { title: '', dataIndex: 'noll', key: 'noll' },
    { title: '', dataIndex: 'nill', key: 'nill' },
    // { title: 'MDM', dataIndex: 'mdm', key: 'mdm' },
    // { title: 'KK', dataIndex: 'kk', key: 'kk' },
  ];

  return (
    <>
      <SubHeader title='NDT - Shift Summary' link='/ndt/home' />

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

      <hr />

      {
        ((shiftDetails[2].formData.mill === 'URM') || (shiftDetails[2].formData.mill === 'RSM' && shiftDetails[2].formData.ndt === 'LR')) && (
          <>
            <Table 
              dataSource={ndtReportData} 
              columns={ndtReportColumns} 
              pagination={{
                pageSize: 8,
                showSizeChanger: true,
                pageSizeOptions: ["8", "16", "32"],
              }}
            />    
          </>
        )
      }

      {
        (shiftDetails[2].formData.mill === 'RSM' && shiftDetails[2].formData.ndt === 'SR') && (
          <>
            <InteractionTable />
          </>
        )
      }
    </>
  )
}

export default NDTShiftSummary