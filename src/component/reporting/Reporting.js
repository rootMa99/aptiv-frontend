import { useSelector } from "react-redux";
import c from "./Reporting.module.css";
import cs from './ReportingProcess.module.css';
import DateCriteria from "./DateCriteria";
import UserCriteria from "./UserCriteria";
import AdvancedCriteria from "./AdvancedCriteria";
import ReportingProcess from "./ReportingProcess";
import { useEffect, useState } from "react";
import { formatDate } from "../hooks/dateCriteriaFunctions";
import useGetData from "../hooks/useGetData";
import LoadingFetch from "../UI/LoadingFetch";
import BackDrop from "../UI/BackDrop";
import useExportData from "../hooks/useExportToExcel";

const curretDate = new Date();
const currentYear = curretDate.getFullYear();
const firstJan = new Date(currentYear, 0, 1);
const dec = new Date(currentYear, 11, 31);
const Reporting = (p) => {
  const typos = useSelector((s) => s.typeS);
  const [datecriteria, setDateCriteria] = useState(formatDate(firstJan));
  const [endDate, setEndDate] = useState(formatDate(dec));
  const [userCriteria, setUserCriteria] = useState(null);
  const [advancedCriteria, setAdvacedCriteria] = useState(null);
  const [trainingCriteria, setTrainingCriteria] = useState(null);
  const [fileExcelName, setFileExcelName] = useState("EXPORTED_DATA");
  const [isEmpty, setIsEmpty] = useState(true);

  const { data, loading, error, fetchData } = useGetData();
  const exportToExcel = useExportData();

  const datecriteriaData = (data) => {
    setDateCriteria(data);
  };
  const datecriteriaEndData = (data) => {
    setEndDate(data);
  };
  const userCriteriaData = (data) => {
    setUserCriteria(data);
  };
  const advancedCriteriaData = (data) => {
    setAdvacedCriteria(data);
  };
  const trainingCriteriaData = (data) => {
    setTrainingCriteria(data);
  };
  const modifyFileExcelName = (data) => {
    setFileExcelName(data);
  };

  const submitDataTofetch = async () => {
    const dataBody = {
      type: trainingCriteria,
      categorieFormation: advancedCriteria,
      categoriePersonel: userCriteria,
      startDate: datecriteria,
      endDate: endDate,
    };

    console.log("start fetching");
    await fetchData(
      "http://localhost:8081/formation/formations/type/categorie/percat",
      dataBody
    );
    console.log("start fetching end");

    console.log(data);
    console.log(loading);
    console.log(error);
  };
  useEffect(() => {
    if ("_embedded" in data) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [data]);
  const getReport = (e) => {
    if ("_embedded" in data) {
      exportToExcel(fileExcelName, data._embedded.formationPersonelRests);
    }
    console.log(data._embedded.formationPersonelRests);
  };
  console.log(data);

  console.log(
    datecriteria,
    endDate,
    userCriteria,
    advancedCriteria,
    trainingCriteria,
    fileExcelName
  );
  return (
    <main className={c.main}>
      {loading && <BackDrop />}
      {loading && <LoadingFetch />}
      <div className={c.container}>
        <div className={c.inputContainer}>
          <div className={c.title}>
            <h3>date criteria</h3>
          </div>
          <DateCriteria
            jan={datecriteria}
            dec={endDate}
            setDateRange={datecriteriaData}
            setEndDateC={datecriteriaEndData}
          />
          <div className={c.title}>
            <h3>user criteria</h3>
          </div>
          <UserCriteria
            option={typos.categoriePersonel}
            setUC={userCriteriaData}
          />
          <div className={c.title}>
            <h3>advanced criteria</h3>
          </div>
          <AdvancedCriteria
            option={typos.catList}
            advancedC={advancedCriteriaData}
            trainingC={trainingCriteriaData}
          />
          <div className={c.title}>
            <h3>process Reporting</h3>
          </div>
          <ReportingProcess
            modifyFileExcelName={modifyFileExcelName}
            submitDataTofetch={submitDataTofetch}
          />
        {isEmpty ? (
          <p className={c.para}>no record</p>
        ) : (
          <button className={cs["ui-btn"]} onClick={getReport}>
            <span>export report</span>
          </button>
        )}
        </div>
      </div>
    </main>
  );
};
export default Reporting;
