import { useState } from "react";
import c from "./DateCriteria.module.css";
import { formatDate, getCurrentMonth, getCurrentWeek, getCurrentYear, getLastMonth } from "../hooks/dateCriteriaFunctions";


const curretDate = new Date();
const currentYear = curretDate.getFullYear();
const firstJan = new Date(currentYear, 0, 1);
const dec = new Date(currentYear, 11, 31);

const DateCriteria = (p) => {
  const [startDate, setStartDate] = useState(formatDate(firstJan));
  const [endDate, setendDate] = useState(formatDate(dec));
  const [valueSlected, selectValuec]= useState("all");


  const yearSelectOptChange = (e) => {
    selectValuec(e.target.value);
    if (e.target.value === "year") {
      const{firstJan, dec}= getCurrentYear();
      setStartDate(firstJan);
      setendDate(dec);
    }
    if (e.target.value==="thisWeek"){
      const {startDWeek, endDWeek}=getCurrentWeek("current");
      setStartDate(startDWeek);
      setendDate(endDWeek);
    }
    if (e.target.value==="lastWeek"){
      const {startDWeek, endDWeek}=getCurrentWeek("last");
      setStartDate(startDWeek);
      setendDate(endDWeek);
    }
    if(e.target.value==="month"){
      const { firstDayOfMonth, lastDayOfMonth}= getCurrentMonth();
      setStartDate(firstDayOfMonth);
      setendDate(lastDayOfMonth);
    }
    if(e.target.value==="lastMonth"){
      const { firstDayOfMonth, lastDayOfMonth}= getLastMonth();
      setStartDate(firstDayOfMonth);
      setendDate(lastDayOfMonth);
    }


  };

  const changeStartDate = (e) => {
    selectValuec("all");

   setStartDate(e.target.value)
   
  };
  const changeEndDate = (e) => {
    selectValuec("all");
   setendDate(e.target.value)
  };


  return (
    <div className={c.inputContainerDate}>
      <div className={c.labelC}>
        <label htmlFor="datecriteria">date criteria</label>
        <select
          id="datecriteria"
          value={valueSlected}
          className={c.datecriteria}
          onChange={yearSelectOptChange}
        >
          <option value="all">Select an option</option>
          <option value="year">current year</option>
          <option value="thisWeek">current week</option>
          <option value="lastWeek">last week</option>
          <option value="month">current month</option>
          <option value="lastMonth">last month</option>
        </select>
      </div>
      <div className={c.labelC}>
        <label htmlFor="from">from</label>
        <input
          id="from"
          type="date"
          value={startDate}
          onChange={changeStartDate}
        />
      </div>
      <div className={c.labelC}>
        <label htmlFor="to">to</label>
        <input
          id="to"
          type="date"
          value={endDate}
          onChange={changeEndDate}
        />
      </div>
    </div>
  );
};
export default DateCriteria;
