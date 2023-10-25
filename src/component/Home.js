import { Fragment, useState } from "react";
import aptivBgVid from "../assets/AptivVid.mp4";
import c from "./Home.module.css";
import { Outlet, useNavigate } from "react-router-dom";

const Home = (p) => {
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setTyping(true);
    setValue(+e.target.value);
    console.log(+e.target.value + 1);

    if (+e.target.value === 0) {
      setTyping(false);
    }
  };
  const onBlurHandler = (e) => {
    if (value === 0) {
      setTyping(false);
    }
  };
  const onClickHandler = (e) => {
    navigate(`/home/${value}`);
    setValue("");
    setTyping(false);
  };

  const classBtn = !typing ? c.buttonOut : c.buttonIn;
  return (
    <Fragment>
      <main className={c.mainContainer}>
        <video className={c.videoBg} autoPlay loop playsInline muted>
          <source src={aptivBgVid} type="video/mp4" />
        </video>
        <div className={c.inputContainer}>
          <div className={c.inputHolder}>
            <h1>The Bridge to Success: Training and Transformation</h1>
            <input
              type="number"
              value={value}
              placeholder="Search By matricule"
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
            <button className={classBtn} onClick={onClickHandler}>
              Search
            </button>
          </div>
        </div>
      </main>
      <Outlet />
    </Fragment>
  );
};
export default Home;