import { Fragment } from "react";
import c from "./EmployeeFormation.module.css";

const EmployeeFormation = (p) => {
  console.log(p.id);
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
        <td colSpan="11">
          <div className={c.btnContainer}>
            <button className={c.delete}>delete</button>
            <button className={c.edit}>edit</button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
export default EmployeeFormation;
