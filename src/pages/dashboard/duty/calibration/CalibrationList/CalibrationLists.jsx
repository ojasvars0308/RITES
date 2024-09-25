import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../components/DKG_SubHeader'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import FormBody from '../../../../../components/DKG_FormBody'
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker'
import { message, Table } from 'antd'
import { useNavigate } from 'react-router-dom';
import configData from '../../../../../utils/configureData/fetchData.json'
import IconBtn from '../../../../../components/DKG_IconBtn';
import { EditOutlined }from '@ant-design/icons';
import filter from '../../../../../assets/icons/filter.svg'
import DisplayIcon from '../../../../../components/DKG_DisplayIcon'
import data from '../../../../../utils/frontSharedData/Calibration.json'
import Search from '../../../../../components/DKG_Search'
import Btn from '../../../../../components/DKG_Btn'

const { instrumentMapping: sampleData, railSectionList, reportInfo, columns } = data;

const CalibrationLists = () => {
    const [shiftDetails, setShiftDetails] = useState(null);
    const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
    const [instrumentList, setInstrumentList] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        instrumentCategory: null, instrument: null,  instrumentDetail: '', railSection: null, serialNumber: '', calibrationDate: new Date(), calibrationUptoDate: '',
    })

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

    const handleClick = () => {
        navigate('/calibration/bulkCalibration');
    }

    const handleClickSec = () => {
        navigate('/calibration/NMCalibration');
    }

    const handleClickTer = () => {
        navigate('/dashboard');
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
        <SubHeader title='Calibration List' link='/dashboard' />

        {shiftDetails && 
            <section className="!bg-offWhite opacity-70 grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-2 relative border p-1 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)] mt-4">
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
            <div className='grid grid-cols-2'>
                <div className='flex items-center'>
                    <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />
                    
                    <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} className='w-[90%]' required />
                </div>

                <div className='flex items-center ml-2'>
                    <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />
                    
                    <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange} className='w-[90%]' required />
                </div>
            </div>

            <div className='grid grid-cols-2'>
                {
                    (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
                        <div className='flex items-center'>
                            <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-4' />

                            <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} className='w-[90%]' required />
                        </div>
                }

                <CustomDatePicker label='Cal. Valid upto Date' name='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} className='ml-6' required />
            </div>

            <div className='flex justify-center mt-2'>
                <Search 
                    className='pl-10 pr-4 py-2 rounded-full bg-slate-200 focus:outline-none w-44 text-gray-500 text-sm mb-2'
                    placeholder='Search by S. No.'
                    svgClass="absolute left-2 top-3 h-4 w-4 text-gray-500"
                />
            </div>

            <hr />
        </FormBody>

        <div className='flex justify-between'>
            <Btn htmlType='submit' onClick={handleClick}>Bulk Calibration</Btn>
            <Btn htmlType='submit' onClick={handleClickSec}>Add New Calibration</Btn>
        </div>

        <hr />

        <div className='mt-4'>
            <Table
                columns={columns}
                dataSource={reportInfo}
                scroll={{ x: true }}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                }}
            />
        </div>

        <div className='flex justify-center'>
            <Btn htmlType='submit' onClick={handleClickTer}>OK</Btn>
        </div>
    </>
  )
}

export default CalibrationLists