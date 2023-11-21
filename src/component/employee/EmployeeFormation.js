import { Fragment } from "react";
import c from "./EmployeeFormation.module.css";

const EmployeeFormation = (p) => {
  const onclickHandler = (e) => {
    p.onSetId(p.id);
  };
  const onEditHandler = (e) => {
    p.onSetIdEdit({
      formationId: p.id,
      type: p.type,
      categorieFormation: p.categorieFormation,
      modalite: p.modalite,
      dureePerHour: p.duree,
      dateDebut: p.debut,
      dateFin: p.fin,
      presentataire: p.presentataire,
      formatteur: p.formatteur,
    });
  };

  return (
    <Fragment>
      <tr>
        <td>
          <div>{p.type} </div>
        </td>
        <td>
          <div>{p.categorieFormation} </div>
        </td>
        <td>
          <div>{p.modalite} </div>
        </td>
        <td>
          <div>{p.duree} </div>
        </td>
        <td>
          <div>{p.debut} </div>
        </td>
        <td>
          <div>{p.fin} </div>
        </td>
        <td>
          <div>{p.month} </div>
        </td>
        <td>
          <div>{p.presentataire} </div>
        </td>
        <td>
          <div>{p.formatteur} </div>
        </td>
        <td>
          <div>{p.eva.toString()} </div>
        </td>
        <td>
          <div>{p.bilan} </div>
        </td>
      </tr>
      <tr>
        <td colSpan="11" className={c.line}>
          <div className={c.btnContainer}>
            <button className={c.delete} onClick={onclickHandler}>
              delete
            </button>
            <button className={c.edit} onClick={onEditHandler}>
              edit
            </button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
export default EmployeeFormation;
