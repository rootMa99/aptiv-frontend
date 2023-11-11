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
    console.log(+e.target.value + 1);

    if (e.target.value.trim() === "" || e.target.value <= 0) {
      setTyping(false);
      setValue(e.target.value);
    } else {
      setValue(+e.target.value);
    }
  };
  const onBlurHandler = (e) => {
    if (value === 0) {
      setTyping(false);
    }
  };
  const onClickHandler = (e) => {
    setTyping(false);
    setValue("");
    navigate(`/home/${value}`);
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
              placeholder="Search By matricule"
              value={value}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
            <button className={classBtn} onClick={onClickHandler}>
              Search
            </button>
            <div className={c.recentSearch}>
              <h3>recent search conducted</h3>
              <ul className={c.listContainer}>
                <li className={c.listItem}>
                  <span className={c.matriculeSp}>6778</span>-
                  <span className={c.nameSp}>roberto baggio</span>-<span className={c.nameSp}>is</span>-<span className={c.nameSp}>LOGISTIC IMPO.EXPO.-4-</span>
                </li>
                <li className={c.listItem}>
                  <span className={c.matriculeSp}>789</span>-
                  <span className={c.nameSp}>franchesko totti</span>-<span className={c.nameSp}>is</span>-<span className={c.nameSp}>LOGISTIC IMPO.EXPO.-4-</span>
                </li>
                <li className={c.listItem}>
                  <span className={c.matriculeSp}>6778</span>-
                  <span className={c.nameSp}>andrea pirlo</span>-<span className={c.nameSp}>is</span>-<span className={c.nameSp}>LOGISTIC IMPO.EXPO.-4-</span>
                </li>
            
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Outlet />
    </Fragment>
  );
};
export default Home;
