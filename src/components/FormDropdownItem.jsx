import React from 'react'
import {Form, Select} from "antd"

const { Option } = Select;

const FormDropdownItem = ({label, name, placeholder, onChange, dropdownArray, defaultValue, valueField, visibleField, required, className }) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required: required ? true : false, message: 'Please input your value!' }]} className={className}>
      <Select onChange={(value)=>onChange(name, value)} placeholder={placeholder} defaultValue={defaultValue} >
        {
            dropdownArray.map((item, key)=>(
                <Option key={key} value={item[valueField]} defaultValue={defaultValue}> {item[visibleField]} </Option>
            ))
        }
      </Select>
    </Form.Item>
  )
}

export default FormDropdownItem
