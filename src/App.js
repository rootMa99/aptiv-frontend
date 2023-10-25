import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/UI/NavBar";
import { Suspense } from "react";
import HomePage from "./pages/HomePage";
import Employee from "./component/employee/Employee";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<HomePage />}>
            <Route path=":matricule" element={<Employee />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
