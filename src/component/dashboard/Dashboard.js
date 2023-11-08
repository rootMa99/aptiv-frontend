import classes from "./DashBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardFilterSelect from "./DashboardFilterSelect";
import { useCallback, useEffect, useState } from "react";
import DashboardDateRange from "./DashboardDateRange";
import DashboardTotal from "./DashboardTotal";
import { formatDate } from "../hooks/dateCriteriaFunctions";
import { dashboardActions } from "../../store/dashboardSlice";
import LoadingFetch from "../UI/LoadingFetch";
import { filterFormation, totalDataC } from "../hooks/filterFormation";
import BackDropAlter from "../UI/BackDropAlter";

const curretDate = new Date();
const currentYear = curretDate.getFullYear();
const jan = new Date(currentYear, 0, 1);
const dec = new Date(currentYear, 11, 31);

const getData = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};

const DashBoard = (p) => {
  const typos = useSelector((s) => s.typeS);
  const dashboards = useSelector((s) => s.dashboardS);
  const [tittre, setTitre] = useState("All");
  const [titreFormation, setTitreFormation] = useState("All");
  const [categorie, setCategorie] = useState("All");
  const [departement, setDepartement] = useState("All");
  const [startDate, setStartDate] = useState(formatDate(jan));
  const [endDate, setEndDate] = useState(formatDate(dec));
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const dispatchType = useCallback(async () => {
    const body = {
      startDate: startDate,
      endDate: endDate,
    };
    setIsLoading(true);
    const data = await getData(
      "http://localhost:8081/formation/formations/Dashboard",
      body
    );
    console.log(data);
    console.log("can dispatch");
    setIsLoading(false);
    dispatch(
      dashboardActions.addDashboard(data._embedded.formationDashboardRests)
    );
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    console.log("useEffect");
    dispatchType();
  }, [dispatchType]);

  console.log(dashboards.dashboardData);

  const {nomberPF, nombreSF, totalHeure}= totalDataC(dashboards.dashboardData);


  const filtredDashboard = filterFormation(
    dashboards.dashboardData,
    titreFormation,
    tittre,
    categorie,
    departement
  );

  console.log(filtredDashboard);

  const chooseDate = (data) => {
    setStartDate(data.startDate);
    setEndDate(data.endDate);
  };

  const chooseTitre = (tittres) => {
    setTitre(tittres);
    if (tittres === "All") {
      setTitreFormation("All");
    }
  };
  console.log(tittre);
  const chooseCategoriePer = (data) => {
    setCategorie(data);
  };
  const chooseDepartement = (data) => {
    setDepartement(data);
  };
  const chooseTitreFormation = (data) => {
    setTitreFormation(data);
  };
  console.log(categorie, departement, titreFormation, startDate, endDate);
  const logic = tittre !== undefined && tittre !== "All";

  return (
    <main className={classes.main}>
      {isLoading && <BackDropAlter />}
      {isLoading && <LoadingFetch />}
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <div className={classes.filterItem}>
            <DashboardFilterSelect
              option={typos.categoriePersonel}
              identif="CP"
              chooseCategoriePer={chooseCategoriePer}
            />
          </div>
          <div className={classes.filterItem}>
            <DashboardFilterSelect
              option={typos.departement}
              identif="DP"
              chooseDepartement={chooseDepartement}
            />
          </div>
          <div className={classes.filterItem}>
            <DashboardFilterSelect
              option={typos.catList}
              cf={true}
              identif="CF"
              chooseTitre={chooseTitre}
            />
          </div>
          {logic && (
            <div className={classes.filterItem}>
              <DashboardFilterSelect
                option={typos.catList[tittre]}
                tittre={tittre}
                identif="CTF"
                chooseTitreFormation={chooseTitreFormation}
              />
            </div>
          )}
          <DashboardDateRange
            startDate={startDate}
            endDate={endDate}
            chooseDate={chooseDate}
          />
          <DashboardTotal total={{nomberPF, nombreSF, totalHeure}}/>
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
