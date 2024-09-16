import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { message, Select, Table, Divider } from 'antd';
import {EditOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import FormBody from '../../../../../components/DKG_FormBody'
import Btn from '../../../../../components/DKG_Btn'
import filter from '../../../../../assets/icons/filter.svg'
import DisplayIcon from '../../../../../components/DKG_DisplayIcon'
import FilterTable from '../../../../../components/DKG_FilterTable';
import { useNavigate } from 'react-router-dom'
import data from '../../../../../utils/frontSharedData/visualInspection.json'
import configData from '../../../../../utils/configureData/fetchData.json'

const { acceptanceData: sampleData, rejectionData: sampleDataSec, compiledData, defectAnalysisData, lineNumberList, acceptanceColumns, rejectionColumns, compiledColumns, defectColumns } = data;

const { Option } = Select;

const VIShiftSummaryForm = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lineNumber: '',
  })

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleClick = () => {
    navigate('/visual/home')
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
            dataSource={sampleData}
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
            dataSource={sampleDataSec}
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

          <div className='flex justify-center'>
            <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go Back</Btn>
          </div>
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

          <div className='flex justify-center'>
            <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go Back</Btn>
          </div>
        </>
      )}

      {selectedOption === 'Inspected Railwise Summary' && (
        <>
          <FilterTable />
          
          <hr />

          <div className='flex justify-center'>
            <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go Back</Btn>
          </div>
        </>
      )}
    </>
  )
}

export default VIShiftSummaryForm