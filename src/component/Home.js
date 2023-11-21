import { Fragment, useState } from "react";
import aptivBgVid from "../assets/AptivVid.mp4";
import c from "./Home.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = (p) => {
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const recentResearch = useSelector((s) => s.typeS.recentSearch);

  const onChangeHandler = (e) => {
    setTyping(true);

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
  const clickHandler = (matricule) => {
    navigate(`/home/${matricule}`);
  };

  const getTime = (time) => {
    const date = new Date();
    const timeDifference = date - time;
    //new Date().toLocaleTimeString - .toLocaleTimeString()
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const returnedValue = `${hours !== 0 ? `${hours}h` : ""}${
      minutes !== 0 ? `${minutes}m` : ""
    }${seconds !== 0 ? `${seconds}s` : ""}`;

    return returnedValue;
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
            {recentResearch.length > 0 && (
              <div className={c.recentSearch}>
                <h3>recent search conducted</h3>
                <ul className={c.listContainer}>
                  {recentResearch.toReversed().map((m) => (
                    <li
                      className={c.listItem}
                      key={m.matricule}
                      onClick={() => clickHandler(m.matricule)}
                    >
                      <span className={c.matriculeSp}>{m.matricule}</span>-
                      <span className={c.nameSp}>{m.nom + " " + m.prenom}</span>
                      -<span className={c.nameSp}>{m.categorie}</span>-
                      <span className={c.nameSp}>{m.departement}</span>-
                      <span className={c.nameSp}>
                        {getTime(new Date(m.lastSearch))} ago
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Outlet />
    </Fragment>
  );
};
export default Home;
