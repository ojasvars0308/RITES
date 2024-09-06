import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = ({ placeholder, onSearch, className }) => {
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      className={className}
    />
}

export default SearchInput