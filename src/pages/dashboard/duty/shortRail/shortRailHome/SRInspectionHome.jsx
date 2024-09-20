import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import configData from '../../../../../utils/configureData/fetchData.json'
import { EditOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { message, Table } from 'antd';
import data from '../../../../../utils/frontSharedData/shortRailInspection.json'
import TabList from '../../../../../components/DKG_TabList';
import SRInspectionHomeTabs from '../../../../../utils/frontSharedData/SRInspectionHome';
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';
import { useNavigate } from 'react-router-dom'

const { shortRailColumns, shortRailData } = data;

const SRInspectionHome = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      remarks: ''
    }
  );

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  };

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

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    navigate('/')
  }

  return (
    <>
      <SubHeader title='Short Rail Inspection - Home' link='/dashboard' />

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

      <Table
        dataSource={shortRailData}
        columns={shortRailColumns}
        scroll={{ x: true }}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
      />

      <hr />

      <section>
        <TabList tabList={SRInspectionHomeTabs} />
      </section>

      <hr />

      <FormBody
          initialValues={formData}
          onFinish={handleFormSubmit}
        >
          <FormInputItem label='Shift Remarks by GL' name='remarks' value={formData.remarks} onChange={handleChange} required/>

          <div className='flex justify-center'>
            <Btn htmlType='submit' className='w-36'>SAVE</Btn>
          </div>
        </FormBody>
    </>
  )
}

export default SRInspectionHome