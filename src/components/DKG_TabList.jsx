import React from 'react'
import Tab from './DKG_Tab'
import { useNavigate } from 'react-router-dom'

const DKG_TabList = ({tabList}) => {
    const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {
            tabList?.map((tab, key) => {
                return (
                    <Tab key={key} title={tab.title} icon={tab.icon} onClick={() => navigate(tab.link)} />
                )
            })
        }
    </div>
  )
}

export default DKG_TabList