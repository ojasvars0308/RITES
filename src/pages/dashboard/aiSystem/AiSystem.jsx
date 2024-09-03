import { Radio, Table } from 'antd'
import React, { useState } from 'react'
import CustomDatePicker from '../../../components/CustomDatePicker'
import FormBody from '../../../components/FormBody'
import moment from 'moment'

// Sample data
const data = [
  {
    key: '1',
    railID: '001',
    surfaceDefectDetection: { precision: 0.95, recall: 0.93 },
    dimensionalVariationDetection: { precision: 0.90, recall: 0.88 },
    ocr: 'True',
  },
  {
    key: '2',
    railID: '002',
    surfaceDefectDetection: { precision: 0.92, recall: 0.90 },
    dimensionalVariationDetection: { precision: 0.87, recall: 0.85 },
    ocr: 'True',
  },
  // Add more data as needed
];



const AiSystem = () => {
  const [timePeriod, setTimePeriod] = useState('shift')
  const [shiftDate, setShiftDate] =useState('')
  const [weekStartDate, setWeekStartDate] = useState('')
  const [weekEndDate, setWeekEndDate] = useState('')
  const [monthStartDate, setMonthStartDate] = useState('')
  const [monthEndDate, setMonthEndDate] = useState('')
  const [yearStartDate, setYearStartDate] = useState('')
  const [yearEndDate, setYearEndDate] = useState('')

  const handleShiftChange = (_, value) => {
    setShiftDate(value)
  }

  const handleWeekEndChange = (_, value) => {
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    date.setTime(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    const newDay = String(date.getDate()).padStart(2, '0');
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newYear = date.getFullYear();
    const weekStartDate = `${newDay}/${newMonth}/${newYear}`
    setWeekStartDate(weekStartDate)
    setWeekEndDate(value)
  }

  const handleMonthEndChange = (_, value) => {
  const date = moment(value, 'DD/MM/YYYY', true);
  if (!date.isValid()) {
    throw new Error('Invalid date format. Please use DD/MM/YYYY.');
  }
  const oneMonthBefore = date.subtract(1, 'months');
  const formattedValue = oneMonthBefore.format('DD/MM/YYYY');
  setMonthStartDate(formattedValue)
  setMonthEndDate(value)
  }

  const handleYearEndChange = (_, value) => {
  const date = moment(value, 'DD/MM/YYYY', true);
  if (!date.isValid()) {
    throw new Error('Invalid date format. Please use DD/MM/YYYY.');
  }
  const oneYearBefore = date.subtract(1, 'years');
    const formattedValue = oneYearBefore.format('DD/MM/YYYY');
    setYearStartDate(formattedValue)
    setYearEndDate(value)
  }

  const columns = [
    {
      title: 'Rail ID',
      dataIndex: 'railID',
      key: 'railID',
    },
    {
      title: 'Surface Defect Detection',
      key: 'surfaceDefectDetection',
      children: [
        {
          title: 'Precision',
          dataIndex: ['surfaceDefectDetection', 'precision'],
          key: 'surfaceDefectDetectionPrecision',
        },
        {
          title: 'Recall',
          dataIndex: ['surfaceDefectDetection', 'recall'],
          key: 'surfaceDefectDetectionRecall',
        },
      ],
    },
    {
      title: 'Dimensional Variation Detection',
      key: 'dimensionalVariationDetection',
      children: [
        {
          title: 'Precision',
          dataIndex: ['dimensionalVariationDetection', 'precision'],
          key: 'dimensionalVariationDetectionPrecision',
        },
        {
          title: 'Recall',
          dataIndex: ['dimensionalVariationDetection', 'recall'],
          key: 'dimensionalVariationDetectionRecall',
        },
      ],
    },
    {
      title: 'OCR',
      dataIndex: 'ocr',
      key: 'ocr',
    },
  ];


  return (
    <>
    <FormBody
      initialValues={
        {
          timePeriod,
          weekStartDate,
          weekEndDate,
          monthStartDate,
          monthEndDate,
          yearStartDate,
          yearEndDate
        }
      }
    >

     <h1 className='font-semibold mb-4'>AI System Accuracy Dashboard</h1> 
     <div>
      <h2 className='font-medium'>
      Time Period
      </h2>
      <Radio.Group value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className='flex gap-8 mb-4'>
        <Radio value='shift'>Shift</Radio>
        <Radio value='weekly'>Weekly</Radio>
        <Radio value='monthly'>Monthly</Radio>
        <Radio value='yearly'>Annually</Radio>
      </Radio.Group>
    </div>
      <div>
    {
      timePeriod === 'shift' &&
      <CustomDatePicker label='Shift Date' value={shiftDate} name='shiftDate' onChange={handleShiftChange} />
    }

    {
      timePeriod === 'weekly' && 
      <>
      <CustomDatePicker label='Week End Date' name='weekEndDate' value={weekEndDate} onChange={handleWeekEndChange}/>
      <CustomDatePicker label='Week Start Date' name='weekStartDate' value={weekStartDate} disabled />
      </>
    }
    {
      timePeriod === 'monthly' &&
      <>
      <CustomDatePicker label='Month End Date' name='monthEndDate' value={monthEndDate} onChange={handleMonthEndChange}/>
      <CustomDatePicker label='Month Start Date' name='monthStartDate' value={monthStartDate} disabled />
      </>
    }
    {
      timePeriod === 'yearly' &&
      <>
       <>
      <CustomDatePicker label='Year End Date' name='yearEndDate' value={yearEndDate} onChange={handleYearEndChange}/>
      <CustomDatePicker label='Year Start Date' name='weekStartDate' value={yearStartDate} disabled />
      </>
      </>
    }
     </div>
    </FormBody>

    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 5, // Number of items per page
        showSizeChanger: true, // Allow user to change page size
        pageSizeOptions: ['5', '10', '20'], // Options for page size
      }}
    />
    </>
  )
}

export default AiSystem
