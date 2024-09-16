import React from 'react'
import {Form, Input, InputNumber} from "antd"

const DKG_FormInputItem = ({label, name, value, onChange, readOnly, disabled, className, placeholder, required, type, defaultValue, minLength, maxLength}) => {
  const handleChange = (e) => {
    if(onChange)
      onChange(name, e.target.value)
  }
  
  return (
    <Form.Item label={label} name={name}
      rules={[{ required: required ? true : false, message: 'Required!' }]}
      className={className}
    >
      {
        type === 'number' ? 
        <InputNumber
        step={1}          // Increment/decrement step
        value={value}
        onChange={handleChange}
        style={{ width: '100%' }} // Adjust width as needed
      />
      :
        <Input value={value} onChange={handleChange} readOnly={readOnly} disabled={disabled} placeholder={placeholder} defaultValue={defaultValue} minLength={minLength} maxLength={maxLength} />
      }
    </Form.Item>
  )
}

export default DKG_FormInputItem