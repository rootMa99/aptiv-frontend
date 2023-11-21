import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/UI/NavBar";
import { Suspense, useCallback, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import Employee from "./component/employee/Employee";
import { useDispatch } from "react-redux";
import { typeAction } from "./store/allType-slice";
import Reporting from "./component/reporting/Reporting";
import LoadingFetch from "./component/UI/LoadingFetch";
import DashBoard from "./component/dashboard/DashBoard";
import BackDropAlter from "./component/UI/BackDropAlter";
import { formatDate } from "./component/hooks/dateCriteriaFunctions";
import { dashboardActions } from "./store/dashboardSlice";
import UploadFiles from "./component/upload/UploadFiles";

const getData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};

const curretDate = new Date();
const currentYear = curretDate.getFullYear();
const jan = new Date(currentYear, 0, 1);
const dec = new Date(currentYear, 11, 31);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  dispatch(
    dashboardActions.setSelectedDate({
      startDate: formatDate(jan),
      endDate: formatDate(dec),
    })
  );

  const dispatchType = useCallback(async () => {
    //http req
    const data = await getData("http://localhost:8081/formation/allType");
    setIsLoading(false);
    dispatch(typeAction.addtypes(data));
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    dispatchType();
  }, [dispatchType]);

  return (
    <div className="App">
      <NavBar />
      {isLoading && <BackDropAlter />}
      {isLoading && <LoadingFetch />}
      <Suspense>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<HomePage />}>
            <Route path=":matricule" element={<Employee />} />
          </Route>
          <Route exact path="/reporting" element={<Reporting />} />
          <Route
            exact
            path="/dashboard"
            element={
              <DashBoard
                yearDate={{ jan: formatDate(jan), dec: formatDate(dec) }}
              />
            }
          />
          <Route exact path="/uploadFiles" element={<UploadFiles />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
