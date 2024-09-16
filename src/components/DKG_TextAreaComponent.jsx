import React from 'react';
import { Form, Input } from 'antd';
const { TextArea } = Input;

const DKG_TextAreaComponent = ({ label, name, value, rows, onChange, required }) => {
  const handleChange = (e) => {
    if(onChange)
      onChange(name, e.target.value)
  }

  return (
    <Form.Item label={label} name={name}>
      <TextArea rows={rows} onChange={handleChange} value={value} />
    </Form.Item>
  )
}
export default DKG_TextAreaComponent;