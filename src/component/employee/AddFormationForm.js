import { Fragment, useState } from "react";
import c from "./AddFormationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import EmployeeSlice from "../../store/EmployeeSlice";

const getData = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};

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
  const seletedType = [];

  if (
    categorieFormation !== null &&
    categorieFormation !== "+" &&
    categorieFormation !== undefined
  ) {
    const existing = keys.find((f) => f === categorieFormation);
    if (existing !== undefined) {
      seletedType.push(...typos.catList[categorieFormation]);
    }
    console.log("check run" + categorieFormation);
  }

  const matricule = p.id;

  const onSubmitHandler = async (e) => {
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

    const formation = [
      {
        type: typeFormation,
        categorieFormation: categorieFormation,
        modalite: modalite,
        dureePerHour: dureePerHour,
        dateDebut: dateDebut,
        dateFin: dateFin,
        month: month,
        prestataire: presentataire,
        formatteur: formatteur,
        evaluationAFrois: true,
        bilan: "done",
      },
    ];
    const data = await getData(
      `http://localhost:8081/formation/${matricule}`,
      formation
    );

    const payload = {
      matricule: matricule,
      formation: {
        formationId: data._embedded.formationPersonelRests[0].formationId,
        type: data._embedded.formationPersonelRests[0].type,
        categorieFormation:
          data._embedded.formationPersonelRests[0].categorieFormation,
        modalite: data._embedded.formationPersonelRests[0].modalite,
        dureePerHour: data._embedded.formationPersonelRests[0].dureePerHour,
        dateDebut:
          data._embedded.formationPersonelRests[0].dateDebut.split("T")[0],
        dateFin: data._embedded.formationPersonelRests[0].dateFin.split("T")[0],
        month: data._embedded.formationPersonelRests[0].month,
        prestataire: data._embedded.formationPersonelRests[0].prestataire,
        formatteur: data._embedded.formationPersonelRests[0].formatteur,
        evaluationAFrois:
          data._embedded.formationPersonelRests[0].evaluationAFrois,
        bilan: data._embedded.formationPersonelRests[0].bilan,
      },
    };

    dispatch(EmployeeSlice.actions.addFormation(payload));
    p.close();
  };

  const onChangeSelect = (e) => {
    const value = e.target.value;
    if (value === "+") {
      setAddCat(true);
      setCategorieFormaation(e.target.value);
      return;
    }
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
  const onChangeTf = (e) => {
    if (e.target.value.trim() !== "") {
      setTypeFormation(e.target.value);
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
  console.log(categorieFormation);

  return (
    <form className={c.form} onSubmit={onSubmitHandler}>
      <div className={c.formHeader}>
        <h1>Add Training to Employee ( {p.id} )</h1>
      </div>
      <div className={c.inputsContainer}>
        <div className={c.inputContainer}>
          <label htmlFor="categorieFormation">Categorie De Formation</label>
          <select
            id="categorieFormation"
            value={categorieFormation}
            onChange={onChangeSelect}
          >
            <option value="none">None</option>
            {keys.map((m) => (
              <option key={Math.random()} value={m}>
                {m}
              </option>
            ))}
            <option value="+">+</option>
            <option value={categorieFormation}>{categorieFormation}</option>
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
              />
              {classError.addCat && (
                <p className={c.error}>Please Enter Categorie de Formation </p>
              )}
            </Fragment>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="formation">Theme de Formation</label>
          {seletedType.length !== 0 && (
            <select
              id="formation"
              onChange={onChageFormation}
              value={typeFormation}
            >
              <option value="none">None</option>
              {seletedType.map((m) => (
                <option key={Math.random()} value={m}>
                  {m}
                </option>
              ))}
            </select>
          )}
          {seletedType.length === 0 && (
            <input
              type="text"
              id="addCat"
              placeholder="Please Enter Theme de Formation"
              onChange={onChangeTf}
            />
          )}
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
