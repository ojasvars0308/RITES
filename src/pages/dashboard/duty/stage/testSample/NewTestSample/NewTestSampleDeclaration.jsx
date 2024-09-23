import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../../../components/DKG_SubHeader'
import configData from '../../../../../../utils/configureData/fetchData.json'
import { EditOutlined }from '@ant-design/icons';
import { message, Checkbox } from 'antd';
import IconBtn from '../../../../../../components/DKG_IconBtn';
import FormBody from '../../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../../components/DKG_FormInputItem';
import { useNavigate } from 'react-router-dom'
import FormDropdownItem from '../../../../../../components/DKG_FormDropdownItem'
import data from '../../../../../../utils/frontSharedData/testSampleDeclaration.json'
import Btn from '../../../../../../components/DKG_Btn';

const { testDropdownList, railGradeDropdownList, sampleDropdownList, strandDropdownList, sampleLotDropdownList, checkBoxItems, retestNameDropdownList, retestNameSecDropdownList } = data;

const NewTestSampleDeclaration = () => {
    const [shiftDetails, setShiftDetails] = useState(null);
    const [checkedValues, setCheckedValues] = useState([])
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
          sampleDetails: '', test: '', railGrade: '', sampleType: '', heatNumber: '', strand: '', sampleLot: '', remarks: '', sampleID: '', retestName: '', retestOne: '', retestTwo: '', retestThree: '' 
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
        // needs to be change later on
        navigate('/dashboard') 
    }

  return (
    <>
        <SubHeader title='New Test Sample - Declaration' link='/stage/testSample/list' />

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
        
        <hr />

        <FormBody
            initialValues={formData}
            onFinish={handleFormSubmit}
        >
            <div className='flex justify-center'>
                <FormInputItem label='Enter Sample Details' name='sampleDetails' value={formData.sampleDetails} onChange={handleChange} required/>
            </div>

            <div className='flex justify-center mt-2'>
                <FormDropdownItem label='Test' name='test' value={formData.test} dropdownArray={testDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='w-full' required/>
            </div>

            <div className='flex justify-center mt-2'>
                <FormDropdownItem label='Rail Grade' name='railGrade' value={formData.railGrade} dropdownArray={railGradeDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='w-full' required/>
            </div>

            <section>
                {(formData.test === "Acceptance Test" && (formData.railGrade === "R260" || formData.railGrade === "880")) && (
                    <FormBody
                        initialValues={formData}
                        onFinish={handleFormSubmit}
                    >
                        <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                            <div className='grid grid-cols-2'>
                                <FormDropdownItem label='Sample Type' name='sampleType' value={formData.sampleType} dropdownArray={sampleDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='w-full' required/>
                                {/* hardcoded */}
                                <h3 className='ml-3'>Sample ID</h3> 
                            </div>

                            <div className='grid grid-cols-2'>
                                <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} required/>
                                <FormDropdownItem label='Strand' name='strand' value={formData.strand} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2 w-[95%]' required/>
                            </div>

                            <div className='grid grid-cols-2'>
                                <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                            </div>

                            <div>
                                <Checkbox.Group
                                    options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                                    value={checkedValues}
                                    onChange={(checkedValues) => setCheckedValues(checkedValues)}
                                    className='checkbox-group mb-4'
                                />
                            </div>

                            <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} required/>
                        </div>
                    </FormBody>
                )}

                {(formData.test === "Acceptance Test" && formData.railGrade === "R350HT") && (
                    <FormBody
                        initialValues={formData}
                        onFinish={handleFormSubmit}
                    >
                        <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                            <div className='grid grid-cols-2'>
                                <FormDropdownItem label='Sample Type' name='sampleType' value={formData.sampleType} dropdownArray={sampleDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='w-full' required/>
                                <FormInputItem label='Sample ID' name='sampleID' value={formData.sampleID} onChange={handleChange} className='ml-2' required/>
                            </div>

                            <div className='grid grid-cols-2'>
                                <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} required/>
                                <FormDropdownItem label='Strand' name='strand' value={formData.strand} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2 w-[95%]' required/>
                            </div>

                            <div className='grid grid-cols-2'>
                                <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                            </div>

                            <div>
                                <Checkbox.Group
                                    options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                                    value={checkedValues}
                                    onChange={(checkedValues) => setCheckedValues(checkedValues)}
                                    className='checkbox-group mb-4'
                                />
                            </div>

                            <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} required/>
                        </div>
                    </FormBody>
                )}

                {(formData.test === "Retest Samples" && (formData.railGrade === "R260" || formData.railGrade === "880")) && (
                    <FormBody
                        initialValues={formData}
                        onFinish={handleFormSubmit}
                    >
                        <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                            <div className='grid grid-cols-2'>
                                <FormDropdownItem label='Retest Name' name='retestName' value={formData.retestName} dropdownArray={retestNameDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                                <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                            </div>

                            <div className='grid grid-cols-2'>
                                <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} required/>
                                <FormDropdownItem label='Retest 1' name='retestOne' value={formData.retestOne} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                            </div>

                            <div className='grid grid-cols-2'>
                                <FormDropdownItem label='Retest 2' name='retestTwo' value={formData.retestTwo} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                                <FormDropdownItem label='Retest 3' name='retestThree' value={formData.retestThree} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                            </div>

                            <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} required/>
                        </div>
                    </FormBody>
                )}

                {(formData.test === "Retest Samples" && formData.railGrade === "R350HT") && (
                    <FormBody
                        initialValues={formData}
                        onFinish={handleFormSubmit}
                    >
                        <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                            <div className='grid grid-cols-2'>
                                <FormDropdownItem label='Retest Name' name='retestName' value={formData.retestName} dropdownArray={retestNameSecDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                                <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                            </div>

                            <div className='grid grid-cols-2'>
                                <FormInputItem label='Sample ID' name='sampleID' value={formData.sampleID} onChange={handleChange} required/>
                                <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} className='ml-2' required/>
                            </div>

                            <div className='grid grid-cols-1'>
                                <FormDropdownItem label='Strand' name='strand' value={formData.strand} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                            </div>
                        </div>
                    </FormBody>
                )}

                <div className='flex justify-center'>
                    <Btn htmlType='submit' className='w-36' onClick={handleFormSubmit}>Save</Btn>
                </div>
            </section>
        </FormBody>
    </>
  )
}

export default NewTestSampleDeclaration