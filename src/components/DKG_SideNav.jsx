import { Divider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardOutlined, BellOutlined, HomeOutlined, LogoutOutlined, CheckCircleOutlined } from '@ant-design/icons';
import IconBtn from "./DKG_IconBtn";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";

const items = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    path: '/',
  },
  {
    key: '2',
    icon: <CheckCircleOutlined />,
    label: 'Duty',
    children: [
      {
        key: '2.1',
        icon: <BellOutlined />,
        label: 'Visual Inspection',
        children: [
          {
            key: '2.1.1',
            icon: <HomeOutlined />,
            label: 'Start Duty',
            path: '/visual/startDuty',
          },
          {
            key: '2.1.2',
            icon: <HomeOutlined />,
            label: 'VI Home',
            path: '/visual/home',
          },
          {
            key: '2.1.3',
            icon: <HomeOutlined />,
            label: 'Inspection',
            path: '/visual/inspection',
          },
          {
            key: '2.1.4',
            icon: <HomeOutlined />,
            label: 'Shift Summary',
            path: '/visual/summary',
          },
        ],
      },
      {
        key: '2.2',
        icon: <BellOutlined />,
        label: 'Rolling Stage',
        children: [
          {
            key: '2.2.1',
            icon: <HomeOutlined />,
            label: 'Start Duty',
            path: '/stage/startDuty',
          },
          {
            key: '2.2.2',
            icon: <HomeOutlined />,
            label: 'Stage Home',
            path: '/stage/home',
          },
        ],
      },
      {
        key: '2.3',
        icon: <BellOutlined />,
        label: 'NDT',
        children: [
          {
            key: '2.3.1',
            icon: <HomeOutlined />,
            label: 'Start Duty',
            path: '/ndt/startDuty',
          },
          {
            key: '2.3.2',
            icon: <HomeOutlined />,
            label: 'NDT Home',
            path: '/ndt/home',
          },
          {
            key: '2.3.3',
            icon: <HomeOutlined />,
            label: 'Calibration',
            path: '/ndt/calibration',
          },
          {
            key: '2.3.4',
            icon: <HomeOutlined />,
            label: 'Shift Summary',
            path: '/ndt/shiftSummary',
          },
          {
            key: '2.3.5',
            icon: <HomeOutlined />,
            label: 'Report',
            path: '/ndt/report',
          },
          {
            key: '2.3.6',
            icon: <HomeOutlined />,
            label: 'Test Sample Marking',
            path: '/ndt/testSampleMarking',
          },
        ],
      },
    ],
  },
];

const SideNav = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch()

  const getSelectedKey = (item) => {
    if (item.path === currentPath) {
      return item.key;
    }

    if (item.children) {
      for (const child of item.children) {
        const key = getSelectedKey(child);
        if (key) {
          return key; 
        }
      }
    }
    return null;
  };

  const selectedKey = items.reduce((acc, item) => {
    return acc || getSelectedKey(item);
  }, null);

  const displaySideNavItems = (item) => {

    if (!item.children) {
      return {
        key: item.key,
        icon: item.icon,
        label: (
          <Link to={item.path}>
            {item.label}
          </Link>
        ),
        onClick: () => {
          if(window.innerWidth <= 768)
            toggleCollapse()
        }
      };
    }
  
    return {
      key: item.key,
      icon: item.icon,
      label: item.label,
      children: item.children.map(displaySideNavItems),
    };
  };
  const menuItems = items.map(displaySideNavItems);

  return (
    <Layout style={{flex: 0}} className={`absolute md:static h-full w-fit bg-offWhite z-10 !flex !flex-col transition-all duration-150 ${collapsed ? '-translate-x-full md:-translate-x-0' : ''}`}>
      <Sider
        width={260}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
        className="overflow-y-auto !bg-offWhite !w-[100vw] !flex-1 custom-sider-css"
      >
        <Menu
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={["1"]}
          selectedKeys={selectedKey ? [selectedKey] : []}
          className="!bg-offWhite"
        /> 

      </Sider>
        <Divider className="m-0 w-4" />
        <IconBtn text="Logout" icon={LogoutOutlined} className="bg-offWhite overflow-hidden" onClick={()=>dispatch(logout())} />
    </Layout>
  );
};

export default SideNav;