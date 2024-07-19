import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/datepicker.css';

interface MyCalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ selectedDate, onChange }) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onChange(date)}
        inline // 달력을 인라인으로 표시
      />
    </div>
  );
};

export default MyCalendar;
