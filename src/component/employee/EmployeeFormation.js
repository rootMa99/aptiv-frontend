import { Fragment, useState } from "react";
import c from "./EmployeeFormation.module.css";
import { useDispatch } from "react-redux";
import { emplAction } from "../../store/EmployeeSlice";
import BackDrop from "../UI/BackDrop";
import DeleteFormation from "./DeleteFormation";

const EmployeeFormation = (p) => {
  const [notify, setNotify]= useState(false);

  const dispatch= useDispatch();

  const onclickHandler =e=>{
    setNotify(true);
     // dispatch(emplAction.deleteFormation(p.id));
  }
  const onclose=()=>{
    setNotify(false);
  }

  return (
    <Fragment>
      {notify && <BackDrop click={onclose}/> }
      {notify && <DeleteFormation />}

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
            <button className={c.delete} onClick={onclickHandler}>delete</button>
            <button className={c.edit}>edit</button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
export default EmployeeFormation;
