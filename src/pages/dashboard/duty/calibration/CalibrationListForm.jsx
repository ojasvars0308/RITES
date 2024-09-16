import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import FormDropdownItem from '../../../../components/DKG_FormDropdownItem'
import FormBody from '../../../../components/DKG_FormBody'
import CustomDatePicker from '../../../../components/DKG_CustomDatePicker'
import { message, Table } from 'antd'
import { useNavigate } from 'react-router-dom';

import filter from '../../../../assets/icons/filter.svg'
import DisplayIcon from '../../../../components/DKG_DisplayIcon'
import Search from '../../../../components/DKG_Search'
import Btn from '../../../../components/DKG_Btn'

const instrumentMapping = {
    'Measuring Instrument': ['Vernier', 'Micrometer', 'Feeler Gauge', 'Weighing Scale', 'Measuring Tape', 'Measuring Scale'],
    'Testing Machines': ['Hydris', 'Leco / Gas Analyser', 'Spectro', 'Tensile Testing Machine', 'Hardness', 'TLT Machine', 'FWT System', 'FBW M/C'],
    'Gauge (Working)': [ "Head & Web Gauge", "Height Gauge", "Fish Gauge", "Foot Gauge", "Asymmetry +", "Asymmetry -", "Toe Thk +", "Toe Thk -", "Crown (F)", "Crown (M)", "Foot Concavity", "Hole - Base", "Hole - End", "Right Angle", "FWT Bearer Head", "FWT Striker Head" ],
    'Gauge (Master)': [],
    'Straight Edge': ["3m","2m","1.5m","1m","0.85m","100mm"],
    'Templates': ['FWT Bearer Head', 'FWT Striker Head']
}

const data = [
    {
      key: '1',
      serialNumber: '1',
      instrument: 'Vernier',
      detail: 'xyz',
      railSection: '60E1A1 - Prime',
      sNumber: '002',
      gaugeStatus: 'pass',
      dueDate: '2024-09-04'
    },
    // Add more data as needed
];

const railSectionList = [
    {
      key: '60 E1 - Prime',
      value: '60 E1 - Prime'
    },
    {
      key: '60 E1 - IU',
      value: '60 E1 - IU'
    },
    {
      key: 'IRS 52 - Prime',
      value: 'IRS 52 - Prime'
    },
    {
        key: 'IRS 52 - IU',
        value: 'IRS 52 - IU'
    },
    {
        key: '60E1A1 - Prime',
        value: '60E1A1 - Prime'
    },
    {
        key: '60E1A1 - IU',
        value: '60E1A1 - IU'
    },
    {
        key: 'NA',
        value: 'NA'
    },
]

const columns = [
    {
        title: 'S.No.',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
    },
    {
        title: 'Instrument',
        dataIndex: 'instrument',
        key: 'instrument',
    },
    {
        title: 'Detail',
        dataIndex: 'detail',
        key: 'detail',
    },
    {
        title: 'Rail Section',
        dataIndex: 'railSection',
        key: 'railSection',
    },
    {
        title: 'Serial Number',
        dataIndex: 'sNumber',
        key: 'sNumber',
    },
    {
        title: 'Gauge Status',
        dataIndex: 'gaugeStatus',
        key: 'gaugeStatus',
    },
    {
        title: 'Calibration Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
    },
]

const onSearch = (value, _e, info) => console.log(info?.source, value);

const CalibrationListForm = () => {
    const [shiftDetails, setShiftDetails] = useState(null);
    const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
    const [instrumentList, setInstrumentList] = useState([])

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        instrumentCategory: null,
        instrument: null, 
        instrumentDetail: '',
        railSection: null,
        serialNumber: '',
        calibrationDate: new Date(),
        calibrationUptoDate: '',
    })

    const populateData = () => {
        const instrumentCategoryList = Object.keys(instrumentMapping).map(inst => {
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

    const handleFormSubmit = () => {
        console.log("FORM SUBMIT CALLED")
        message.success('Form Submit Called')
    }

    useEffect(()=> {
        populateData()
    }, [])
    
    useEffect(()=>{
    if(instrumentMapping[formData.instrumentCategory]){
        const instrumentList = instrumentMapping[formData.instrumentCategory].map(inst => {
        return {
            key: inst,
            value: inst
        }
        })
        setInstrumentList([...instrumentList])
    }
    }, [formData.instrumentCategory, instrumentCategoryList])

    const handleClick = (e) => {
    e.preventDefault();
    navigate('/bulkCalibration');
    }

    const handleClickSec = (e) => {
        e.preventDefault();
        navigate('/new-modify-calibration');
    }

    const handleClickTer = (e) => {
        e.preventDefault();
        navigate('/');
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

  return (
    <>
        <SubHeader title='Calibration List' link='/' />

        <div className='flex mt-2'>
            {shiftDetails && 
                <div className='flex flex-wrap mb-4'>
                    <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{shiftDetails[0].date}</span></h6>
                    <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{shiftDetails[0].shift}</span></h6>
                </div>
            }
        </div>
        
        <hr />

        <FormBody
            initialValues={formData}
            onFinish={handleFormSubmit}
        >
            <div className='grid grid-cols-2'>
                <div className='flex items-center'>
                    <DisplayIcon 
                        src={filter}
                        alt='Filter'
                        width={24}
                        height={24}
                        className='mr-4'
                    />
                    
                    <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
                </div>

                <div className='flex items-center'>
                    <DisplayIcon 
                        src={filter}
                        alt='Filter'
                        width={24}
                        height={24}
                        className='mr-4'
                    />
                    
                    <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />
                </div>
            </div>

            <div className='grid grid-cols-2'>
                {
                    (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
                        <div className='flex items-center'>
                            <DisplayIcon 
                                src={filter}
                                alt='Filter'
                                width={24}
                                height={24}
                                className='mr-4'
                            />

                            <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
                        </div>
                }

                <CustomDatePicker label='Calibration Valid upto Date' name='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} required />
            </div>

            <Search 
                className='pl-10 pr-4 py-2 rounded-full bg-slate-200 focus:outline-none w-44 text-gray-500 text-sm mb-2'
                placeholder='Search By S. No.'
                svgClass="absolute left-2 top-3 h-4 w-4 text-gray-500"
            />

            <hr />
        </FormBody>
 
        <div className='flex mt-2 justify-evenly mb-4'>
            <Btn htmlType='submit' className='bg-red-500 hover:!bg-slate-700 w-36 md:w-[initial] text-white' onClick={handleClick}>Bulk Calibration</Btn>
            <Btn htmlType='submit' className='bg-red-500 hover:!bg-slate-700 w-44 md:w-[initial] text-white' onClick={handleClickSec}>Add New Calibration</Btn>
        </div>

        <hr />

        <div className='mt-6'>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 5, // Number of items per page
                    showSizeChanger: true, // Allow user to change page size
                    pageSizeOptions: ['5', '10', '20'], // Options for page size
                }}
            />
        </div>

        <div className='flex justify-center'>
            <Btn htmlType='submit' onClick={handleClickTer}>OK</Btn>
        </div>
    </>
  )
}

export default CalibrationListForm