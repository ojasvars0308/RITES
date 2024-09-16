import React from 'react'
import { useNavigate } from 'react-router-dom';
import Tab from '../../../components/DKG_Tab';
import dutyItemTabs from '../../../utils/frontSharedData/Duty';

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