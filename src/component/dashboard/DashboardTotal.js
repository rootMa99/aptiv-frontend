import c from "./DashboardTotal.module.css";

const DashboardTotal = (p) => {
  return (
    <div className={c.container}>
      <div className={c.vertical}>
        <div className={c.nbrPerForm}>
          <span className={c.title}>nb/personne</span>
          <span>{p.total.nomberPF}</span>
        </div>
        <div className={c.nbrSession}>
          <span className={c.title}>nb/session</span>
          <span>{p.total.nombreSF} </span>
        </div>
      </div>
      <div className={c.totalHeure}>
        <span className={c.title}>total heure</span>
        <span>{p.total.totalHeure.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default DashboardTotal;
