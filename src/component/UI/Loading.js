import c from "./Loading.module.css";

const Loading = (p) => {
  return (
    <div className={c.wrapper}>
        <h1>Employee</h1>
        <table>
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
          <tr>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
          </tr>
        </table>
        <h1>formations</h1>
        <table>
          <tr>
            <th>type</th>
            <th>Categorie</th>
            <th>Duree</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Presentataire</th>
            <th>Formatteur</th>
            <th>EAF</th>
            <th>Bilan</th>
          </tr>
          <tr>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
            <td>
              <div className={c.textLine}></div>
            </td>
          </tr>
        </table>
      </div>
  );
};

export default Loading;
