import React from 'react';

const ChunkSelector = ({ options, onChange, value }) => (
  <select
    onChange={(event) => {
      console.log(event);
      onChange(event.target.value);
    }}
    value={value}>
    {options.map((option) => (
      <option value={option} key={option}>{option}</option>
    ))}
  </select>
);

export default ChunkSelector;
