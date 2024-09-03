import React, { useState } from 'react'
import {HomeOutlined, BellOutlined, FileTextOutlined, RobotOutlined, LineChartOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const dutyItemTabs = [
  {
    id: 1,
    title: 'SMS',
    icon: <HomeOutlined />,
    link: '/smsDutyStart'
  },
  {
    id: 2,
    title: 'Rolling Stage',
    icon: <HomeOutlined />
  },
  {
    id: 3,
    title: 'NDT',
    icon: <HomeOutlined />
  },
  {
    id: 4,
    title: 'Testing',
    icon: <HomeOutlined />
  },
  {
    id: 5,
    title: 'Visual Inspection',
    icon: <HomeOutlined />,
    link: '/visual'
  },
  {
    id: 6,
    title: 'Welding Inspection',
    icon: <HomeOutlined />
  },
  {
    id: 7,
    title: 'Short Rail Inspection',
    icon: <HomeOutlined />
  },
  {
    id: 8,
    title: 'QCT',
    icon: <HomeOutlined />
  },
  {
    id: 9,
    title: 'Calibration',
    icon: <HomeOutlined />
  },
  {
    id: 10,
    title: 'Info',
    icon: <HomeOutlined />
  },
]

const Duty = () => {
  const [activeTab, setActiveTab] = useState(1)
  const navigate = useNavigate()
  const renderDutyItemTabs = () =>
    dutyItemTabs.map(item => {
      return (
        <div 
          key={item.id} 
          // className='bg-darkBlue text-offWhite px-4 py-4 rounded-t-3xl rounded-l-3xl'
          onClick={() => navigate(item.link)}
          className={`cursor-pointer bg-darkBlue text-offWhite px-4 py-4 rounded-t-3xl rounded-l-3xl ${activeTab === item.id ? 'border-b-2 border-pink' : ''}`}
        >
          <span className='duty-tab-icon'>{item.icon}</span> <br /> <br />
          <div>{item.title}</div>
        </div>
      )
    })
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-4">
        {renderDutyItemTabs()}
      </div>
    </section>
  )
}

export default Duty
