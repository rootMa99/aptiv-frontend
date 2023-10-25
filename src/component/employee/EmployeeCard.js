import { useSelector } from "react-redux";
import c from "./EmployeeCard.module.css";
import EmployeeFormation from "./EmployeeFormation";

const EmployeeCard = (p) => {

  const empl= useSelector((s) => s.empls );
  console.log(empl);

  return (
    <div className={c.wrapper}>
      <h1>Employee</h1>
      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>CIN</th>
            <th>Categorie</th>
            <th>Fonction d'Entreprise</th>
            <th>Departement</th>
            <th>Date d'Embauche</th>
            <th>Depart</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>{empl.empl.matricule} </div>
            </td>
            <td>
              <div>{empl.empl.nom} </div>
            </td>
            <td>
              <div>{empl.empl.prenom} </div>
            </td>
            <td>
              <div>{empl.empl.cin} </div>
            </td>
            <td>
              <div>{empl.empl.categorie}</div>
            </td>
            <td>
              <div>{empl.empl.fonctionEntreprise}</div>
            </td>
            <td>
              <div>{empl.empl.departement}</div>
            </td>
            <td>
              <div>{empl.empl.dateEmbauche}</div>
            </td>
            <td>
              <div>{empl.empl.dateDepart}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <h1>formations</h1>
      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>Categorie</th>
            <th>Modalite</th>
            <th>Duree</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Month</th>
            <th>Presentataire</th>
            <th>Formatteur</th>
            <th>EAF</th>
            <th>Bilan</th>
          </tr>
        </thead>
        <tbody>
          {empl.empl.formations.map((m) => (
            <EmployeeFormation
              key={m.formationId}
              id={m.formationId}
              type={m.type}
              categorieFormation={m.categorieFormation}
              modalite={m.modalite}
              duree={m.dureePerHour}
              debut={m.dateDebut}
              fin={m.dateFin}
              month={m.month}
              presentataire={m.presentataire}
              formatteur={m.formatteur}
              eva={m.evaluationAFrois}
              bilan={m.bilan}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeCard;
