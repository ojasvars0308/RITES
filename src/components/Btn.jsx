import { Button } from 'antd'
import React from 'react'

const Btn = ({text, children, onClick, htmlType, className}) => {
  return (
    <Button htmlType={htmlType} onClick={onClick} type='primary' className={` text-right bg-pink hover:!bg-pinkHover w-full md:w-fit text-offWhite uppercase ${className}`}>
      {text ? text : children}
    </Button>
  )
}

export default Btn