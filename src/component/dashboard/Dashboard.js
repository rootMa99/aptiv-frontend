import classes from "./DashBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardFilterSelect from "./DashboardFilterSelect";
import { useCallback, useEffect, useState } from "react";
import DashboardDateRange from "./DashboardDateRange";
import DashboardTotal from "./DashboardTotal";
import { dashboardActions } from "../../store/dashboardSlice";
import LoadingFetch from "../UI/LoadingFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
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
  } catch (error) {
    return error;
  }
};

let body = {
  startDate: 0,
  endDate: 0,
};
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
  const [reset, setReset] = useState(classes.displayNone);
  const dispatch = useDispatch();

  const resetAll = () => {
    setTitre("All");
    setTitreFormation("All");
    setCategorie("All");
    setDepartement("All");
  };
  const clickResetHandler = (e) => {
    resetAll();
  };

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.ctrlKey && (e.key === "b" || e.key === "B")) {
        resetAll();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

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
    dispatchType();
  }, [dispatchType]);

  const filtredDashboard = filterFormation(
    dashboards.dashboardData,
    titreFormation,
    tittre,
    categorie,
    departement
  );

  const { nomberPF, nombreSF, totalHeure } = totalDataC(filtredDashboard[0]);

  if (!monthChange && filtredDashboard.length > 0) {
    monthHour = nbMonth(filtredDashboard[0]);
    //monthChange = true;
  }

  const { catPerHour, catForHour } = nbHour(filtredDashboard);

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
  const chooseCategoriePer = (data) => {
    setCategorie(data);
  };
  const chooseDepartement = (data) => {
    setDepartement(data);
  };
  const chooseTitreFormation = (data) => {
    setTitreFormation(data);
  };
  const logic = tittre !== undefined && tittre !== "All";

  useEffect(() => {
    if (departement !== "All" || categorie !== "All" || tittre !== "All") {
      setReset(classes.resetIN);
    }

    const timeoutId = setTimeout(() => {
      setReset(classes.resetOUT);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [departement, categorie, tittre]);

  return (
    <main className={classes.main}>
      {isLoading && <BackDropAlter />}
      {isLoading && <LoadingFetch />}
      <div className={classes.container}>
        <div className={classes.mainFormatter}>
          <div className={classes.phold}>
            <p className={`${classes.reset} ${reset}`}>press crtl+b to reset</p>
          </div>

          <div className={classes.filterContainer}>
            <div className={classes.filterItems}>
              <div className={classes.filterItem}>
                <h3>category </h3>
                <DashboardFilterSelect
                  option={typos.categoriePersonel}
                  identif="CP"
                  chooseCategoriePer={chooseCategoriePer}
                  value={{
                    value: categorie,
                    label: categorie,
                  }}
                />
              </div>
              <div className={classes.filterItem}>
                <h3>departement </h3>
                <DashboardFilterSelect
                  option={typos.departement}
                  identif="DP"
                  chooseDepartement={chooseDepartement}
                  value={{
                    value: departement,
                    label: departement,
                  }}
                />
              </div>
              <div className={classes.filterItem}>
                <h3>training type </h3>
                <DashboardFilterSelect
                  option={typos.catList}
                  cf={true}
                  identif="CF"
                  chooseTitre={chooseTitre}
                  value={{
                    value: tittre,
                    label: tittre,
                  }}
                />
              </div>
              {logic && (
                <div className={classes.filterItem}>
                  <h3>training title </h3>
                  <DashboardFilterSelect
                    option={typos.catList[tittre]}
                    tittre={tittre}
                    identif="CTF"
                    chooseTitreFormation={chooseTitreFormation}
                    value={{
                      value: titreFormation,
                      label: titreFormation,
                    }}
                  />
                </div>
              )}
            </div>
            {(departement !== "All" ||
              categorie !== "All" ||
              tittre !== "All") && (
              <button className={classes.icon} onClick={clickResetHandler}>
                <FontAwesomeIcon
                  icon={faRotateRight}
                  fade
                  size="2xl"
                  style={{ color: "#972121" }}
                />
              </button>
            )}
            <div className={classes.wraperCon}>
              <h3>select Date</h3>
              <DashboardDateRange
                startDate={startDate}
                endDate={endDate}
                chooseDate={chooseDate}
              />
            </div>
            <div className={classes.wraperCon}>
              <h3>total</h3>
              <DashboardTotal
                total={
                  !notify
                    ? { nomberPF, nombreSF, totalHeure }
                    : { nomberPF: 0, nombreSF: 0, totalHeure: 0 }
                }
              />
            </div>
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
