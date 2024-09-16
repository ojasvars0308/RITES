import React, { useState } from 'react'
import { Input } from 'antd';
import Home from './home/Home';
import Duty from './duty/Duty';
import Records from './records/Records';
import AiSystem from './aiSystem/AiSystem';
import DataAnalysis from './dataAnalysis/DataAnalysis';
import IsoReports from './isoReports/IsoReports';
import Admin from './admin/Admin';
import dashboardTabItems from '../../utils/frontSharedData/Dashboard';

const { Search } = Input;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(1)
  const renderDashboardTabItems = () => 
    dashboardTabItems.map(item=> {
      return (
        <div 
          key={item.id} 
          onClick={() => setActiveTab(item.id)}
          className={`cursor-pointer ${activeTab === item.id ? 'border-b-2 border-pink' : ''}`}
        >
          <span className='dashboard-tab-icon'>{item.icon}</span> <br />
          <div className='text-center w-full'>{item.title}</div>
          </div>
      )
    })

    const renderTab = () => {
      switch (activeTab){
        case 1:
          return <Home />
        case 2:
          return <Duty />
        case 3:
          return <Records />
        case 4:
          return <AiSystem />
        case 5:
          return <DataAnalysis />
        case 6:
          return <IsoReports />
        case 7:
          return <Admin />
        default:
          break
      }
    }

  return (
    <div className='flex flex-col gap-4 lg:gap-12'>
      <section>
        <Search placeholder='Search' className='dashboard-search' />
      </section>

      <section>
        <div className="dashboard-tabs grid grid-cols-4 gap-4 bg-darkBlue rounded text-offWhite p-4">
          {renderDashboardTabItems()}
        </div>
      </section>
      
      <section>
        {renderTab()}
      </section>
    </div>
  )
}

export default Dashboard