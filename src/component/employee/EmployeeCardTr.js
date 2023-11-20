const EmployeeCardTr = (p) => {
  return (
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
  );
};

export default EmployeeCardTr;
