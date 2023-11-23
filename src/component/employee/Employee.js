import { useCallback, useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import Loading from "../UI/Loading";
import c from "./Employee.module.css";
import { useDispatch } from "react-redux";
import EmployeeSlice from "../../store/EmployeeSlice";
import { useNavigate, useParams } from "react-router-dom";
import { typeAction } from "../../store/allType-slice";

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

const Employee = (p) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { matricule } = useParams();
  const [dataC, setDataC]= useState('');
  const navigate = useNavigate();

  // const callback = useCallback(() => {
  //   setIsLoading(true);
  //   dispatch(EmployeeSlice.actions.addEmployee(EMPLOYEE_DEMO));
  //   setIsLoading(false);
  // }, [dispatch]);

  // useEffect(() => {
  //   callback();
  // }, [callback]);

  const dispatchType = useCallback(async () => {
    setIsLoading(true);
    const data = await getData(
      `http://localhost:8081/personel/personel/${matricule}`
    );
    setIsLoading(false);
    if (data !== undefined) {
      dispatch(EmployeeSlice.actions.addEmployee(data));
      const payload = {
        matricule: data.matricule,
        nom: data.nom,
        prenom: data.prenom,
        categorie: data.categorie,
        departement: data.departement,
        lastSearch: new Date(),
      };
      dispatch(typeAction.addRecentSearch(payload));
    } else {
      dispatch(EmployeeSlice.actions.addEmployee({}));
    }
  }, [dispatch, setIsLoading, matricule]);

  useEffect(() => {
    dispatchType();
  }, [dispatchType]);

  const onChangeHandler=e=>{
    setDataC(e.target.value);
  }
  const onClickHandler=e=>{
    if (dataC.trim()!==""){
    navigate(`/home/${dataC}`);
    setDataC('');
    }
  }
  return (
    <div className={c.container}>
      <div className={c.inputHolder}>
        <input type="number" value={dataC} min={1} placeholder="Search By matricule" onChange={onChangeHandler}/>
        <button onClick={onClickHandler}>Search</button>
      </div>
      {!isLoading ? <EmployeeCard /> : <Loading />}
    </div>
  );
};

export default Employee;
