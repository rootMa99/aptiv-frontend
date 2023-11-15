import React, { useState } from "react";
import c from "./UploadFiles.module.css";
import axios from "axios";

// const postData = async (url, body) => {
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: body,
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {}
// };

const UploadFiles = (p) => {
  const [datafile, setDatafile] = useState(null);
  const [datafilef, setDatafilef] = useState(null);
  const [dataret, setDataret] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);



  const changeHandler = (e) => {
    setDatafile(e.target.files[0]);
  };

  console.log(progress);
  const sendingData= async(url,formData)=>{
    try {
      setIsLoading(true)
      // Start the progress bar
      setProgress(0);

      const response = await axios.post(
        url,
        formData,
        {
          onUploadProgress:  (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(percentCompleted);
            setProgress(percentCompleted);
          },
        }
      );
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      
      setIsLoading(false)
    }
  }

  console.log(datafile);
  const submmitHandler = async (e) => {
    e.preventDefault();
    if (datafile !== null) {
      const formData = new FormData();
      formData.append("file", datafile);
      console.log("start sending...");
      // setIsLoading(true);
      // const data = await postData(
      //   "http://localhost:8081/personel/personel",
      //   formData
      // );
      // setIsLoading(false);

     await sendingData("http://localhost:8081/personel/personel", formData);

      console.log("data fetched");
      setProgress(100);
    }
  };

  const changeHandlerFormation = (e) => {
    setDatafilef(e.target.files[0]);
  };
  console.log(datafile);
  const submmitHandlerFormation = async (e) => {
    e.preventDefault();
    if (datafilef !== null) {
      const formData = new FormData();
      formData.append("file", datafilef);
      console.log("start sending...");
      // setIsLoading(true);
      // const data = await postData(
      //   "http://localhost:8081/formation/uploadFormation",
      //   formData
      // );
      // setIsLoading(false);
      //setDataret(data);
      const data= await sendingData("http://localhost:8081/formation/uploadFormation", formData);
      console.log(data);
      setDataret(data);
      console.log("data fetched");
      setProgress(100);
    }
  };
  console.log(dataret);
  console.log(datafilef);
  return (
    <main className={c.main}>
      <div className={c.inputscontainer}>
        {dataret.length > 0 && (
          <React.Fragment>
            <ul className={c.unlist}>
              <h3>Employees not Found</h3>
              {dataret.map((m) => (
                <li key={m.formationId} className={c.listItem}>
                  <span>{m.matricule}</span>
                  <span>{m.type}</span>
                  <span>{m.categorieFormation}</span>
                  <span>{m.formatteur}</span>
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}
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
            <span>{!isLoading ? "upload" : "uploading..."}</span>
          </button>
        </form>
        {isLoading && (
          <div className={c["progress-bar-container"]}>
            <div
              className={c["progress-bar"]}
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}
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
          <span>{!isLoading ?  "upload" : "uploading..."}</span>
          </button>
        </form>
      </div>
    </main>
  );
};
export default UploadFiles;
