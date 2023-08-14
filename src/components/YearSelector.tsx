import React from 'react';
import { YearSelectorProps } from '../utils/interfaces';

const YearSelector: React.FC<YearSelectorProps> = ({ years, selectedYear, onYearSelect }) => {
  return (
    <div>
      <label>Select Year: </label>
      <select className='select' value={selectedYear} onChange={(e) => onYearSelect(Number(e.target.value))}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
