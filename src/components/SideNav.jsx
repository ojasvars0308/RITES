import { Divider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardOutlined, BellOutlined, HomeOutlined, LogoutOutlined, CheckCircleOutlined } from '@ant-design/icons';
import IconBtn from "./IconBtn";
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
    label: 'Visual Inspection',
    path: '/visualInspection/inspection',
  },
  // {
  //   key: '2',
  //   icon: <BellOutlined />,
  //   label: 'Duty',
  //   children: [
  //     {
  //       key: '2.1',
  //       icon: <BellOutlined />,
  //       label: 'SMS',
  //       children: [
  //         {
  //           key: '2.1.1',
  //           icon: <HomeOutlined />,
  //           label: 'Start Duty',
  //           path: '/sms/dutyStart',
  //         },
  //         {
  //           key: '2.1.2',
  //           icon: <HomeOutlined />,
  //           label: 'End Duty',
  //           path: '/sms/dutyEnd'
  //         },
  //         {
  //           key: '2.1.3',
  //           icon: <HomeOutlined />,
  //           label: 'SMS Summary',
  //           path: '/sms/heatSummary'
  //         },
  //         {
  //           key: '2.1.4',
  //           icon: <HomeOutlined />,
  //           label: 'Bloom Inspection',
  //           path: '/sms/bloomInspection'
  //         },
  //         {
  //           key: '2.1.5',
  //           icon: <HomeOutlined />,
  //           label: 'Shift Reports',
  //           path: '/sms/shiftReports'
  //         },
  //       ],
  //     },
  //   ],
  // },

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
        <IconBtn text="Logout" icon={LogoutOutlined} className="bg-offWhite" onClick={()=>dispatch(logout())} />
    </Layout>
  );
};

export default SideNav;
