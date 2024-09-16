import React from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import 'moment/locale/en-gb'; // To support locale formatting

const DKG_CustomDatePicker = ({ label, value, onChange, name, className, disabled, required }) => {
  const handleChange = (date, dateString) => {
    if (onChange) {
      onChange(name, date ? dateString : null);
    }
  };

//   Convert value to moment object or null
  const formattedValue = value ? moment(value, 'DD/MM/YYYY', true) : null;
  if(formattedValue !== null){
    console.log("NAME: ", name, formattedValue.isValid())
  }

  return (
    <Form.Item 
      label={label}
      rules={[{ required: required ? true : false, message: 'Please input your value!' }]}
      shouldUpdate={(prevValues, currentValues) => {
        console.log("PREV CURR: ", prevValues, currentValues)
        const update = moment(prevValues[name], 'DD/MM/YYYY', true) !== moment(currentValues[name], 'DD/MM/YYYY', true)
        console.log("UPATE OR NO: ",name, update)
        return update
      }}
      className={className}
    >

    <DatePicker
      format="DD/MM/YYYY"
      value={formattedValue}
      onChange={handleChange}
    />
    </Form.Item>
  );
};

export default DKG_CustomDatePicker;