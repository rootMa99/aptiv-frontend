import { createSlice } from "@reduxjs/toolkit";


const alltypeSlice = createSlice({
    name:"types",
    initialState:{
        catList:{},
        categoriePersonel:[],
        departement:[],
        recentSearch:[],
    },
    reducers:{
        addtypes(s,p){
            s.catList=p.payload.catList;
            s.categoriePersonel.push(...p.payload.categoriePersonel);
            s.departement.push(...p.payload.departement);
        },
        addRecentSearch(s,p){
            if(s.recentSearch.length===0){
                s.recentSearch.push(p.payload);
                return;
            }
            const existing= s.recentSearch.find(f=>f.matricule===p.payload.matricule);
            console.log(existing);
            if(existing===undefined){
                s.recentSearch.push(p.payload);
            }else{
                s.recentSearch=s.recentSearch.filter(f=>f.matricule!==p.payload.matricule);
                s.recentSearch.push(p.payload);
            }
        }
    }
})

export const typeAction= alltypeSlice.actions;
export default alltypeSlice;