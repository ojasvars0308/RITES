import React from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;

const TextAreaComponent = ({
  label,
  name,
  value,
  rows,
  onChange,
  required,
}) => {
  const handleChange = (e) => {
    if (onChange) onChange(name, e.target.value);
  };

  return (
    <Form.Item label={label} name={name}>
      <TextArea rows={rows} onChange={handleChange} value={value} autoSize={{ minRows: 1, maxRows: 16 }} />
    </Form.Item>
  );
};
export default TextAreaComponent;
