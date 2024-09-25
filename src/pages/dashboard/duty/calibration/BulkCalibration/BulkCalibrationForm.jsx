import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import FormBody from '../../../../../components/DKG_FormBody'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import { message, Table } from 'antd'
import { useNavigate } from 'react-router-dom';
import filter from '../../../../../assets/icons/filter.svg'
import DisplayIcon from '../../../../../components/DKG_DisplayIcon'
import Search from '../../../../../components/DKG_Search'
import data from '../../../../../utils/frontSharedData/Calibration.json'
import Btn from '../../../../../components/DKG_Btn'
import configData from '../../../../../utils/configureData/fetchData.json'
import IconBtn from '../../../../../components/DKG_IconBtn';
import { EditOutlined }from '@ant-design/icons';

const { instrumentMapping: sampleData, railSectionList, resultList, serialNumbers } = data;

const BulkCalibrationForm = () => {
  const [shiftDetails, setShiftDetails] = useState(null);
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([])
  const [data, setData] = useState([
    {
      key: '1',
      serialNumber: '',
    },
  ]);
  const navigate = useNavigate();

  const handleAddRow = () => {
    const newRow = {
      key: `${data.length + 1}`,
      serialNumber: '',
    };
    setData([...data, newRow]);
  };

  const handleSelectChange = (value, key) => {
    const updatedData = data.map((row) => {
      if (row.key === key) {
        return { ...row, serialNumber: value };
      }
      return row;
    });
    setData(updatedData);
  };

  const columns = [
    {
      title: 'S.No.',
        dataIndex: 'key',
        key: 'key',
        render: (text, record, index) => index + 1,
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record) => (
        <FormDropdownItem name='railSection' placeholder='Select serial number' dropdownArray={serialNumbers} visibleField='value' valueField='key' onChange={handleSelectChange} />
      )
    }
  ]

  const [formData, setFormData] = useState({
    instrumentCategory: null, instrument: null,  instrumentDetail: '', railSection: null, serialNumber: '', calibrationDate: new Date(), calibrationUptoDate: '',
  })

  const handleFormSubmit = () => {
    message.success('Form Submit Called')
    navigate('/calibrationList');
  }

  const populateData = () => {
    const instrumentCategoryList = Object.keys(sampleData).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })
    setInstrumentCategoryList([...instrumentCategoryList])
  }
  
  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  useEffect(()=> {
      populateData()
  }, [])

  useEffect(()=>{
  if(sampleData[formData.instrumentCategory]){
      const instrumentList = sampleData[formData.instrumentCategory].map(inst => {
      return {
          key: inst,
          value: inst
      }
      })
      setInstrumentList([...instrumentList])
  }
  }, [formData.instrumentCategory, instrumentCategoryList])

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
      <SubHeader title='Bulk Re-Calibration List' link='/calibration/list' />

      {shiftDetails && 
        <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] mt-4">
            <h3>Date: {shiftDetails[0].date}</h3>
            <h3>Shift: {shiftDetails[0].shift}</h3>
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
        <div className='grid grid-cols-2'>
          <div className='flex items-center'>
              <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />
              
              <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} className='w-[90%]' required />
          </div>

          <div className='flex items-center ml-4'>
              <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />
              
              <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange} className='w-[90%]' required />
          </div>
        </div>

        <div className='grid grid-cols-2 mb-4'>
          <Search 
            className='pl-10 pr-4 py-2 rounded-full bg-slate-200 focus:outline-none w-44 text-gray-500 text-sm mb-2 mt-7 ml-4'
            placeholder='Search by S. No.'
            svgClass="absolute left-7 top-10 h-4 w-4 text-gray-500"
          />

          {
            (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
              <div className='flex items-center ml-2'>
                  <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='ml-2' />

                  <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} className='ml-2 w-[83%]' required />
              </div>
          }
        </div>

        <hr />

        <div className='flex flex-col mb-4'>
          <div className='mt-6'>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>

          <div className='flex justify-center mt-8'>
            <Btn onClick={handleAddRow}>Add Row / Instrument</Btn>
          </div>
        </div>

        <hr />

        <div className='flex flex-col mt-4'>
          <FormDropdownItem label ='Calibration Result' name='calibrationResult' dropdownArray={resultList} valueField='key' visibleField='value' onChange = {handleChange} required />
          <CustomDatePicker label='Calibration Valid upto Date' name='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} required />
        </div>

        <div className='flex justify-center mt-4'>
          <Btn htmlType='submit'>Save</Btn>
        </div>
      </FormBody>
    </>
  )
}

export default BulkCalibrationForm