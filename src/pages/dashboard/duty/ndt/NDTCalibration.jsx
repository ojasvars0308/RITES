import React, { useState, useEffect } from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import FormBody from '../../../../components/DKG_FormBody';
import FormInputItem from '../../../../components/DKG_FormInputItem';
import Btn from '../../../../components/DKG_Btn';
import IconBtn from '../../../../components/DKG_IconBtn';
import { EditOutlined, PlusOutlined }from '@ant-design/icons';
import { message, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom'
import CustomTimePicker from '../../../../components/DKG_CustomTimePicker';

const checkBoxItems = [
  { "key": 1, "value": "UT" },
  { "key": 2, "value": "ECT" },
  { "key": 3, "value": "FMG" },
  { "key": 4, "value": "OSIRIS" },
]

const NDTCalibration = () => {
  const [checkedValues, setCheckedValues] = useState([]);
  const [shiftDetails, setShiftDetails] = useState(null);

  const navigate = useNavigate()

  const [formData, setFormData] = useState(
    {
      dataList: [
        {
          checkedValues: [],
          calTime: '',
          calSpeed: '',
          rclRep: '',
          remarks: ''
        }
      ],
      shiftRemarks: ''
    }
  );

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = () => {
    navigate('/ndt/home')
    // const shiftDetail = { formData };

    // fetch('http://localhost:8000/shiftDetails', {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(shiftDetail)
    // }).then(() => {
    //     console.log('new shift details added');
    // })

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

  const handleAddCalibrationFields = () => {
    setFormData(prev => {
      return {
        ...prev,
        dataList: [
          ...prev.dataList,
          { checkedValues: [], calTime: '', calSpeed: '', rclRep: '', remarks: '' }
        ]
      }
    })
  };

  const handleNDTRoundValueChange = (index, fieldName, value) => {
    setFormData(prev => {
      const prevDataList = [...prev.dataList]
      prevDataList[index][fieldName] = value
      return {
        ...prev, 
        dataList: [...prevDataList]
      }
    })
  };

  return (
    <>
      <SubHeader title='NDT - Calibration' link='/ndt/home' />

      {
        shiftDetails &&
          <section className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 relative border p-1 border-gray-500 rounded-sm">
          <h3>Date: {shiftDetails[1].formData.date}</h3>
          <h3>Shift: {shiftDetails[1].formData.shift}</h3>
          <h3>Mill: {shiftDetails[1].formData.mill}</h3>
          <h3>NDT: {shiftDetails[1].formData.ndt}</h3>
          <h3>Rail Grade: {shiftDetails[1].formData.railGrade}</h3>
          <h3>Rail Section: {shiftDetails[1].formData.railSection}</h3>
          <div className='absolute top-0 right-0'>
            <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
          </div>
        </section>
      }

      <section>
        <FormBody
          initialValues={formData}
          onFinish={handleFormSubmit}
        >
          {
            formData.dataList.map((record, index) => (
              <>
                <hr />
                
                <div className='flex  flex-col flex-wrap mt-4' key={index}>
                  <section className='grid grid-cols-1'>
                    <Checkbox.Group
                      options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                      value={checkedValues}
                      onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)}
                      className='mb-6'
                    />
                  </section>

                  <CustomTimePicker label='Calibration Completion Time' name='calTime' key={record.id} value={formData?.calTime} onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} required />
                
                  <FormInputItem label='Calibration Speed (m/s)' name='calSpeed' key={record.id} value={formData.calSpeed} onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} required/>
                  <FormInputItem label='RCL Rep.' name='rclRep' key={record.id} value={formData.rclRep} onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} required/>

                  <FormInputItem label='Remarks for this round' key={record.id} placeholder='Enter Remarks' onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} name='remarks' required/>
                </div>
              </>
            ))
          }

          <div className='mb-8'>
            <IconBtn 
                icon={PlusOutlined} 
                text='Add Calibration Round' 
                onClick={handleAddCalibrationFields}
            />
          </div>

          <hr />

          <div className='mt-6'>
            <FormInputItem label='Remarks' placeholder='Enter Remarks' onChange={handleChange} name='shiftRemarks' required/>

            <Btn htmlType='submit' className='w-[23%]'>Save</Btn>
          </div>
        </FormBody>
      </section>
    </>
  )
}

export default NDTCalibration