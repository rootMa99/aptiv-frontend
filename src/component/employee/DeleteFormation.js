import { useDispatch } from "react-redux";
import c from "./DeleteFormation.module.css";
import { emplAction } from "../../store/EmployeeSlice";

const DeleteFormation = (p) => {

    const dispatch= useDispatch();

    const onClickHandler=e=>{
        p.close();
    }

    const onDeleteHandler=e=>{
        dispatch(emplAction.deleteFormation(p.id));
        p.close();
    }

  return (
    <div className={c.card}>
      <h1>are you sure!</h1>
      <div className={c.btnContainer}>
        <button className={c.cancel} onClick={onClickHandler}>cancel</button>
        <button className={c.delete} onClick={onDeleteHandler}>delete</button>
      </div>
    </div>
  );
};

export default DeleteFormation;
