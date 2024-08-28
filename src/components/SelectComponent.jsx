import React from 'react';

const CustomSelect = ({ label, options, value, onChange }) => (
  <div className='flex flex-col'>
    <label className='font-bold mb-1 text-sm'>{label}</label>

    <select value={value} onChange={onChange} required className='h-10 w-48 border border-black rounded-xl pl-3 bg-slate-100 text-sm'>
      <option value="" disabled>Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CustomSelect;