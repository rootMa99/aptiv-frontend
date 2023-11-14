import classes from "./DashBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardFilterSelect from "./DashboardFilterSelect";
import { useCallback, useEffect, useState } from "react";
import DashboardDateRange from "./DashboardDateRange";
import DashboardTotal from "./DashboardTotal";
import { dashboardActions } from "../../store/dashboardSlice";
import LoadingFetch from "../UI/LoadingFetch";
import {
  filterFormation,
  nbHour,
  nbMonth,
  totalDataC,
} from "../hooks/filterFormation";
import BackDropAlter from "../UI/BackDropAlter";
import DashboardBarChart from "./DashboardBarChart";
import Notification from "../UI/Notification";
import DashboardLineChart from "./DashboardLineChart";

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

let body = {
  startDate: 0,
  endDate: 0,
};
console.log(body);
let monthChange = false;
let monthHour;
const DashBoard = (p) => {
  const typos = useSelector((s) => s.typeS);
  const dashboards = useSelector((s) => s.dashboardS);
  const [tittre, setTitre] = useState("All");
  const [titreFormation, setTitreFormation] = useState("All");
  const [categorie, setCategorie] = useState("All");
  const [departement, setDepartement] = useState("All");
  const [startDate, setStartDate] = useState(dashboards.selectedDate.startDate);
  const [endDate, setEndDate] = useState(dashboards.selectedDate.endDate);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const dispatch = useDispatch();

  const dispatchType = useCallback(async () => {
    if (
      dashboards.dashboardData.length <= 0 ||
      body.startDate !== startDate ||
      body.endDate !== endDate
    ) {
      body = {
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
      setNotify(false);
      if (data.hasOwnProperty("_embedded")) {
        dispatch(
          dashboardActions.addDashboard(data._embedded.formationDashboardRests)
        );
      } else {
        setNotify(true);
      }
    }
  }, [dispatch, startDate, endDate, dashboards.dashboardData]);

  useEffect(() => {
    console.log("useEffect dashboard");
    dispatchType();
  }, [dispatchType]);

  console.log(dashboards.dashboardData);

  const { nomberPF, nombreSF, totalHeure } = totalDataC(
    dashboards.dashboardData
  );

  if (!monthChange && dashboards.dashboardData.length > 0) {
    monthHour = nbMonth(dashboards.dashboardData);
    monthChange = true;
  }
  console.log(monthHour);

  const filtredDashboard = filterFormation(
    dashboards.dashboardData,
    titreFormation,
    tittre,
    categorie,
    departement
  );

  console.log(filtredDashboard);

  const { catPerHour, catForHour } = nbHour(filtredDashboard);
  console.log(catForHour, catPerHour);

  const chooseDate = (data) => {
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    dispatch(
      dashboardActions.setSelectedDate({
        startDate: data.startDate,
        endDate: data.endDate,
      })
    );
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
        <div className={classes.mainFormatter}>
          <div className={classes.filterContainer}>
            <div className={classes.filterItem}>
              <h3>category </h3>
              <DashboardFilterSelect
                option={typos.categoriePersonel}
                identif="CP"
                chooseCategoriePer={chooseCategoriePer}
              />
            </div>
            <div className={classes.filterItem}>
              <h3>departement </h3>
              <DashboardFilterSelect
                option={typos.departement}
                identif="DP"
                chooseDepartement={chooseDepartement}
              />
            </div>
            <div className={classes.filterItem}>
              <h3>training title </h3>
              <DashboardFilterSelect
                option={typos.catList}
                cf={true}
                identif="CF"
                chooseTitre={chooseTitre}
              />
            </div>
            {logic && (
              <div className={classes.filterItem}>
                <h3>training type </h3>
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
            <DashboardTotal total={{ nomberPF, nombreSF, totalHeure }} />
          </div>
          {notify ? (
            <Notification />
          ) : (
            <div className={classes.chartContainer}>
              {filtredDashboard.length > 0 && (
                <div className={classes.barcontainer}>
                  <DashboardBarChart
                    data={catPerHour}
                    nameLabel="Personnel/Hour"
                  />
                </div>
              )}
              {filtredDashboard.length > 0 && (
                <div className={classes.barcontainer}>
                  <DashboardBarChart
                    data={catForHour}
                    nameLabel="Formation/Hour"
                  />
                </div>
              )}
            </div>
          )}
          <div className={classes.lineChart}>
            {dashboards.dashboardData.length > 0 && (
              <DashboardLineChart data={monthHour} labelName="Month/Hour" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
