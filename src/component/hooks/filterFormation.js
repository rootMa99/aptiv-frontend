export const filterFormation = (
  data,
  titreFormation,
  tittre,
  categorie,
  departement
) => {
  const filtredDashboard = [];
  if (data.length > 0) {
    if (titreFormation !== "All" && tittre!=="All" && categorie!=='All' && departement!=="All") {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation &&
          filter.categorieFormation === tittre &&
          filter.categoriePersonel === categorie &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    } 
    if (titreFormation === "All" && tittre!=="All" && categorie!=='All' && departement!=="All") {
        const filters = data.filter(
          (filter) =>
            filter.categorieFormation === tittre &&
            filter.categoriePersonel === categorie &&
            filter.departmentPersonel === departement
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation !== "All" && tittre==="All" && categorie!=='All' && departement!=="All") {
        const filters = data.filter(
          (filter) =>
            filter.type === titreFormation &&
            filter.categoriePersonel === categorie &&
            filter.departmentPersonel === departement
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation !== "All" && tittre!=="All" && categorie==='All' && departement!=="All") {
        const filters = data.filter(
          (filter) =>
            filter.type === titreFormation &&
            filter.categorieFormation === tittre &&
            filter.departmentPersonel === departement
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation !== "All" && tittre!=="All" && categorie!=='All' && departement==="All") {
        const filters = data.filter(
          (filter) =>
            filter.type === titreFormation &&
            filter.categorieFormation === tittre &&
            filter.categoriePersonel === categorie 
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation === "All" && tittre==="All" && categorie!=='All' && departement!=="All") {
        const filters = data.filter(
          (filter) =>
            filter.categoriePersonel === categorie &&
            filter.departmentPersonel === departement
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation === "All" && tittre!=="All" && categorie==='All' && departement!=="All") {
        const filters = data.filter(
          (filter) =>
            filter.categorieFormation === tittre &&
            filter.departmentPersonel === departement
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation === "All" && tittre!=="All" && categorie!=='All' && departement==="All") {
        const filters = data.filter(
          (filter) =>
            filter.categorieFormation === tittre &&
            filter.categoriePersonel === categorie
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation !== "All" && tittre==="All" && categorie==='All' && departement!=="All") {
        const filters = data.filter(
          (filter) =>
            filter.type === titreFormation &&
            filter.departmentPersonel === departement
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation !== "All" && tittre==="All" && categorie!=='All' && departement==="All") {
        const filters = data.filter(
          (filter) =>
            filter.type === titreFormation &&
            filter.categoriePersonel === categorie 
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation !== "All" && tittre!=="All" && categorie==='All' && departement==="All") {
        const filters = data.filter(
          (filter) =>
            filter.type === titreFormation &&
            filter.categorieFormation === tittre 
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation !== "All" && tittre==="All" && categorie==='All' && departement==="All") {
        const filters = data.filter(
          (filter) =>
            filter.type === titreFormation 
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation === "All" && tittre!=="All" && categorie==='All' && departement==="All") {
        const filters = data.filter(
          (filter) =>
            filter.categorieFormation === tittre
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation === "All" && tittre==="All" && categorie!=='All' && departement==="All") {
        const filters = data.filter(
          (filter) =>
            filter.categoriePersonel === categorie 
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation === "All" && tittre==="All" && categorie==='All' && departement!=="All") {
        const filters = data.filter(
          (filter) =>
            filter.departmentPersonel === departement
        );
        filtredDashboard.push(filters);
      } 
      if (titreFormation === "All" && tittre==="All" && categorie==='All' && departement==="All") {
        const filters = data;
        filtredDashboard.push(filters);
      } 
  }
  return filtredDashboard;
};


export const totalDataC=(data)=>{
    const matricule=[];
    let nomberPF=0;
    const nombreSF=data.length+1;
    let totalHeure=0;
    data.map(m=>{
        if (matricule.length===0){
            matricule.push(m.matricule);
        }
        totalHeure+=m.dureePerHour;
        const existing =matricule.find(f=>f===m.matricule); 
        if(existing=== undefined){
            matricule.push(m.matricule);
        }
        return{totalHeure, matricule};
    })
   
    nomberPF=matricule.length+1;
    return {nomberPF, nombreSF, totalHeure};
}
