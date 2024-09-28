import React, { useState } from 'react'
import Btn from '../../components/DKG_Btn'
import {ReactComponent as Logo} from '../../assets/images/logo.svg'
import FormBody from '../../components/DKG_FormBody'
import FormInputItem from '../../components/DKG_FormInputItem'
import { useDispatch } from 'react-redux';
import { login } from '../../store/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../../components/DKG_FormContainer'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleFormSubmit = async () => {
    await dispatch(login()).unwrap()
    navigate('/')
  }

  const [formData, setFormData] = useState(
    {
      empId: '',
      password: ''
    }
  )

  const handleFormValueChange = (fieldName, value) => {
    setFormData(prev=> {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }
  return (
    <>
      <header className='bg-darkBlue text-offWhite p-4 fixed top-0 w-full z-30'>
        <h1>Log In</h1>
      </header>
    <FormContainer className='mt-20 main-content border-none !shadow-none'>
      <main className='w-full p-4 flex flex-col h-fit justify-center items-center gap-8 bg-white relative z-20 rounded-md'>
        <Logo width={300} height={200} />
        <FormBody onFinish={handleFormSubmit} initialValues={formData}>
          <FormInputItem label="Employee ID" placeholder="123456" name='empId' onChange={handleFormValueChange} required />
          <FormInputItem label="Password" placeholder="*****" name='password' onChange={handleFormValueChange} required />
          <Btn htmlType="submit" text="submit"/>
        </FormBody>

        <h2 className='text-gray-500'>Account credentials unavailable ? <br /> Request Admin for your credentials.</h2>
      </main>
    </FormContainer>
    </>
  )
}

export default Login
