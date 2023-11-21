import { useState } from "react";
import c from "./Inputs.module.css";

const Inputs = (p) => {
  const [isValid, setIsvalid] = useState(true);
  const [valueInput, setValueInput] = useState(p.valueS);

  const onchangeHandler = (e) => {
    setValueInput(e.target.value);
    if (e.target.value.trim() === "") {
      setIsvalid(false);
    } else {
      setIsvalid(true);
    }
    switch (p.label) {
      case "MODALITE":
        p.chooseModalite(e.target.value);
        break;
      case "DUREE PAR HEURE":
        p.chooseDph(e.target.value);
        break;
      case "DATE DE DEBUT":
        p.chooseDateDebut(e.target.value);
        break;
      case "DATE DE FIN":
        p.chooseDateFin(e.target.value);
        break;
      case "PRESTATAIRE":
        p.choosePrestataire(e.target.value);
        break;
      case "FORMATTEUR":
        p.chooseFormatteur(e.target.value);
        break;
      default:
        break;
    }
  };

  const notValid = !isValid ? c.notValid : " ";
  const notValidLabel = !isValid ? c.notValidLabel : " ";
  return (
    <div className={c["form__group"]}>
      <input
        id={p.label}
        value={valueInput}
        type={p.type}
        className={`${c["form__field"]} ${notValid}`}
        placeholder={p.label}
        required
        onChange={onchangeHandler}
        onBlur={onchangeHandler}
      />
      <label
        htmlFor={p.label}
        className={`${c["form__label"]} ${notValidLabel}`}
      >
        {p.label}
      </label>
    </div>
  );
};

export default Inputs;
