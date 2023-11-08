import { useState } from "react";
import c from "./ReportingProcess.module.css";

const ReportingProcess = (p) => {

const [fileName, setFileName]=useState("");


const onchangeHandler=e=>{
  
    setFileName(e.target.value);
    if(e.target.value.trim()===""){
     p.modifyFileExcelName('EXPORTED_DATA') 
    }else{
      p.modifyFileExcelName(e.target.value);
    }
  
} 

  const submitHandler=(e)=>{
    e.preventDefault();
    p.submitDataTofetch();
    setFileName('')

  }


  return (
    <form className={c.formc} onSubmit={submitHandler}>
      <div className={c.reportingHolder}>
        <label htmlFor="ec" className={c.label}>
          Report Title
        </label>
        <div>
          <div className={c.formcontrol}>
            <input
              id="ec"
              className={`${c.input} ${c.inputalt}`}
              placeholder="E&C"
              required=""
              type="text"
              value={fileName}
              onChange={onchangeHandler}

            />
            <span className={`${c.inputborder} ${c.inputborderalt}`}></span>
          </div>
          <p className={c.parg}>
            (If no Report title is entred, the title of report will default to
            exported_data)
          </p>
        </div>
      </div>
      <button className={c['ui-btn']}>
        <span>process report</span>
      </button>
    </form>
  );
};

export default ReportingProcess;
