import { useDispatch } from "react-redux";
import c from "./DeleteFormation.module.css";
import { emplAction } from "../../store/EmployeeSlice";

const deleteData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};

const DeleteFormation = (p) => {
  const dispatch = useDispatch();

  const formationId = p.id;
  const onClickHandler = (e) => {
    p.close();
  };

  const onDeleteHandler = async (e) => {
    await deleteData(`http://localhost:8081/formation/${formationId}`);
    dispatch(emplAction.deleteFormation(formationId));
    p.close();
  };

  return (
    <div className={c.card}>
      <h1>are you sure!</h1>
      <div className={c.btnContainer}>
        <button className={c.cancel} onClick={onClickHandler}>
          cancel
        </button>
        <button className={c.delete} onClick={onDeleteHandler}>
          delete
        </button>
      </div>
    </div>
  );
};

export default DeleteFormation;
