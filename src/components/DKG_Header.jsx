import React from "react";
import { ReactComponent as Logo } from "../assets/icons/RITES_logo.svg";
import { MenuOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { Menu } from "antd";

const DKG_Header = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenuClick = (e) => {
    if (e.key === '1.1') {
        // navigate('/');
      } else if (e.key === '1.2') {
        dispatch(logout())
      }
  }
  const items = [
    {
        key: '1',
        icon: <MenuOutlined />,
        children: [
            {
                key: '1.1',
                label: 'Home'
            },
            {
                key: '1.2',
                label: 'Logout'
            }
        ]
    }
  ]
  return (
    <header className="!bg-white px-4 flex justify-between items-center w-full z-10 rounded-2xl ml-6">
      <div>
        <Logo height={90} width={180} />
      </div>
      <div className="flex gap-4">
        <span>Hello User !</span>
        <span>
          <Menu items={items} mode="vertical-right" onClick={handleMenuClick}/>
        </span>
      </div>
    </header>
  );
};

export default DKG_Header;