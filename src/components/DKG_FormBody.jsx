import React from 'react'
import { Form } from "antd";

const DKG_FormBody = ({children, onFinish, initialValues, layout, className}) => {
  console.log("Layout: ", layout)
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout={layout ? layout : 'vertical'}
      className={`py-4 mx-auto ${
        layout === 'horizontal' ? 'horizontal-form' : ''
      } ${className}`}
      initialValues={initialValues}
      onFinish={onFinish}
    >
        {children}
    </Form>
  )
}

export default DKG_FormBody