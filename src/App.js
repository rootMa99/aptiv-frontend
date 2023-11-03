import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/UI/NavBar";
import { Suspense, useCallback, useEffect} from "react";
import HomePage from "./pages/HomePage";
import Employee from "./component/employee/Employee";
import { useDispatch } from "react-redux";
import { typeAction } from "./store/allType-slice";
import Reporting from "./component/reporting/Reporting";



const typo = {
  catList: {
    "H&S": [
      "BBS Training",
      "Cyber Security",
      "EHS Policy/BBS/Emergency evacuation",
      "EHS Policy/Emergency evacuation/Séparation de déchet",
      "Equipière de première intervention",
      "Formation d'évacuation",
      "Sensibilisation EPI",
    ],
    Softskills: [
      "Administration du personnel",
      "Communication Interpersonnelle",
      "Formation Gestion d'équipe",
      "Intelligence emotionnelle",
    ],
    "Lean 2.0": ["Lean Leadership Training", "Lean basics training"],
    Process: [
      "Cyber Security",
      "Formation Collecte Scrap",
      "Formation FA Spécifique polyvalent",
      "Formation d'intégration",
      "Formation des aides magasiniers",
      "Formation des alimentateurs des fils",
      "Formation des délègués: Legal Aspects",
      "Procédure de formation des DH / OJT & LC",
      "Qualification FA CE",
      "Qualification FA CG",
      "Qualification FA CM",
      "Qualification FA Contention",
      "Qualification FA Emballage",
      "Qualification FA Réparation (Retouche du cablage)",
      "Qualification FA Réparation des inverses (ROB)",
      "Qualification FA Sealing",
      "Qualification FA Test fusible",
      "Qualification FA Térostat",
      "Qualification FA USW",
      "Qualification FA Vissage",
      "Qualification FA sealing",
      "Qualification LP BT752",
      "Qualification LP Etamage manuel",
      "Qualification LP HSGM",
      "Qualification LP Hunk",
      "Qualification LP Seal Komax",
      "Qualification LP Sealing",
      "Qualification LP Sertissage manuel",
      "Qualification LP Sertissage manuel sous base",
      "Qualification LP Sertissage manuel sous base 752/722",
      "Qualification LP Sertissage manuel sous base machine de coupe",
      "Qualification LP Torssade",
      "Qualification LP Tube Ulmer",
      "Qualification LP alpha 560",
      "Qualification LP delivery route",
      "Qualification cutting 0,13",
      "Qualification cutting Seal Komax",
      "Qualification cutting alpha 433",
      "Qualification cutting alpha 477",
      "Qualification cutting alpha 550",
      "Recyclage Maternité",
      "Recyclage après shut down",
      "Recyclage après shut down (Aout)",
      "Recyclage de qualité",
      "Recyclage longue maladie",
      "Recyclage sur les problèmes de qualité",
      "Recyclage sur les problèmes de qualité (manque marquage)",
      "Recyclage sur machine de coupe 433s",
      "Reformation cutting alpha 550",
      "Sensibilisation Caractéristique Spéciaux",
      "Sensibilisation missing relay BFRMA/R5",
      "Sensibilisation sur check-list maintenace 1ère Nv",
      "Sensibilisation sur connecteur outside plasic bag",
      "Sensibilisation sur fil desencliqueté Con BFRMA V2",
      "Sensibilisation sur fil desencliqueté Con BFRMA V2 ",
      "Sensibilisation sur les normes de qualité",
      "Sensibilisation sur les pinces vide",
      "Sensibilisation sur les problèmes de qualité ",
      "Sensibilisation sur les problèmes de qualité répetitif",
      "Sensibilisation sur les procédures de réparation (Retouche)",
      "Sensibilisation sur reclamation client Con à l'extérieur du sac en plastique",
      "Sensibilisation sur reclamation client fixation nok ",
      "Sensibilisation sur reclt clt sur harnesses' labels stuck together",
      "Sensibilisation sur remplissage du rapport",
      "Sensibilisation sur réparation non conforme",
      "Sensibilisation sur terminal désencliqueté",
      "Sensibilisation sur terminal désencliqueté, BFRMA V2 (R8 position)",
      "Sensibilisation sur tube mal fixé",
      "Sensibilisation unseated terminal 1320B V44",
      "Sertissage manuel à base BT752",
      "Sertissage manuel à base alpha 560",
    ],
    Technique: [
      "Contingency plan training",
      "Feasability Requirement training",
    ],
    "Added Categorie899": ["Added Type345 "],
  },
  categoriePersonel: ["DH", "IH", "IS"],
  departement: [
    "ASSEMBLY-4-",
    "CUTTING-4-",
    "DEVELOPPEMENT H.R-4-",
    "ENGINEERING-4-",
    "GENERAL MANAGEMENT-4-",
    "HUMAN RESSOURCES-4-",
    "IT -4-",
    "LOGISTIC IMPO.EXPO.-4-",
    "MAINTENANCE-4-",
    "PROCESS ENGI.-4-",
    "PURCHASING-4-",
    "QUALITY-4-",
    "RELATIONS INDUST.H.R-4-",
    "SAFETY H.R-4-",
  ],
};

function App() {
  console.log("App run")

  const dispatch= useDispatch();

  const dispatchType= useCallback(()=>{
    //http req 
    dispatch(typeAction.addtypes(typo));
  }, [dispatch])

  useEffect(()=>{
    dispatchType();
  })

  return (
    <div className="App">
      <NavBar />
      <Suspense>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<HomePage />}>
            <Route path=":matricule" element={<Employee />} />
          </Route>
          <Route exact path="/reporting" element={<Reporting />} />

        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
