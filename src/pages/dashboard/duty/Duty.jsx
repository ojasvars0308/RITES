import React from 'react'
import { MessageOutlined, RollbackOutlined, RadarChartOutlined, WarningOutlined, EyeOutlined, InsuranceOutlined, SmallDashOutlined, FieldTimeOutlined, TrademarkCircleOutlined, FileUnknownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Tab from '../../../components/Tab';
const dutyItemTabs = [
  {
    id: 1,
    title: 'SMS',
    icon: <MessageOutlined />,
    link: '/sms/dutyStart'
  },
  {
    id: 2,
    title: 'Rolling Stage',
    icon: <RollbackOutlined />
  },
  {
    id: 3,
    title: 'NDT',
    icon: <RadarChartOutlined />
  },
  {
    id: 4,
    title: 'Testing',
    icon: <WarningOutlined />
  },
  {
    id: 5,
    title: 'Visual Inspection',
    icon: <EyeOutlined />,
    link: '/viShiftStart'
  },
  {
    id: 6,
    title: 'Welding Inspection',
    icon: <InsuranceOutlined />
  },
  {
    id: 7,
    title: 'Short Rail Inspection',
    icon: <SmallDashOutlined />
  },
  {
    id: 8,
    title: 'QCT',
    icon: <FieldTimeOutlined />
  },
  {
    id: 9,
    title: 'Calibration',
    icon: <TrademarkCircleOutlined />,
    link: '/calibrationList'
  },
  {
    id: 10,
    title: 'Info',
    icon: <FileUnknownOutlined />
  },
]

const Duty = () => {
  const navigate = useNavigate()
  const renderDutyItemTabs = () =>
    dutyItemTabs.map(item => {
      return (
        <Tab  title={item.title} icon={item.icon} onClick={()=> navigate(item.link)} />
      )
    })
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {renderDutyItemTabs()}
      </div>
    </section>
  )
}

export default Duty