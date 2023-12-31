import { createSlice } from "@reduxjs/toolkit";

// let storedData = localStorage.getItem("lastSearched");
// //console.log(storedData.length);
// storedData =
//   storedData !== null && storedData.length !== 0 ? JSON.parse(storedData) : [];
// if (storedData !== null && storedData.length !== 0) {
//   for (const o of storedData) {
//     const dates = new Date(o.lastSearch);
//     const datet = new Date();
//     const timeDifference = Math.floor((datet - dates) / (1000 * 60 * 60));

//     if (timeDifference >= 24) {
//       storedData = storedData.filter((f) => f.lastSearch !== o.lastSearch);
//       localStorage.setItem("lastSearched", JSON.stringify(storedData));
//     }
//   }
// }
const alltypeSlice = createSlice({
  name: "types",
  initialState: {
    catList: {},
    categoriePersonel: [],
    departement: [],
    //recentSearch:storedData !== null && storedData.length !== 0 ? storedData : [],
    recentSearch:[]
  },
  reducers: {
    addtypes(s, p) {
      s.catList = p.payload.catList;
      s.categoriePersonel.push(...p.payload.categoriePersonel);
      s.departement.push(...p.payload.departement);
    },
    addRecentSearch(s, p) {
      if (s.recentSearch.length === 0) {
        s.recentSearch.push(p.payload);
        //localStorage.setItem("lastSearched", JSON.stringify([p.payload]));
        return;
      }
      const existing = s.recentSearch.find(
        (f) => f.matricule === p.payload.matricule
      );
      if (existing === undefined) {
        s.recentSearch.push(p.payload);
        //localStorage.setItem("lastSearched", JSON.stringify(s.recentSearch));
      } else {
        s.recentSearch = s.recentSearch.filter(
          (f) => f.matricule !== p.payload.matricule
        );
        s.recentSearch.push(p.payload);
       //localStorage.setItem("lastSearched", JSON.stringify(s.recentSearch));
      }
    },
  },
});

export const typeAction = alltypeSlice.actions;
export default alltypeSlice;
