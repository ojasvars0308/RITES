import { Button, Form } from 'antd'
import React from 'react'

const Btn = ({text, children, onClick, htmlType, className}) => {
  return (
    <Form.Item>
        <Button htmlType={htmlType} onClick={onClick} type='primary' className={` text-right bg-pink hover:!bg-pinkHover w-full md:w-fit text-offWhite uppercase ${className}`}>
          {text ? text : children}
        </Button>
    </Form.Item>
  )
}

export default Btn