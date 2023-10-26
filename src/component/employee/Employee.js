import { useCallback, useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import Loading from "../UI/Loading";
import c from "./Employee.module.css";
import { useDispatch } from "react-redux";
import EmployeeSlice from "../../store/EmployeeSlice";

const EMPLOYEE_DEMO = {
  matricule: 5,
  nom: "EL HAMMIOUI",
  prenom: "RACHIDA",
  cin: "D510261",
  categorie: "IH",
  fonctionEntreprise: "Technicien Ingénierie",
  departement: "ENGINEERING-4-",
  dateEmbauche: "2002-02-04",
  dateDepart: null,
  formations: [
    {
      formationId: "tYSgcuPesWlZxSYYJBS1xA",
      type: "Qualification FA USW",
      categorieFormation: "Softskills",
      modalite: "Présentielle",
      dureePerHour: 8.0,
      dateDebut: "2023-09-12",
      dateFin: "2023-07-15",
      month: 9,
      presentataire: "AUTRE",
      formatteur: "NJOUMI Tarek",
      evaluationAFrois: false,
      bilan: "Done",
    },
    {
      formationId: "irBro5DLSQBFaLrxpa3nBm",
      type: "BBS Training",
      categorieFormation: "H&S",
      modalite: "Présentielle",
      dureePerHour: 4.0,
      dateDebut: "2023-03-17",
      dateFin: "2023-03-17",
      month: 3,
      presentataire: "APTIV",
      formatteur: "FATEN Karim",
      evaluationAFrois: true,
      bilan: "Done",
    },
    {
      formationId: "2zCdqKQjjY2jJylwdXo1W2",
      type: "Lean basics training",
      categorieFormation: "Lean 2.0",
      modalite: "Présentielle",
      dureePerHour: 4.0,
      dateDebut: "2023-03-04",
      dateFin: "2023-03-04",
      month: 3,
      presentataire: "APTIV",
      formatteur: "HAIDAR Ouassil",
      evaluationAFrois: true,
      bilan: "Done",
    },
  ],
  _links: {
    personels: {
      href: "http://localhost:8081/personel/personels",
    },
    self: {
      href: "http://localhost:8081/personel/personel/5",
    },
  },
};
const Employee = (p) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const callback = useCallback(() => {
    dispatch(EmployeeSlice.actions.addEmployee(EMPLOYEE_DEMO));
  }, [dispatch]);

  useEffect(() => {
    callback();
    console.log("effect runing");
  });

  return (
    <div className={c.container}>
      {!isLoading ? <EmployeeCard /> : <Loading />}
    </div>
  );
};

export default Employee;
