import React, { useState, useEffect, useCallback } from 'react'
import SubHeader from '../../../../../../components/DKG_SubHeader'
import { EditOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../../components/DKG_IconBtn';
import { message, Table, Divider } from 'antd';
import configData from '../../../../../../utils/configureData/fetchData.json'
import data from "../../../../../../utils/db.json";
import Btn from '../../../../../../components/DKG_Btn';
import { useNavigate } from 'react-router-dom';

const { testSampleTableData } = data;

const TestSampleList = () => {
  const [tableData, setTableData] = useState([]);
  const [shiftDetails, setShiftDetails] = useState(null);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);

  const navigate = useNavigate();

  const populateTableData = useCallback(() => {
    setTableData([...testSampleTableData]);
  }, []);

  const handlePageSizeChange = (value) => {
    setTablePageSize(value);
    setCurrentTablePage(1); // Reset to first page when page size changes
  };

  const handleRowClick = (heatNo) => {
    message.success(heatNo);
  };

  useEffect(() => {
    populateTableData();
  }, [populateTableData]);

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

  const columns = [
    {
      title: "S/No",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Heat No.",
      dataIndex: "heatNo",
      key: "heatNo",
    },
    {
      title: "Timing",
      dataIndex: "timing",
      key: "timing",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Edit",
      fixed: "right",
      render: (_, record) => (
        <IconBtn
          icon={EditOutlined}
          onClick={() => handleRowClick(record.heatNo)}
        />
      ),
    },
  ];

  const handleClick = () => {
    navigate('/stage/testSample/newSampleDeclaration');
  }

  return (
    <>
      <SubHeader title='Test Sample - Declaration' link='/dashboard' />

      {
        shiftDetails &&
        <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] mt-4">
          <h3 className='font-bold'>Date: {shiftDetails[0].date}</h3>
          <h3 className='font-semibold'>Shift: {shiftDetails[0].shift}</h3>
          <h3 className='font-semibold'>Mill: {shiftDetails[0].mill}</h3>
          <h3 className='font-semibold'>Rail Grade: {shiftDetails[0].railGrade}</h3>
          <h3 className='font-semibold'>Rail Sec.: {shiftDetails[0].railSection}</h3>
          <div className='absolute top-0 right-0'>
              <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
          </div>
        </section>
      }

      <Divider>Rail Test Sample Record</Divider>

      <Table
        columns={columns}
        dataSource={testSampleTableData}
        scroll={{ x: true }}
        pagination={{
          current: currentTablePage,
          pageSize: tablePageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onChange: (page) => setCurrentTablePage(page),
          onShowSizeChange: (current, size) => handlePageSizeChange(size),
        }}
      />

      <hr />

      <div className='flex justify-center mt-4'>
        <Btn htmlType='submit' onClick={handleClick}>Add Test Sample Declaration</Btn>
      </div>
    </>
  )
}

export default TestSampleList