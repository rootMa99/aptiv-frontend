import { useState } from "react";
import c from "./DashboardDateRange.module.css";




const DashboardDateRange = (p) => {

    const [startDate, setStartDate] = useState(p.startDate);
  const [endDate, setendDate] = useState(p.endDate);

  const startDateChange=e=>{
    setStartDate(e.target.value);
    p.chooseDate({startDate:e.target.value, endDate:endDate});
  }
  const endDateChange=e=>{
    setendDate(e.target.value);
    p.chooseDate({startDate:startDate, endDate:e.target.value});

  }

  return (
    <div className={c.dateContainer}>
      <div className={c.date}>
        <label htmlFor="startdate">Start Date</label>
        <input id="startdate" type="date" value={startDate} onChange={startDateChange} />
      </div>
      <div className={c.date}>
        <label htmlFor="enddate">End Date</label>
        <input id="enddate" type="date" value={endDate} onChange={endDateChange}/>
      </div>
    </div>
  );
};
export default DashboardDateRange;
