import c from "./DeleteFormation.module.css";

const DeleteFormation = (p) => {
  return (
    <div className={c.card}>
      <h1>are you sure!</h1>
      <div className={c.btnContainer}>
        <button className={c.cancel}>cancel</button>
        <button className={c.delete}>delete</button>
      </div>
    </div>
  );
};

export default DeleteFormation;
