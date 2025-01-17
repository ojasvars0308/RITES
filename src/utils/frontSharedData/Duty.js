import { MessageOutlined, RollbackOutlined, RadarChartOutlined, WarningOutlined, EyeOutlined, InsuranceOutlined, SmallDashOutlined, FieldTimeOutlined, TrademarkCircleOutlined, FileUnknownOutlined } from '@ant-design/icons';

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
      icon: <RadarChartOutlined />,
      link: '/ndt/dutyStart'
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
      icon: <InsuranceOutlined />,
      link: '/welding/dutyStart'
    },
    {
      id: 7,
      title: 'Short Rail Inspection',
      icon: <SmallDashOutlined />,
      link: '/shortRail/home'
    },
    {
      id: 8,
      title: 'QCT',
      icon: <FieldTimeOutlined />,
      link: '/qct/samples'
    },
    {
      id: 9,
      title: 'Calibration',
      icon: <TrademarkCircleOutlined />,
      link: '/calibration/lists'
    },
    {
      id: 10,
      title: 'Info',
      icon: <FileUnknownOutlined />
    },
]

export default dutyItemTabs;