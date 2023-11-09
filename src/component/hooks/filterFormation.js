export const filterFormation = (
  data,
  titreFormation,
  tittre,
  categorie,
  departement
) => {
  const filtredDashboard = [];
  if (data.length > 0) {
    if (
      titreFormation !== "All" &&
      tittre !== "All" &&
      categorie !== "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation &&
          filter.categorieFormation === tittre &&
          filter.categoriePersonel === categorie &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre !== "All" &&
      categorie !== "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.categorieFormation === tittre &&
          filter.categoriePersonel === categorie &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation !== "All" &&
      tittre === "All" &&
      categorie !== "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation &&
          filter.categoriePersonel === categorie &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation !== "All" &&
      tittre !== "All" &&
      categorie === "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation &&
          filter.categorieFormation === tittre &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation !== "All" &&
      tittre !== "All" &&
      categorie !== "All" &&
      departement === "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation &&
          filter.categorieFormation === tittre &&
          filter.categoriePersonel === categorie
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre === "All" &&
      categorie !== "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.categoriePersonel === categorie &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre !== "All" &&
      categorie === "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.categorieFormation === tittre &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre !== "All" &&
      categorie !== "All" &&
      departement === "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.categorieFormation === tittre &&
          filter.categoriePersonel === categorie
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation !== "All" &&
      tittre === "All" &&
      categorie === "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation &&
          filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation !== "All" &&
      tittre === "All" &&
      categorie !== "All" &&
      departement === "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation &&
          filter.categoriePersonel === categorie
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation !== "All" &&
      tittre !== "All" &&
      categorie === "All" &&
      departement === "All"
    ) {
      const filters = data.filter(
        (filter) =>
          filter.type === titreFormation && filter.categorieFormation === tittre
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation !== "All" &&
      tittre === "All" &&
      categorie === "All" &&
      departement === "All"
    ) {
      const filters = data.filter((filter) => filter.type === titreFormation);
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre !== "All" &&
      categorie === "All" &&
      departement === "All"
    ) {
      const filters = data.filter(
        (filter) => filter.categorieFormation === tittre
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre === "All" &&
      categorie !== "All" &&
      departement === "All"
    ) {
      const filters = data.filter(
        (filter) => filter.categoriePersonel === categorie
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre === "All" &&
      categorie === "All" &&
      departement !== "All"
    ) {
      const filters = data.filter(
        (filter) => filter.departmentPersonel === departement
      );
      filtredDashboard.push(filters);
    }
    if (
      titreFormation === "All" &&
      tittre === "All" &&
      categorie === "All" &&
      departement === "All"
    ) {
      const filters = data;
      filtredDashboard.push(filters);
    }
  }
  return filtredDashboard;
};

export const totalDataC = (data) => {
  const matricule = [];
  let nomberPF = 0;
  const nombreSF = data.length;
  let totalHeure = 0;
  data.map((m) => {
    if (matricule.length === 0) {
      matricule.push(m.matricule);
    }
    totalHeure += m.dureePerHour;
    const existing = matricule.find((f) => f === m.matricule);
    if (existing === undefined) {
      matricule.push(m.matricule);
    }
    return { totalHeure, matricule };
  });

  nomberPF = matricule.length;
  return { nomberPF, nombreSF, totalHeure };
};


export const nbMonth=(data)=>{
  const monthHour=[];

  data.forEach(i=>{
      const existing= monthHour.find(f=>f.mid===i.month);
      if (existing===undefined){
        const monthH={
          mid:i.month,
          nbHour:i.dureePerHour,
        }
        monthHour.push(monthH);
      }else{
        existing.nbHour+=i.dureePerHour;
      }
  })

  return monthHour;
}

export const nbHour = (data) => {
  console.log(data);
  const catPerHour = [];
  const catForHour = [];
  if (data.length > 0) {
    data[0].forEach((m) => {

      const existingP = catPerHour.find(
        (f) => f.name === m.categoriePersonel
      );
      if (existingP === undefined) {
        const catP = {
          name: m.categoriePersonel,
          nbrHour: m.dureePerHour,
        };
        catPerHour.push(catP);
      } else {
        existingP.nbrHour += m.dureePerHour;
      }
      const existingF = catForHour.find(
        (f) => f.name === m.categorieFormation
      );
      if (existingF === undefined) {
        const catf = {
          name: m.categorieFormation,
          nbrHour: m.dureePerHour,
        };
        catForHour.push(catf);
      } else {
        existingF.nbrHour += m.dureePerHour;
      }
    });
  }
  return { catPerHour, catForHour };
};
