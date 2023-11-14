import { useState } from "react";
import c from "./UploadFiles.module.css";
import LoadingFetch from "../UI/LoadingFetch";

const postData = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: body,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};

const UploadFiles = (p) => {
  const [datafile, setDatafile] = useState(null);
  const [datafilef, setDatafilef] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);


  const changeHandler = (e) => {
    setDatafile(e.target.files[0]);
  };

  console.log(datafile);
  const submmitHandler = async (e) => {
    e.preventDefault();
    if (datafile !== null) {
      const formData = new FormData();
      formData.append("file", datafile);
      console.log("start sending...");
      setIsLoading(true);
      const data = await postData(
        "http://localhost:8081/personel/personel",
        formData
      );
      setIsLoading(false);
      console.log("data fetched");
      console.log(data);
    }
  };

  const changeHandlerFormation=e=>{
    setDatafilef(e.target.files[0]);
  }
  console.log(datafile);
  const submmitHandlerFormation = async (e) => {
    e.preventDefault();
    if (datafilef !== null) {
      const formData = new FormData();
      formData.append("file", datafilef);
      console.log("start sending...");
      setIsLoading(true);
      const data = await postData(
        "http://localhost:8081/formation/uploadFormation",
        formData
      );
      setIsLoading(false);
      console.log("data fetched");
      console.log(data);
    }
  };
  console.log(datafilef);
  return (
    <main className={c.main}>
      <div className={c.inputscontainer}>
        <form onSubmit={submmitHandler} className={c.form}>
          <label htmlFor="arquivo" className={c.label}>
            upload Employee data to data base:
          </label>
          <input
            accept=".xlsx"
            className={c.inpdddut}
            name="arquivo"
            id="arquivo"
            type="file"
            onChange={changeHandler}
          />
          <button className={c["ui-btn"]}>
            <span> {!isLoading ? "upload" :<LoadingFetch />}</span>
          </button>
        </form>
        <form onSubmit={submmitHandlerFormation} className={c.form}>
          <label htmlFor="arquivo" className={c.label}>
            upload formation data to data base:
          </label>
          <input
            accept=".xlsx"
            className={c.inpdddut}
            name="arquivo"
            id="arquivo"
            type="file"
            onChange={changeHandlerFormation}
          />
          <button className={c["ui-btn"]}>
             {!isLoading ?<span> "upload"</span> : <LoadingFetch /> }
          </button>
        </form>
      </div>
    </main>
  );
};
export default UploadFiles;
