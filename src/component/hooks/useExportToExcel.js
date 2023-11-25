import * as XLSX from "xlsx";

const useExportData = () => {
  const exportToExcel = (fileName, data, notComplete) => {
    const newData = [];
    data.map((m) => {
      const nd = !notComplete ? {
        matricule: m.personelDetails.matricule,
        nom: m.personelDetails.nom,
        prenom: m.personelDetails.prenom,
        categorie: m.personelDetails.categorie,
        "fonction Entreprise": m.personelDetails.fonctionEntreprise,
        departement: m.personelDetails.departement,
        type: m.type,
        "categorie de Formation": m.categorieFormation,
        modalite: m.modalite,
        "duree par heure": m.dureePerHour,
        "date de Debut": m.dateDebut,
        "date de Fin": m.dateFin,
        month: m.month,
        prestataire: m.prestataire,
        formatteur: m.formatteur,
      } : {
        matricule: m.matricule,
        nom: m.nom,
        prenom: m.prenom,
        categorie: m.categorie,
        "fonction Entreprise": m.fonctionEntreprise,
        departement: m.departement,
      };
      return newData.push(nd);
    });
    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return exportToExcel;
};

export default useExportData;
