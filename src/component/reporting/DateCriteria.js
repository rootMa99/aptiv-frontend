import c from "./DateCriteria.module.css";

const DateCriteria = (p) => {


  return (
    <div className={c.inputContainerDate}>
      <div className={c.labelC}>
        <label htmlFor="datecriteria">date criteria</label>
        <select id="datecriteria" className={c.datecriteria}>
          <option value="year">this year</option>
          <option value="currentWeek">this week</option>
          <option value="lastWeek">last week</option>
          <option value="month">this month</option>
        </select>
      </div>
      <div className={c.labelC}>
        <label htmlFor="from">from</label>
        <input id="from" type="date" />
      </div>
      <div className={c.labelC}>
        <label htmlFor="to">to</label>
        <input id="to" type="date" />
      </div>
    </div>
  );
};
export default DateCriteria;
