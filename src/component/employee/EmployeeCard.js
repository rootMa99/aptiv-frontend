import c from "./EmployeeCard.module.css";
import EmployeeFormation from "./EmployeeFormation";

const EmployeeCard = (p) => {
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
              <div>{p.matricule} </div>
            </td>
            <td>
              <div>{p.nom} </div>
            </td>
            <td>
              <div>{p.prenom} </div>
            </td>
            <td>
              <div>{p.cin} </div>
            </td>
            <td>
              <div>{p.categorie}</div>
            </td>
            <td>
              <div>{p.fonctionEntreprise}</div>
            </td>
            <td>
              <div>{p.departement}</div>
            </td>
            <td>
              <div>{p.dateEmbauche}</div>
            </td>
            <td>
              <div>{p.dateDepart}</div>
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
          {p.formations.map((m) => (
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
