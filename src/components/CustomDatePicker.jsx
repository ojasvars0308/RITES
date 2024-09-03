import React from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import 'moment/locale/en-gb'; // To support locale formatting

const CustomDatePicker = ({ label, value, onChange, name }) => {
  const handleChange = (date, dateString) => {
    if (onChange) {
      onChange(name, date ? dateString : null);
    }
  };

//   Convert value to moment object or null
  const formattedValue = value !== null ? moment(value, 'DD/MM/YYYY', true) : null;

  return (
    <Form.Item label={label} name={name}>

    <DatePicker
    
    format="DD/MM/YYYY"
    value={formattedValue}
    onChange={handleChange}
    />
    </Form.Item>
  );
};

export default CustomDatePicker;