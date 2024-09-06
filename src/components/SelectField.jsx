import React, { useState }  from 'react'
import { Select, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const { Option } = Select;

const SelectField = ({ label, options, onSelectChange, selectedValue }) => {
  return (
    <Space>
        <FilterOutlined />

        <Select 
            placeholder={label}
            onChange={onSelectChange} 
            value={selectedValue}
            style={{ width: 200 }}
        >
            {Object.keys(options).map(key => (
                <Option key={key} value={key}>{key}</Option>
            ))}
        </Select>
    </Space>
  )
}

export default SelectField