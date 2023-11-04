import { Fragment, useState } from "react";
import c from "./AddFormationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import EmployeeSlice from "../../store/EmployeeSlice";
import { v4 as generateId } from "uuid";

const AddFormationForm = (p) => {
  const [categorieFormation, setCategorieFormaation] = useState();
  const [typeFormation, setTypeFormation] = useState();
  const [modalite, setModalite] = useState();
  const [dureePerHour, setDureePerHour] = useState();
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState();
  const [presentataire, setPresentataire] = useState();
  const [formatteur, setFormatteur] = useState();
  const [addCat, setAddCat] = useState(false);

  const [classError, setClassError] = useState({
    type: false,
    categorieFormation: false,
    modalite: false,
    dureePerHour: false,
    dateDebut: false,
    dateFin: false,
    presentataire: false,
    formatteur: false,
    addCat: false,
  });
  //this just for not showing error from the first render of this component
  const [isEmpty, setIsEmpty] = useState({
    type: true,
    categorieFormation: true,
    modalite: true,
    dureePerHour: true,
    dateDebut: true,
    dateFin: true,
    presentataire: true,
    formatteur: true,
    addCat: true,
  });
  const typos = useSelector((s) => s.typeS);
  const dispatch = useDispatch();
  const keys = Object.keys(typos.catList);
  console.log(keys);
  const matricule = p.id;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const error =
      classError.categorieFormation ||
      classError.dateDebut ||
      classError.dateFin ||
      classError.dureePerHour ||
      classError.formatteur ||
      classError.modalite ||
      classError.presentataire ||
      classError.type ||
      classError.addCat ||
      isEmpty.categorieFormation ||
      isEmpty.dateDebut ||
      isEmpty.dateFin ||
      isEmpty.dureePerHour ||
      isEmpty.formatteur ||
      isEmpty.modalite ||
      isEmpty.presentataire ||
      isEmpty.type ||
      isEmpty.addCat;
    if (error) {
      alert("We Can't Valid this Form");
      console.log({
        cate: isEmpty.categorieFormation,
        dateDB: isEmpty.dateDebut,
        dateF: isEmpty.dateFin,
        dr: isEmpty.dureePerHour,
        modalite: isEmpty.modalite,
        presta: isEmpty.presentataire,
        type: isEmpty.type,
        addcat: isEmpty.addCat,
      });
      return;
    }
    const month = dateDebut.split("-")[1];
    const id = generateId();
    const payload = {
      matricule: matricule,
      formation: {
        formationId: id,
        type: typeFormation,
        categorieFormation: categorieFormation,
        modalite: modalite,
        dureePerHour: dureePerHour,
        dateDebut: dateDebut,
        dateFin: dateFin,
        month: month,
        presentataire: presentataire,
        formatteur: formatteur,
        evaluationAFrois: true,
        bilan: "done",
      },
    };

    dispatch(EmployeeSlice.actions.addFormation(payload));
    p.close();
  };

  const onChangeSelect = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    if (value === "+") {
      setAddCat(true);
      return;
    }
    console.log("add categrie");
    if (value !== "none") {
      setAddCat(false);
      setCategorieFormaation(value);
      setClassError((p) => {
        return {
          ...p,
          categorieFormation: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          categorieFormation: false,
          addCat: false,
        };
      });
    } else {
      setClassError((p) => {
        return {
          ...p,
          categorieFormation: true,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          categorieFormation: true,
        };
      });
    }
  };
  const onChangeAddCat = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setCategorieFormaation(value);
      setClassError((p) => {
        return {
          ...p,
          addCat: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          categorieFormation: false,
          addCat: false,
        };
      });
    } else {
      setClassError((p) => {
        return {
          ...p,
          addCat: true,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          addCat: true,
        };
      });
    }
  };

  const onChageFormation = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setTypeFormation(value);
      setClassError((p) => {
        return {
          ...p,
          type: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          type: false,
        };
      });
    } else {
      setIsEmpty((p) => {
        return {
          ...p,
          type: true,
        };
      });
      setClassError((p) => {
        return {
          ...p,
          type: true,
        };
      });
    }
  };

  const onChangeModalite = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setModalite(value);
      setClassError((p) => {
        return {
          ...p,
          modalite: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          modalite: false,
        };
      });
    } else {
      setIsEmpty((p) => {
        return {
          ...p,
          modalite: true,
        };
      });
      setClassError((p) => {
        return {
          ...p,
          modalite: true,
        };
      });
    }
  };

  const onChangeDureePerHour = (e) => {
    const value = e.target.value;
    if (value.trim() !== "" && /^[0-9]*\.?[0-9]*$/.test(value)) {
      setDureePerHour(+value);
      setClassError((p) => {
        return {
          ...p,
          dureePerHour: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          dureePerHour: false,
        };
      });
    } else {
      setIsEmpty((p) => {
        return {
          ...p,
          dureePerHour: true,
        };
      });
      setClassError((p) => {
        return {
          ...p,
          dureePerHour: true,
        };
      });
    }
  };
  const onChangeDateDebut = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setDateDebut(value);
      setClassError((p) => {
        return {
          ...p,
          dateDebut: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          dateDebut: false,
        };
      });
    } else {
      setIsEmpty((p) => {
        return {
          ...p,
          dateDebut: true,
        };
      });
      setClassError((p) => {
        return {
          ...p,
          dateDebut: true,
        };
      });
    }
  };

  const onChangeDateFin = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setDateFin(value);
      setClassError((p) => {
        return {
          ...p,
          dateFin: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          dateFin: false,
        };
      });
    } else {
      setIsEmpty((p) => {
        return {
          ...p,
          dateFin: true,
        };
      });
      setClassError((p) => {
        return {
          ...p,
          dateFin: true,
        };
      });
    }
  };

  const onCahngePresentataire = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setPresentataire(value);
      setClassError((p) => {
        return {
          ...p,
          presentataire: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          presentataire: false,
        };
      });
    } else {
      setIsEmpty((p) => {
        return {
          ...p,
          presentataire: true,
        };
      });
      setClassError((p) => {
        return {
          ...p,
          presentataire: true,
        };
      });
    }
  };

  const onChangeFormatteur = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setFormatteur(value);
      setClassError((p) => {
        return {
          ...p,
          formatteur: false,
        };
      });
      setIsEmpty((p) => {
        return {
          ...p,
          formatteur: false,
        };
      });
    } else {
      setIsEmpty((p) => {
        return {
          ...p,
          formatteur: true,
        };
      });
      setClassError((p) => {
        return {
          ...p,
          formatteur: true,
        };
      });
    }
  };

  return (
    <form className={c.form} onSubmit={onSubmitHandler}>
      <h1>
        Add Training for Employee
        <br /> ( {p.id} )
      </h1>
      <div className={c.inputsContainer}>
        <div className={c.inputContainer}>
          <label htmlFor="categorieFormation">Categorie De Formation</label>
          <select
            id="categorieFormation"
            onChange={onChangeSelect}
            onBlur={onChangeSelect}
          >
            <option value="none">None</option>
            {keys.map((m) => <option value={m}>{m}</option>)}
            <option value="+">+</option>
          </select>
          {classError.categorieFormation && (
            <p className={c.error}>Please Choose Categorie de Formation </p>
          )}
          {addCat && (
            <Fragment>
              <label htmlFor="addCat">Add cat</label>
              <input
                type="text"
                id="addCat"
                placeholder="Please Enter Formation"
                onChange={onChangeAddCat}
                onBlur={onChangeAddCat}
              />
              {classError.addCat && (
                <p className={c.error}>Please Enter Categorie de Formation </p>
              )}
            </Fragment>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="formation">Theme de Formation</label>
          <input
            type="text"
            id="formation"
            placeholder="Please Enter Formation"
            onChange={onChageFormation}
            onBlur={onChageFormation}
          />
          {classError.type && (
            <p className={c.error}>Please Enter Formation </p>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="modalite">Modalite</label>
          <input
            type="text"
            id="modalite"
            placeholder="Please Enter Modalite"
            onChange={onChangeModalite}
            onBlur={onChangeModalite}
          />
          {classError.modalite && (
            <p className={c.error}>Please Enter Modalite </p>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="dureePerHour">Duree Par Heure</label>
          <input
            type="text"
            id="dureePerHour"
            placeholder="Please Enter Duree Par Heure"
            onChange={onChangeDureePerHour}
            onBlur={onChangeDureePerHour}
          />
          {classError.dureePerHour && (
            <p className={c.error}>
              Please Enter Duree/Heure <br /> Or Incorrect Format
            </p>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="dateDebut">Date de Debut</label>
          <input
            type="date"
            max={dateFin}
            id="dateDebut"
            placeholder="Please Enter Date de Debut"
            onChange={onChangeDateDebut}
            onBlur={onChangeDateDebut}
          />
          {classError.dateDebut && (
            <p className={c.error}>Please Choose Date de Debut </p>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="dateFin">Date de Fin</label>
          <input
            type="date"
            min={dateDebut}
            id="dateFin"
            placeholder="Please Enter Date de Fin"
            onChange={onChangeDateFin}
            onBlur={onChangeDateFin}
          />
          {classError.dateFin && (
            <p className={c.error}>Please Choose Date de Fin </p>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="presentataire">Prestataire</label>
          <input
            type="text"
            id="presentataire"
            placeholder="Please Enter Prestataire"
            onChange={onCahngePresentataire}
            onBlur={onCahngePresentataire}
          />
          {classError.presentataire && (
            <p className={c.error}>Please Enter Presentataire </p>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="formatteur">Formatteur</label>
          <input
            type="text"
            id="formatteur"
            placeholder="Please Enter Formatteur"
            onChange={onChangeFormatteur}
            onBlur={onChangeFormatteur}
          />
          {classError.formatteur && (
            <p className={c.error}>Please Enter Formatteur </p>
          )}
        </div>
      </div>
      <div className={c.btnContainer}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default AddFormationForm;
