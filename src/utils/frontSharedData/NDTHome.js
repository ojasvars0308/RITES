import { FileSearchOutlined, PieChartOutlined, TrademarkCircleOutlined, FileMarkdownOutlined }from '@ant-design/icons';

const ndtHomeTabs = [
    {
      title: 'NDT Calibration',
      icon: <TrademarkCircleOutlined />,
      link: "/ndt/calibration"
    },
    {
      title: 'Shift Summary',
      icon: <FileSearchOutlined />,
      link: "/ndt/shiftSummary"
    },
    {
      title: 'NDT Report',
      icon: <PieChartOutlined />,
      link: "/ndt/report"
    },
    {
      title: 'Test Sample Marking',
      icon: <FileMarkdownOutlined />,
      link: "/stage/testSample/list"
    },
]

export default ndtHomeTabs