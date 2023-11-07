import { useSelector } from "react-redux";
import c from "./Reporting.module.css";
import DateCriteria from "./DateCriteria";
import UserCriteria from "./UserCriteria";
import AdvancedCriteria from "./AdvancedCriteria";
import ReportingProcess from "./ReportingProcess";

const Reporting = (p) => {
  const typos = useSelector((s) => s.typeS);




  return (
    <main className={c.main}> 
      <form className={c.container}>
        <div className={c.inputContainer}>
          <div className={c.title}>
            <h3>date criteria</h3>
          </div>
          <DateCriteria />
          <div className={c.title}>
            <h3>user criteria</h3>
          </div>
          <UserCriteria option={typos.categoriePersonel} />
          <div className={c.title}>
            <h3>advanced criteria</h3>
          </div>
          <AdvancedCriteria option={typos.catList} />
          <div className={c.title}>
            <h3>process Reporting</h3>
          </div>
            <ReportingProcess />
        </div>
       
      </form>
    </main>
  );
};
export default Reporting;
