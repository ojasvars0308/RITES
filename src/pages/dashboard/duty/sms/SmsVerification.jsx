import React from "react";
import { Table } from "antd";
import SubHeader from "../../../../components/DKG_SubHeader";
import GeneralInfo from "../../../../components/DKG_GeneralInfo";
import { useNavigate } from "react-router-dom";
import Btn from "../../../../components/DKG_Btn";
import data from "../../../../utils/db.json";

const { smsVerificationReportData: sampleData, smsGeneralInfo } = data;

const columns = [
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
  },
  {
    title: "Cast Number",
    dataIndex: "castNumber",
    key: "castNumber",
  },
  {
    title: "Turn Down Temperature",
    dataIndex: "turnDownTemperature",
    key: "turnDownTemperature",
  },
  {
    title: "Witnessed / Verified",
    dataIndex: "witnessedVerified",
    key: "witnessedVerified",
  },
];

const SmsVerification = () => {
  const navigate = useNavigate()
  return (
    <>
      <SubHeader title="SMS - Verification Report" link="/sms/shiftReports" />
      <GeneralInfo data={smsGeneralInfo} />
      <section>
        <Table
          dataSource={sampleData}
          columns={columns}
          scroll={{ x: true }}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
        />
      </section>
      <section className="flex-1 flex items-end justify-center">
        <Btn onClick={() => navigate(-1)}> Go Back </Btn>
      </section>
    </>
  );
};

export default SmsVerification;
