import { createSlice } from "@reduxjs/toolkit";

const EmployeeSlice= createSlice({
    name:'empls',
    initialState:{
        empl:{ matricule: "",
            nom: "",
            prenom: "",
            cin: "",
            categorie: "",
            fonctionEntreprise: "",
            departement: "",
            dateEmbauche: "",
            dateDepart: null,
            formations:[]}
    },
    reducers:{
        addEmployee(s,p){
            const payload= p.payload;
            
            if(Object.values(s.empl).includes(payload.matricule)){
                console.log("it's already exist");
                return;
            }

            s.empl.matricule=payload.matricule;
            s.empl.nom= payload.nom;
            s.empl.prenom= payload.prenom;
            s.empl.cin=payload.cin;
            s.empl.categorie=payload.categorie;
            s.empl.fonctionEntreprise=payload.fonctionEntreprise;
            s.empl.departement= payload.departement;
            s.empl.dateEmbauche=payload.dateEmbauche;
            s.empl.dateDepart=payload.dateDepart;
            for(const i of payload.formations){
                s.empl.formations.push(i);
            }
        },
        deleteFormation(s,p){
            const id = p.payload;

            const existing = s.empl.formations.find((f)=>f.formationId===id);
            console.log(existing);
            if (existing !== undefined){
                s.empl.formations = s.empl.formations.filter((f)=>f.formationId !==id );
            }
        },
        addFormation(s,p){
            console.log("this method is running");
            const matricule=p.payload.matricule;
            console.log(matricule);
            const foramtion= p.payload.formation;
            console.log(foramtion);
            s.empl.formations.push(foramtion);
        },
        updateFormation(s,p){
            const matricule=p.payload.matricule;
            console.log(matricule);
            const formation= p.payload.formation;
            const index= s.empl.formations.findIndex(f=>f.formationId===formation.formationId);
            console.log(index);
              if (index!==-1){
                s.empl.formations[index].formationId=formation.formationId;
                s.empl.formations[index].type= formation.type;
                s.empl.formations[index].categorieFormation= formation.categorieFormation;
                s.empl.formations[index].modalite=formation.modalite;
                s.empl.formations[index].dureePerHour=formation.dureePerHour;
                s.empl.formations[index].dateDebut= formation.dateDebut;
                s.empl.formations[index].dateFin= formation.dateFin;
                s.empl.formations[index].month= formation.month;
                s.empl.formations[index].presentataire= formation.presentataire;
                s.empl.formations[index].formatteur=formation.formatteur;
                s.empl.formations[index].evaluationAFrois=formation.evaluationAFrois;
                s.empl.formations[index].bilan=formation.bilan;
            }
        }
    }
})

export const emplAction= EmployeeSlice.actions;
export default EmployeeSlice;