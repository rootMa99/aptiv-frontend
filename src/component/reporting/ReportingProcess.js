import c from "./ReportingProcess.module.css";

const ReportingProcess = (p) => {
  return (
    <form className={c.formc}>
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
