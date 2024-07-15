import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/datepicker.css'
interface MyCalendarProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ selectedDate, onChange }) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        inline // 달력을 인라인으로 표시
      />
    </div>
  );
};

export default MyCalendar;
