import { createSlice } from "@reduxjs/toolkit";

let storedData = localStorage.getItem("lastSearched");
//console.log(storedData.length);
storedData =
  storedData !== null && storedData.length !== 0 ? JSON.parse(storedData) : [];
console.log(storedData);
if (storedData !== null && storedData.length !== 0) {
  console.log("passed here");
  for (const o of storedData) {
    const dates = new Date(o.lastSearch);
    const datet = new Date();
    const timeDifference = Math.floor((datet - dates) / (1000 * 60 * 60));

    console.log(timeDifference);
    if (timeDifference >= 24) {
      console.log("past 1");
      storedData = storedData.filter((f) => f.lastSearch !== o.lastSearch);
      localStorage.setItem("lastSearched", JSON.stringify(storedData));
    }
  }
}
console.log(storedData);
const alltypeSlice = createSlice({
  name: "types",
  initialState: {
    catList: {},
    categoriePersonel: [],
    departement: [],
    recentSearch:
      storedData !== null && storedData.length !== 0 ? storedData : [],
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
        localStorage.setItem("lastSearched", JSON.stringify([p.payload]));
        return;
      }
      const existing = s.recentSearch.find(
        (f) => f.matricule === p.payload.matricule
      );
      console.log(existing);
      if (existing === undefined) {
        s.recentSearch.push(p.payload);
        localStorage.setItem("lastSearched", JSON.stringify(s.recentSearch));
      } else {
        s.recentSearch = s.recentSearch.filter(
          (f) => f.matricule !== p.payload.matricule
        );
        s.recentSearch.push(p.payload);
        localStorage.setItem("lastSearched", JSON.stringify(s.recentSearch));
      }
    },
  },
});

export const typeAction = alltypeSlice.actions;
export default alltypeSlice;
