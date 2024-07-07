import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
//import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일 불러오기

const MyCalendar = ({ onChange, value }) => {
    const [nowDate, setNowDate] = useState("날짜");
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (selectedDate: moment.MomentInput) => {
        onChange(selectedDate);
        setIsOpen(false);
        setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
    };

    return (
        <div>
            <button onClick={handleToggleCalendar}>{nowDate}</button>
            {isOpen && <Calendar onChange={handleDateChange} value={value} />}
        </div>
    );
};

export default MyCalendar;
