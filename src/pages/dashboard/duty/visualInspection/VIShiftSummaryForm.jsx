import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/SubHeader'
import { message, Select, Table, Divider } from 'antd';
import {EditOutlined }from '@ant-design/icons';
import IconBtn from '../../../../components/IconBtn';
import FormDropdownItem from '../../../../components/FormDropdownItem'
import FormBody from '../../../../components/FormBody'
import Btn from '../../../../components/Btn'

import filter from '../../../../assets/icons/filter.svg'
import DisplayIcon from '../../../../components/DisplayIcon'
import FilterTable from '../../../../components/FilterTable';

import { useNavigate } from 'react-router-dom'

const { Option } = Select;

const acceptanceData = [
  {key: '1', null: 'A' },
  { key: '2', null: '+0.1' },
  { key: '3', null: 'Tot.' },
];

const rejectionData = [
  {key: '1', 13: '', 12: '', 11: '', 10: '', component: ''},
];

const compiledData = [
  {key: '1', nill: 'Rails Inspected'},
  {key: '2', nill: 'Rails Accepted (A)'},
  {key: '3', nill: 'Rails Accepted (A + 0.1)'},
  {key: '4', nill: 'Rails Accepted (Total)'},
  {key: '5', nill: 'Rails Rejected'},
];

const defectAnalysisData = [
  { key: '1', lap: '1', hh: '2', oht: '1', mdm: '1', kk: '4' },
  { key: '2', lap: 'LH', hh: 'Asy-', oht: 'Asy+', mdm: 'MDF', kk: 'US' },
  { key: '3', lap: '1', hh: '2', oht: '1', mdm: '1', kk: '4' },
];

const lineNumberList = [
  {
    key: 'Line 1',
    value: 'Line 1'
  },
  {
    key: 'Line 2',
    value: 'Line 2'
  },
  {
    key: 'Line 3',
    value: 'Line 3'
  },
  {
      key: 'Line 4',
      value: 'Line 4'
  },
  {
      key: 'Line 5',
      value: 'Line 5'
  },
  {
      key: 'Line 6',
      value: 'Line 6'
  }
]

const VIShiftSummaryForm = () => {
  const [shiftDetails, setShiftDetails] = useState(null);

  const [formData, setFormData] = useState({
    lineNumber: null,
  })

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const navigate = useNavigate()

  const acceptanceColumns = [
    { title: '', dataIndex: 'null', key: 'null' },
    { title: 'Insp.', dataIndex: 'Insp.', key: 'Insp.' },
    { title: '130', dataIndex: '130', key: '130' },
    { title: '117', dataIndex: '117', key: '117' },
    { title: '87', dataIndex: '87', key: '87' },
    { title: '65', dataIndex: '65', key: '65' },
    { title: '52', dataIndex: '52', key: '52' },
    { title: '26', dataIndex: '26', key: '26' },
    { title: '13', dataIndex: '13', key: '13' },
  ];

  const rejectionColumns = [
    {title: '13', dataIndex: '13', key: '13'},
    {title: '12', dataIndex: '12', key: '12'},
    {title: '11', dataIndex: '11', key: '11'},
    {title: '10', dataIndex: '10', key: '10'},
    {title: 'Component', dataIndex: 'component', key: 'component'},
  ];

  const compiledColumns = [
    {title: '', dataIndex: 'nill', key: 'nill'},
    {title: 'Number', dataIndex: 'number', key: 'number'},
    {title: 'Tonnes', dataIndex: 'tonnes', key: 'tonnes'},
  ];

  const defectColumns = [
    { title: 'LAP', dataIndex: 'lap', key: 'lap' },
    { title: 'HH', dataIndex: 'hh', key: 'hh' },
    { title: 'OHT', dataIndex: 'oht', key: 'oht' },
    { title: 'MDM', dataIndex: 'mdm', key: 'mdm' },
    { title: 'KK', dataIndex: 'kk', key: 'kk' },
  ];

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = () => {
    console.log("FORM SUBMIT CALLED")
    message.success('Form Submit Called')
  }

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

  const handleClick = (e) => {
    e.preventDefault();

    navigate('/visual/home')
  }

  return (
    <>
      <SubHeader title='Visual Inspection - Shift Summary' link='/visual/home' />

      {
          shiftDetails &&
          <section className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 relative border p-1 border-gray-500 rounded-sm">
          <h3>Date: {shiftDetails[0].date}</h3>
          <h3>Shift: {shiftDetails[0].shift}</h3>
          <h3>Mill: {shiftDetails[0].mill}</h3>
          <h3>Rail Grade: {shiftDetails[0].railGrade}</h3>
          <h3>Rail Sec.: {shiftDetails[0].railSection}</h3>
          <h3>Length: {shiftDetails[0].railLength}</h3>
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
          <div className='flex items-center'>
            <DisplayIcon 
                src={filter}
                alt='Filter'
                width={24}
                height={24}
                className='mr-2'
            />
            
            <FormDropdownItem label='Line Number' name='lineNumber' dropdownArray={lineNumberList} valueField={'key'} visibleField={'value'} onChange={handleChange} className='w-full' required />
          </div>
        </section>
      </FormBody>

      <hr />

      <div className='flex justify-center mt-2'>
        <Select 
          placeholder="Select a summary" 
          onChange={handleSelectChange}
          className='w-52'
        >
          <Option value="Acceptance Summary">Acceptance Summary</Option>
          <Option value="Defect Analysis">Defect Analysis</Option>
          <Option value="Inspected Railwise Summary">Inspected Railwise Summary</Option>
        </Select>
      </div>

      {selectedOption === 'Acceptance Summary' && (
        <>
          <Divider>Length Wise Acceptance Summary</Divider>

          <Table
            dataSource={acceptanceData}
            columns={acceptanceColumns}
            scroll={{ x: true }}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
          />

          <hr />

          <Divider>Rejection Summary</Divider>

          <Table
            dataSource={rejectionData}
            columns={rejectionColumns}
            scroll={{ x: true }}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
          />

          <hr />

          <Divider>Compiled Summary</Divider>

          <Table
            dataSource={compiledData}
            columns={compiledColumns}
            scroll={{ x: true }}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
          />

          <hr />

          <Btn htmlType='submit' onClick={handleClick} className='w-[22%]'>Ok</Btn>
        </>
      )}

      {selectedOption === 'Defect Analysis' && (
        <>
          <Divider>Defect Analysis Summary</Divider>

          <Table 
            dataSource={defectAnalysisData} 
            columns={defectColumns} 
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
          />

          <hr />

          <Btn htmlType='submit' onClick={handleClick} className='w-[22%]'>Ok</Btn>
        </>
      )}

      {selectedOption === 'Inspected Railwise Summary' && (
        <>
          <FilterTable />
          
          <hr />

          <Btn htmlType='submit' onClick={handleClick} className='w-[22%]'>Ok</Btn>
        </>
      )}
    </>
  )
}

export default VIShiftSummaryForm