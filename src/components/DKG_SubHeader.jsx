import React from 'react'
import {ArrowLeftOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import IconBtn from './DKG_IconBtn';

const DKG_SubHeader = ({title, link, className}) => {
    const navigate = useNavigate()
  return (
    <header className='shadow-md py-3 mt-2 mb-4 w-[410px] rounded-2xl'>
      <IconBtn icon={ArrowLeftOutlined} onClick={()=>navigate(link)} className='mr-4 shadow-none bg-inherit'/>
      <span className='font-bold !text-xl'>{title}</span>
    </header>
  )
}

export default DKG_SubHeader