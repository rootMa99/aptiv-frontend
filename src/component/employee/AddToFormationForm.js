import { useDispatch, useSelector } from "react-redux";
import Inputs from "../UI/Inputs";
import c from "./AddToFormationForm.module.css";
import SelectList from "../UI/SelectList";
import { useState } from "react";
import EmployeeSlice from "../../store/EmployeeSlice";

const postData = async (url, body, typeR) => {
  try {
    const response = await fetch(url, {
      method: typeR,
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

const AddToFormationForm = (p) => {
  const typos = useSelector((s) => s.typeS);
  const [tittre, setTitre] = useState("All");
  const [titreFormation, setTitreFormation] = useState("All");
  const [valueInp, setValueInp] = useState({
    modalite: "",
    dph: "",
    dateDebut: "",
    dateFin: "",
    prestataire: "",
    formatteur: "",
  });

  const dispatch = useDispatch();

  const matricule = p.id;
  if (
    p.formationEdit &&
    tittre === "All" &&
    titreFormation === "All" &&
    valueInp.modalite.trim() === "" &&
    valueInp.dph.trim() === "" &&
    valueInp.dateDebut.trim() === "" &&
    valueInp.dateFin.trim() === "" &&
    valueInp.prestataire.trim() === "" &&
    valueInp.formatteur.trim() === ""
  ) {
    console.log("check running...");
    setTitre(p.formationEdit.categorieFormation);
    setTitreFormation(p.formationEdit.type);
    setValueInp({
      modalite: p.formationEdit.modalite,
      dph: p.formationEdit.dureePerHour,
      dateDebut: p.formationEdit.dateDebut,
      dateFin: p.formationEdit.dateFin,
      prestataire: p.formationEdit.prestataire,
      formatteur: p.formationEdit.formatteur,
    });
  }

  const submmitHandler = async (e) => {
    e.preventDefault();
    if (
      tittre !== "All" &&
      titreFormation !== "All" &&
      valueInp.modalite.trim() !== "" &&
      valueInp.dph.trim() !== "" &&
      valueInp.dateDebut.trim() !== "" &&
      valueInp.dateFin.trim() !== "" &&
      valueInp.prestataire.trim() !== "" &&
      valueInp.formatteur.trim() !== ""
    ) {
      const month = valueInp.dateDebut.split("-")[1];

      const formation = [
        {
          type: titreFormation,
          categorieFormation: tittre,
          modalite: valueInp.modalite,
          dureePerHour: valueInp.dph,
          dateDebut: valueInp.dateDebut,
          dateFin: valueInp.dateFin,
          month: month,
          prestataire: valueInp.prestataire,
          formatteur: valueInp.formatteur,
          evaluationAFrois: true,
          bilan: "done",
        },
      ];

      if (!p.formationEdit) {
        console.log("data sent...");
        const data = await postData(
          `http://localhost:8081/formation/${matricule}`,
          formation,
          "POST"
        );
        console.log("data fetched....");
        console.log(data);
        console.log(data._embedded.formationPersonelRests);

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
            dateFin:
              data._embedded.formationPersonelRests[0].dateFin.split("T")[0],
            month: data._embedded.formationPersonelRests[0].month,
            prestataire: data._embedded.formationPersonelRests[0].prestataire,
            formatteur: data._embedded.formationPersonelRests[0].formatteur,
            evaluationAFrois:
              data._embedded.formationPersonelRests[0].evaluationAFrois,
            bilan: data._embedded.formationPersonelRests[0].bilan,
          },
        };

        dispatch(EmployeeSlice.actions.addFormation(payload));
      } else {
        const formationId = p.formationEdit.formationId;
        console.log("data sent...");
        const data = await postData(
          `http://localhost:8081/formation/${formationId}`,
          formation,
          "PUT"
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
      }
      p.close();
    }
  };

  const chooseModalite = (data) => {
    setValueInp((v) => {
      return {
        ...v,
        modalite: data,
      };
    });
  };
  const chooseDph = (data) => {
    setValueInp((v) => {
      return {
        ...v,
        dph: data,
      };
    });
  };
  const chooseDateDebut = (data) => {
    setValueInp((v) => {
      return {
        ...v,
        dateDebut: data,
      };
    });
  };
  const chooseDateFin = (data) => {
    setValueInp((v) => {
      return {
        ...v,
        dateFin: data,
      };
    });
  };
  const choosePrestataire = (data) => {
    setValueInp((v) => {
      return {
        ...v,
        prestataire: data,
      };
    });
  };
  const chooseFormatteur = (data) => {
    setValueInp((v) => {
      return {
        ...v,
        formatteur: data,
      };
    });
  };
  const chooseTitre = (tittres) => {
    setTitre(tittres);
    if (tittres === "All") {
      setTitreFormation("All");
    }
  };
  const chooseTitreFormation = (data) => {
    setTitreFormation(data);
  };

  const logic = tittre !== undefined && tittre !== "All";
  console.log(tittre, titreFormation, valueInp);
  return (
    <form className={c.form} onSubmit={submmitHandler}>
      <div className={c.formHeader}>
        <h1>Add Training to Employee ( {p.id} )</h1>
      </div>
      <div className={c.inputsContainer}>
        <div className={c.selectHolder}>
          <SelectList
            option={typos.catList}
            cf={true}
            identif="CF"
            chooseTitre={chooseTitre}
            valueS={tittre}
          />
        </div>
        {logic && (
          <div className={c.selectHolder}>
            <SelectList
              option={typos.catList[tittre]}
              tittre={tittre}
              identif="CTF"
              chooseTitreFormation={chooseTitreFormation}
              valueS={titreFormation}
            />
          </div>
        )}
        <Inputs label="MODALITE" type="text" chooseModalite={chooseModalite} valueS={valueInp.modalite} />
        <Inputs label="DUREE PAR HEURE" type="number" chooseDph={chooseDph} valueS={valueInp.dph} />
        <Inputs
          label="DATE DE DEBUT"
          type="date"
          chooseDateDebut={chooseDateDebut}
          valueS={valueInp.dateDebut}
        />
        <Inputs label="DATE DE FIN" type="date" chooseDateFin={chooseDateFin} valueS={valueInp.dateFin} />
        <Inputs
          label="PRESTATAIRE"
          type="text"
          choosePrestataire={choosePrestataire}
          valueS={valueInp.prestataire}
        />
        <Inputs
          label="FORMATTEUR"
          type="text"
          chooseFormatteur={chooseFormatteur}
          valueS={valueInp.formatteur}
        />
      </div>
      <div className={c.btnContainer}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default AddToFormationForm;
