import React, { useEffect, useState } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import configData from '../../../../../utils/configureData/fetchData.json'
import { message, Table, Divider } from 'antd';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { EditOutlined }from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import filter from '../../../../../assets/icons/filter.svg'
import DisplayIcon from '../../../../../components/DKG_DisplayIcon'
import data from '../../../../../utils/frontSharedData/qctSample.json'
import FormBody from '../../../../../components/DKG_FormBody'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import Btn from '../../../../../components/DKG_Btn'

const { millDropdownList, railSectionList, railGradeList, qctList, sampleDeclarationColumns, sampleDeclarationData } = data;

const QctSamples = () => {
  const [shiftDetails, setShiftDetails] = useState(null); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mill: '', railSection: '',  railGrade: '', qct: ''
  })

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

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleClick = () => {
    navigate('/qct/sampleDec')
  }

  return (
    <>
      <SubHeader title='QCT - Samples' link='/' />

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

      <FormBody
        initialValues={formData}
      >
        <div className='flex'>
            <div className='flex items-center mr-8'>
                <DisplayIcon src={filter} alt='Filter' width={24} height={24} />
                
                <FormDropdownItem label='Mill' name='mill' dropdownArray={ millDropdownList } valueField='key' visibleField='value' onChange={handleChange} className='ml-2 w-40' />
            </div>

            <div className='flex items-center'>
                <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />
                
                <FormDropdownItem label ='Rail Section' name='railSection' dropdownArray={ railSectionList } valueField='key' visibleField='value' onChange = {handleChange} className='ml-2 w-40' />
            </div>
        </div>

        <div className='flex'>
            <div className='flex items-center mr-8'>
                <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />
                
                <FormDropdownItem label='Rail Grade' name='railGrade' dropdownArray={ railGradeList } valueField='key' visibleField='value' onChange={handleChange} className='ml-2 w-40' />
            </div>

            <div className='flex items-center'>
                <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />
                
                <FormDropdownItem label ='QCT' name='qct' dropdownArray={ qctList } valueField='key' visibleField='value' onChange = {handleChange} className='ml-2 w-40' />
            </div>
        </div>
      </FormBody>

      <hr />

      <Divider>Samples Declared for Testing</Divider>

      <Table 
        dataSource={sampleDeclarationData} 
        columns={sampleDeclarationColumns} 
        scroll={{ x: true }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />

      <hr />

      <div className='flex justify-center mt-4'>
        <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Declare New Sample for Testing</Btn>
      </div>
    </>
  )
}

export default QctSamples