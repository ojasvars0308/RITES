import React from 'react'
import {Form, Input} from "antd"

const FormInputItem = ({label, name, value, onChange, readOnly, disabled, className, placeholder, required}) => {
  const handleChange = (e) => {
    if(onChange)
      onChange(name, e.target.value)
  }
  return (
    <Form.Item label={label} className={`!mb-4`} name={name}
      // rules = {rules}
      rules={[{ required: required ? true : false, message: 'Please input your value!' }]}
    >
      <Input value={value} onChange={handleChange} readOnly={readOnly} disabled={disabled} placeholder={placeholder}/>
    </Form.Item>
  )
}

export default FormInputItem