import { FileSearchOutlined, EyeOutlined }from '@ant-design/icons';

const SRInspectionHomeTabs = [
    {
      title: 'Add New Short Rail Inspection',
      icon: <EyeOutlined />,
      link: "/shortRail/form"
    },
    {
      title: 'Other Work Station Remarks',
      icon: <FileSearchOutlined />,
      link: "/shortRail/wsRemarks"
    }
]

export default SRInspectionHomeTabs;