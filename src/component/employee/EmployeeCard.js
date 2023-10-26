
import React from 'react';
import { useSelector } from "react-redux";
import c from "./EmployeeCard.module.css";
import EmployeeFormation from "./EmployeeFormation";
import { useState } from "react";
import BackDrop from "../UI/BackDrop";
import DeleteFormation from "./DeleteFormation";
import EmployeeCardTr from "./EmployeeCardTr";
import AddFormationForm from "./AddFormationForm";
import EditFormation from './EditFormation';

const EmployeeCard = (p) => {
  const [notify, setNotify] = useState(false);
  const [showForm, setShowFrom]= useState(false);
  const [idDel, setIdDel] = useState();
  const [idEdit, setIdEdit] = useState();
  const [showEdit, setShowEdit]= useState(false);

  const onSetId = (id) => {
    setIdDel(id);
    setNotify(true);
  };
  const onSetIdEdit = (formationEdit)=>{
  console.log("this trigger");
    setIdEdit(formationEdit);
    setShowEdit(true);
  } 

  const empl = useSelector((s) => s.empls);
  console.log(empl);
  const onclose = () => {
    setNotify(false);
    setShowFrom(false);
    setShowEdit(false);
  };

  const onAddHandler = (e) => {
    console.log("show form here"+empl.empl.matricule );
    setShowFrom(true);
  };

  let logic = notify || showForm || showEdit;

  return (
    <div className={c.wrapper}>
      {logic && <BackDrop click={onclose} />}
      {notify && <DeleteFormation close={onclose} id={idDel} />}
      {showForm && <AddFormationForm id={empl.empl.matricule} close={onclose} />}
      {showEdit && <EditFormation formationEdit={idEdit} close={onclose} />}
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
          <EmployeeCardTr
            matricule={empl.empl.matricule}
            nom={empl.empl.nom}
            prenom={empl.empl.prenom}
            cin={empl.empl.cin}
            categorie={empl.empl.categorie}
            fonctionEntreprise={empl.empl.fonctionEntreprise}
            departement={empl.empl.departement}
            dateEmbauche={empl.empl.dateEmbauche}
            dateDepart={empl.empl.dateDepart}
          />

          <tr>
            <td colSpan="9">
              <div className={c.addbtnholder}>
                <button className={c.addbtn} onClick={onAddHandler}>
                  add formation
                </button>
              </div>
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
          {empl.empl.formations.length === 0 && (
            <tr>
              <td colSpan="11">
                <p className={c.notfoundform}>no formation found!</p>
              </td>
            </tr>
          )}
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
              onSetId={onSetId}
              onSetIdEdit={onSetIdEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(EmployeeCard);
