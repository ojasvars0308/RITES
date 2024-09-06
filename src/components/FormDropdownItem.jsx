import React from 'react'
import {Form, Select} from "antd"

const { Option } = Select;

const FormDropdownItem = ({label, name, onChange, dropdownArray, valueField, visibleField, required}) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required: required ? true : false, message: 'Please input your value!' }]}>
      <Select onChange={(value)=>onChange(name, value)}>
        {
            dropdownArray.map((item, key)=>(
                <Option key={key} value={item[valueField]}> {item[visibleField]} </Option>
            ))
        }
      </Select>
    </Form.Item>
  )
}

export default FormDropdownItem
