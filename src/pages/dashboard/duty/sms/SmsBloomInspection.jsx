import React, { useState } from 'react'
import SubHeader from '../../../../components/SubHeader'
import FormBody from '../../../../components/FormBody'
import FormInputItem from '../../../../components/FormInputItem'
import FormDropdownItem from '../../../../components/FormDropdownItem'
import Btn from '../../../../components/Btn'
import { message } from 'antd'

const bloomIdentificationList = [
    {
        key: 'satisfactory',
        value: 'Satisfactory'
    },
    {
        key: 'unsatisfactory',
        value: 'Unsatisfactory'
    }
]

const SmsBloomInspection = () => {
    const [formData, setFormData] = useState({
        castNo: '',
        primeBloomsCount: null,
        coBloomsCount: null,
        bloomIdentification: null,
        bloomLength: null,
        surfaceCondition: '',
        primeBloomsRejectedCount: null,
        coBloomsRejectedCount: null,
        remark: ''
    })
    const handleChange = (fieldName, value) => {
        setFormData(prev => {
            return {
                ...prev,
                [fieldName]: value
            }
        })
    }

    const handleFormSubmit = () => {
        message.success('Submit button called.')
    }
  return (
    <>
    <SubHeader link={'/sms/dutyEnd'} title='SMS - Bloom Inspection' />
    <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 border p-1 border-gray-500 rounded-sm">
        <h3>Date: 13/12/2001</h3>
        <h3>Shift: A</h3>
        <h3>SMS: SMS 3</h3>
        <h3>Rail Grade: R260</h3>
        </div>
    </section>
    <hr className='bg-black' />
    <section>
        <FormBody
            layout='horizontal'
            initialValues={formData}
            className=' md:grid md:grid-cols-2 gap-x-8'
            onFinish={handleFormSubmit}
        >
            <FormInputItem label='Cast Number' name='castNo' onChange={handleChange} />
            <FormInputItem type='number' label='Prime Blooms Count' name='primeBloomsCount' onChange={handleChange} />
            <FormInputItem type='number' label='CO Blooms Count' name='coBloomsCount' onChange={handleChange} />
            <FormDropdownItem label='Bloom Identification' name='bloomIdentification' dropdownArray={bloomIdentificationList} visibleField={'value'} valueField={'key'} onChange={handleChange} />
            <FormInputItem label='Bloom Length' name='bloomLength' onChange={handleChange} />
            <FormInputItem label='Surface Condition' name='surfaceCondition' onChange={handleChange} />
            <FormInputItem type='number' label='Prime Blooms Rejected Count' name='primeBloomsRejectedCount' onChange={handleChange} />
            <FormInputItem type='number' label='CO Blooms Rejected Count' name='coBloomsRejectedCount' onChange={handleChange} />
            <FormInputItem label='Remark' name='remark' onChange={handleChange} />
            <Btn htmlType='submit' className='md:col-span-2 md:!w-min'>Submit</Btn>
        </FormBody>
    </section>
    <section>
    
    </section>
    </>
  )
}

export default SmsBloomInspection
