import { createSlice } from "@reduxjs/toolkit";


const alltypeSlice = createSlice({
    name:"types",
    initialState:{
        catList:{},
        categoriePersonel:[],
        departement:[],
    },
    reducers:{
        addtypes(s,p){
            s.catList=p.payload.catList;
            s.categoriePersonel.push(...p.payload.categoriePersonel);
            s.departement.push(...p.payload.departement);
        }
    }
})
export const typeAction= alltypeSlice.actions;
export default alltypeSlice;