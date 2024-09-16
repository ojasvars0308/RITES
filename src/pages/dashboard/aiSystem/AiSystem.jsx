import { Radio, Table } from 'antd'
import React, { useState } from 'react'
import CustomDatePicker from '../../../components/DKG_CustomDatePicker'
import FormBody from '../../../components/DKG_FormBody'
import FormDropdownItem from '../../../components/DKG_FormDropdownItem'
import moment from 'moment'
import data from '../../../utils/frontSharedData/AISystem.json'

const { tableData, shiftDropdownList, columns } = data;

const AiSystem = () => {
  const [timePeriod, setTimePeriod] = useState('shift')
  const [shiftDate, setShiftDate] = useState('')
  const [shift, setShift] = useState('')
  const [weekStartDate, setWeekStartDate] = useState('')
  const [weekEndDate, setWeekEndDate] = useState('')
  const [monthStartDate, setMonthStartDate] = useState('')
  const [monthEndDate, setMonthEndDate] = useState('')
  const [yearStartDate, setYearStartDate] = useState('')
  const [yearEndDate, setYearEndDate] = useState('')

  const handleShiftChange = (_, value) => {
    setShiftDate(value);
    setShift(value);
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

  return (
    <>
      <FormBody
        initialValues={
          {
            timePeriod, weekStartDate, weekEndDate, monthStartDate, monthEndDate, yearStartDate, yearEndDate
          }
        }
      >

        <h1 className='font-semibold mb-4'>AI System Accuracy Dashboard</h1>

        <hr />

        <div className='mt-4'>
          <h2 className='font-medium'>
            Time Period
          </h2>

          <Radio.Group value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className='flex gap-6 mb-4'>
            <Radio value='shift'>Shift</Radio>
            <Radio value='weekly'>Weekly</Radio>
            <Radio value='monthly'>Monthly</Radio>
            <Radio value='yearly'>Annually</Radio>
          </Radio.Group>
        </div>

        <div>
          {
            timePeriod === 'shift' &&
            <div className='flex'>
              <CustomDatePicker label='Shift Date' value={shiftDate} name='shiftDate' onChange={handleShiftChange} />
              <FormDropdownItem label='Shift' value={shift} dropdownArray={shiftDropdownList} name='shift' onChange={handleShiftChange} valueField='key' visibleField='value' className='ml-2 w-[30%]' required/>
            </div>
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
              <CustomDatePicker label='Year End Date' name='yearEndDate' value={yearEndDate} onChange={handleYearEndChange}/>
              <CustomDatePicker label='Year Start Date' name='weekStartDate' value={yearStartDate} disabled />
            </>
          }
        </div>
      </FormBody>

      <Table
        columns={columns}
        dataSource={tableData}
        scroll={{ x: true }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true, 
          pageSizeOptions: ['10', '20', '30'],
        }}
      />
    </>
  )
}

export default AiSystem