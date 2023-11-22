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

  const sendingData = async (url, formData) => {
    try {
      setIsLoading(true);
      // Start the progress bar
      setProgress(0);

      const response = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const submmitHandler = async (e) => {
    e.preventDefault();
    if (datafile !== null) {
      const formData = new FormData();
      formData.append("file", datafile);
      // setIsLoading(true);
      // const data = await postData(
      //   "http://localhost:8081/personel/personel",
      //   formData
      // );
      // setIsLoading(false);

      await sendingData("http://localhost:8081/personel/personel", formData);

      setProgress(100);
    }
  };

  const changeHandlerFormation = (e) => {
    setDatafilef(e.target.files[0]);
  };
  const submmitHandlerFormation = async (e) => {
    e.preventDefault();
    if (datafilef !== null) {
      const formData = new FormData();
      formData.append("file", datafilef);
      // setIsLoading(true);
      // const data = await postData(
      //   "http://localhost:8081/formation/uploadFormation",
      //   formData
      // );
      // setIsLoading(false);
      //setDataret(data);
      const data = await sendingData(
        "http://localhost:8081/formation/uploadFormation",
        formData
      );
      setDataret(data);
      setProgress(100);
    }
  };

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
            upload Employee data to database:
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
            upload formation data to database:
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
            <span>{!isLoading ? "upload" : "uploading..."}</span>
          </button>
        </form>
      </div>
    </main>
  );
};
export default UploadFiles;
