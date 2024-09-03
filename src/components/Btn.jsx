import { Button } from 'antd'
import React from 'react'

const Btn = ({text, children, onClick, htmlType}) => {
  return (
    <Button htmlType={htmlType} onClick={onClick} type='primary' className='bg-pink hover:!bg-pinkHover w-full md:w-[initial] text-offWhite uppercase'>
      {text ? text : children}
    </Button>
  )
}

export default Btn
