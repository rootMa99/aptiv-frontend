import { Fragment, useState } from "react";
import c from "./AddFormationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import EmployeeSlice from "../../store/EmployeeSlice";




const getData = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
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


const EditFormation = (p) => {
  console.log(p);
  const [formationId] = useState(p.formationEdit.formationId);
  const [categorieFormation, setCategorieFormaation] = useState(
    p.formationEdit.categorieFormation
  );
  const [typeFormation, setTypeFormation] = useState(p.formationEdit.type);
  const [modalite, setModalite] = useState(p.formationEdit.modalite);
  const [dureePerHour, setDureePerHour] = useState(
    p.formationEdit.dureePerHour
  );
  const [dateDebut, setDateDebut] = useState(p.formationEdit.dateDebut);
  const [dateFin, setDateFin] = useState(p.formationEdit.dateFin);
  const [presentataire, setPresentataire] = useState(
    p.formationEdit.presentataire
  );
  const [formatteur, setFormatteur] = useState(p.formationEdit.formatteur);
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
  const dispatch = useDispatch();
  const matricule = p.id;
  const typos = useSelector((s) => s.typeS);

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
  }

  const onSubmitHandler = async(e) => {
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
      classError.addCat;
    if (error) {
      alert("We Can't Valid this Form");
      return;
    }
    const month = dateDebut.split("-")[1];
    const formation= {
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
    };

    console.log('data sent...');
    const data= await getData(
      `http://localhost:8081/formation/${formationId}`,
      formation
    );
console.log("data fetched....");
      console.log(data);



    const payload = {
      matricule: matricule,
      formation: {
        formationId: data.formationId,
        type: data.type,
        categorieFormation: data.categorieFormation,
        modalite: data.modalite,
        dureePerHour: data.dureePerHour,
        dateDebut: data.dateDebut,
        dateFin: data.dateFin,
        month: data.month,
        presentataire: data.presentataire,
        formatteur: data.formatteur,
        evaluationAFrois: true,
        bilan: "done",
      },
    };
    dispatch(EmployeeSlice.actions.updateFormation(payload));
    p.close();
  };

  const onChangeSelect = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    if (value === "+") {
      setAddCat(true);
      setCategorieFormaation(value);
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
    } else {
      setClassError((p) => {
        return {
          ...p,
          categorieFormation: true,
        };
      });
    }
  };
  const onChangeAddCat = (e) => {
    const value = e.target.value;
    setCategorieFormaation(value);
    if (value.trim() !== "") {
      setCategorieFormaation(value);
      setClassError((p) => {
        return {
          ...p,
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
    }
  };

  const onChageFormation = (e) => {
    const value = e.target.value;
    setTypeFormation(value);
    if (value.trim() !== "") {
      setTypeFormation(value);
      setClassError((p) => {
        return {
          ...p,
          type: false,
        };
      });
    } else {
      setClassError((p) => {
        return {
          ...p,
          type: true,
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
    }
  };

  const onChangeModalite = (e) => {
    const value = e.target.value;
    setModalite(value);
    if (value.trim() !== "") {
      setModalite(value);
      setClassError((p) => {
        return {
          ...p,
          modalite: false,
        };
      });
    } else {
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
    setDureePerHour(value);
    if (value.trim() !== "") {
      setDureePerHour(+value);
      setClassError((p) => {
        return {
          ...p,
          dureePerHour: false,
        };
      });
    } else {
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
    } else {
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
    } else {
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
    setPresentataire(value);
    if (value.trim() !== "") {
      setPresentataire(value);
      setClassError((p) => {
        return {
          ...p,
          presentataire: false,
        };
      });
    } else {
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
    setFormatteur(value);
    if (value.trim() !== "") {
      setFormatteur(value);
      setClassError((p) => {
        return {
          ...p,
          formatteur: false,
        };
      });
    } else {
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
      <div className={c.formHeader}>
        <h1>Edit Employee's Formation, matricule: {matricule} </h1>
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
            value={modalite}
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
            type="number"
            id="dureePerHour"
            value={dureePerHour}
            placeholder="Please Enter Duree Par Heure"
            onChange={onChangeDureePerHour}
          />
          {classError.dureePerHour && (
            <p className={c.error}>Please Enter Duree/Heure </p>
          )}
        </div>
        <div className={c.inputContainer}>
          <label htmlFor="dateDebut">Date de Debut</label>
          <input
            type="date"
            max={dateFin}
            id="dateDebut"
            value={dateDebut}
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
            value={dateFin}
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
            value={presentataire}
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
            value={formatteur}
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

export default EditFormation;
