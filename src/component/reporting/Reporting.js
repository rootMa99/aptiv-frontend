import { useSelector } from "react-redux";
import c from "./Reporting.module.css";
import DateCriteria from "./DateCriteria";
import UserCriteria from "./UserCriteria";

const Reporting = (p) => {
  const typos = useSelector((s) => s.typeS);
  
  console.log(typos);
  return (
    <main>
      <form className={c.container}>
        <div className={c.inputContainer}>
          <div className={c.title}>
            <h3>date criteria</h3>
          </div>
          <DateCriteria />
          <div className={c.title}>
            <h3>user criteria</h3>
          </div>
          <UserCriteria  />
        </div>
      </form>
    </main>
  );
};
export default Reporting;
