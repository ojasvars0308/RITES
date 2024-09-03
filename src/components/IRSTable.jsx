import React from 'react';

const IRSTable = ({ headers, data, onSelectChange }) => {
  return (
    <table className=" bg-white border border-gray-300">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="py-2 px-1 border-b-2 border-x-2 border-gray-300 bg-gray-100 text-left"
            >
              {header.render ? header.render() : header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-3 px-3 border-x-2 border-y-2 border-gray-300">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IRSTable;