import { Button, Form } from 'antd'
import React from 'react'

const DKG_Btn = ({text, children, onClick, htmlType, className}) => {
  return (
    <Form.Item>
        <Button htmlType={htmlType} onClick={onClick} type='primary' className={`text-center bg-emerald-900 w-full md:w-fit text-offWhite ${className}`}>
          {text ? text : children}
        </Button>
    </Form.Item>
  )
}

export default DKG_Btn