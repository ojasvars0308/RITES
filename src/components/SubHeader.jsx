import React from 'react'
import {ArrowLeftOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const SubHeader = ({title, link}) => {
    const navigate = useNavigate()
  return (
    <header className='shadow-sm py-2'>
      <Button onClick={()=>navigate(link)} className='icon mr-4 bg-offWhite border-0'><ArrowLeftOutlined /></Button>
      <span className='font-medium'>{title}</span>
    </header>
  )
}

export default SubHeader
