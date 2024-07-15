import React from 'react';
import "./css/monthpicker.css"
import 'react-datepicker/dist/react-datepicker.css'

interface MonthPickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ selectedDate, onChange }) => {
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value, 10);
    const newDate = new Date(selectedDate.getFullYear(), month, 1);
    onChange(newDate);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    const newDate = new Date(year, selectedDate.getMonth(), 1);
    onChange(newDate);
  };

  return (
    <div className='monthpicker'>
      <select className="select" value={selectedDate.getFullYear()} onChange={handleYearChange}>
        {Array.from({ length: 10 }, (_, i) => {
          const year = new Date().getFullYear() - 5 + i;
          return <option key={year} value={year}>{year}</option>;
        })}
      </select>
      <select className="select" value={selectedDate.getMonth()} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>{i + 1}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthPicker;
