import React from "react";

const RejectionDetailsTable = () => {
  return (
    <div className="p-5">
      <table
        className="border-collapse text-center border-black"
      >
        <thead>
          <tr>
            <th className="border-black p-2.5">Length</th>
            <th className="border-black p-2.5">13m</th>
            <th className="border-black p-2.5">12m</th>
            <th className="border-black p-2.5">11m</th>
            <th className="border-black p-2.5">10m</th>
            <th className="border-black p-2.5">Comp. len.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-black p-2.5">no. of Pcs</td>
            <td className="border-black p-2.5"></td>
            <td className="border-black p-2.5"></td>
            <td className="border-black p-2.5"></td>
            <td className="border-black p-2.5"></td>
            <td className="border-black p-2.5"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RejectionDetailsTable;