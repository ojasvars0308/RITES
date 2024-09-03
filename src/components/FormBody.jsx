import React from 'react'
import { Form } from "antd";

const FormBody = ({children, onFinish, initialValues}) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout='vertical'
      className='py-4 mx-auto'
      initialValues={initialValues}
      onFinish={onFinish}
    >
      {/* <div className=""> */}
        {children}
      {/* </div> */}
    </Form>
  )
}

export default FormBody
