import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateQueryFields = ({ handleDateSelected = () => {} }) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    if (start && end) {
      handleDateSelected([start.toISOString(), end.toISOString()].join(','));
    }
  }, [start, end]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <label htmlFor="date-filter-start">Between Dates:</label>
      <DatePicker
        id="date-filter-start"
        selected={start}
        onChange={(date) => setStart(date)}
        selectsStart
        startDate={start}
        endDate={end}
        dateFormat="dd/MM/yyyy"
      />

      <label htmlFor="date-filter-end">And:</label>
      <DatePicker
        id="date-filter-end"
        selected={end}
        onChange={(date) => setEnd(date)}
        selectsEnd
        startDate={start}
        endDate={end}
        minDate={start}
        dateFormat="dd/MM/yyyy"
      />
    </>
  );
};

export default DateQueryFields;
