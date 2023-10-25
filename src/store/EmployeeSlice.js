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
            formations:[
              
            ]}
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
            if (existing !== undefined){
                s.empl.formations = s.empl.formations.filter((f)=>f.formationId !==id );
            }
        }
    }
})

export const emplAction= EmployeeSlice.actions;
export default EmployeeSlice;