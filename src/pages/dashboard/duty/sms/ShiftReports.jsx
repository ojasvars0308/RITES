import React from 'react'
import SubHeader from '../../../../components/DKG_SubHeader'
import { FireOutlined, CheckCircleOutlined, CheckSquareOutlined } from '@ant-design/icons';
import TabList from '../../../../components/DKG_TabList';
import Btn from '../../../../components/DKG_Btn';
import { useNavigate } from 'react-router-dom';
import data from '../../../../utils/db.json'
import GeneralInfo from '../../../../components/DKG_GeneralInfo';

const {smsGeneralInfo} = data

const smsDutyEndTabs = [
  {
    title: 'Report - Heat List',
    icon: <FireOutlined />,
    link: "/sms/shiftReports/heatList"
  },
  {
    title: 'Report - Check List',
    icon: <CheckCircleOutlined />,
    link: "/sms/shiftReports/checkList"
  },
  {
    title: 'Report - Verification',
    icon: <CheckSquareOutlined />,
    link: "/sms/shiftReports/verification"
  },
]

const ShiftReports = () => {
  const navigate = useNavigate()
  return (
    <>
      <SubHeader title='SMS - Shift Reports' link='/sms/dutyEnd' />
      <section>
        <GeneralInfo data={smsGeneralInfo} />
      </section>
      <section>
        <TabList tabList={smsDutyEndTabs} />
      </section>
      <section className='flex-1 flex justify-center items-end'>
        <Btn onClick={() => navigate(-1)}> Go Back </Btn>
      </section>


    </>
  )
}

export default ShiftReports