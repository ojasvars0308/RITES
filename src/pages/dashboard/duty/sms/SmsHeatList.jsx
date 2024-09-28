import React from "react";
import SubHeader from "../../../../components/DKG_SubHeader";
import GeneralInfo from "../../../../components/DKG_GeneralInfo";
import { Table } from "antd";
import data from "../../../../utils/db.json";
import Btn from "../../../../components/DKG_Btn";
import { useNavigate } from "react-router-dom";

const { smsGeneralInfo, smsHeatListData: sampleData } = data;

const columns = [
  {
    title: "S.No.",
    dataIndex: "serialNumber",
    key: "serialNumber",
    fixed: "left",
  },
  {
    title: "Heat Number",
    dataIndex: "heatNumber",
    key: "heatNumber",
    fixed: "left",
  },
  {
    title: "Caster No.",
    dataIndex: "casterNumber",
    key: "casterNumber",
  },
  {
    title: "Seq. No.",
    dataIndex: "seqNumber",
    key: "seqNumber",
  },
  {
    title: "Ladle Chemical Analysis",
    dataIndex: "ladleChemicalAnalysis",
    key: "ladleChemicalAnalysis",
  },
  {
    title: "N",
    dataIndex: "n",
    key: "n",
  },
  {
    title: "O",
    dataIndex: "o",
    key: "o",
  },
  {
    title: "H",
    dataIndex: "h",
    key: "h",
  },
  {
    title: "Vac. Level",
    dataIndex: "vacuumLevel",
    key: "vacuumLevel",
  },
  {
    title: "Deg. Time",
    dataIndex: "degTime",
    key: "degTime",
  },
];

const SmsHeatList = () => {
  const navigate = useNavigate()
  return (
    <>
      <SubHeader title="SMS - Report - Heat List" link="/sms/shiftReports" />
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

export default SmsHeatList;
