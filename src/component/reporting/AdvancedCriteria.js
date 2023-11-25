import React, { useEffect, useMemo, useState } from "react";
import c from "./AdvancedCriteria.module.css";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "40rem",
    fontWeight: "600",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol"`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
    border: "2px solid rgb(131, 13, 13)",
    backgroundColor: state.isFocused ? "grey" : "#474b4d",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #b80000",
      backgroundColor: "#676c6e",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "100%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#474b4d",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol"`,
    outline: "none",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "350px", // Set a maximum height to enable scrolling
    overflowY: "auto", // Add a vertical scrollbar if needed
    scrollbarWidth: "thin", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer
    "&::-webkit-scrollbar": {
      width: "9px", // Width of the scrollbar
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8a0101", // Scrollbar thumb color
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent", // Scrollbar track color
    },
  }),
};

const AdvancedCriteria = (p) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionType, setSelectedOptionType] = useState(null);
  const [trainigType, setTrainigType] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  const options = useMemo(() => {
    return [
      {
        value: null,
        label: "ALL",
      },
    ];
  }, []);

  const keys = Object.keys(p.option);

  useEffect(() => {
    const newOptions = [];
    keys.map((m) => {
      const optionN = {
        value: m,
        label: m,
      };
      if (!options.some((option) => option.value === m)) {
        newOptions.push(optionN);
      }
      return options;
    });
    if (newOptions.length > 0) {
      options.push(...newOptions);
    }
  }, [keys, options]);

  const getTypeOpt = (opt) => {
    if (opt === null) {
      setTrainigType([]);
      setSelectedOptionType(null);
    }

    const existing = keys.find((f) => {
      return f === opt;
    });

    if (existing !== undefined && Object.keys(p.option).length > 0) {
      const types = [{ value: null, label: "ALL" }];
      p.option[opt].map((m) => {
        return types.push({ value: m, label: m });
      });
      setTrainigType(types);
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e);
    getTypeOpt(e.value);
    p.advancedC(e.value);
    if (e.value === null) {
      p.trainingC(null);
    }
  };
  const handleChangeType = (e) => {
    setSelectedOptionType(e);
    p.trainingC(e.value);
  };
  const checkBoxChanged = (e) => {
    p.checked(!checkBox);
    setCheckBox(!checkBox);
  };
  return (
    <div className={c.inputContainerUC}>
      <div className={c.labelC}>
        <label htmlFor="ac">trainig type</label>
        <Select
          id="ac"
          value={selectedOption}
          onChange={handleChange}
          options={options}
          styles={customStyles}
        />
      </div>
      <p className={c.parg}>
        (refers to the specific designation or name associated with the training
        program that the employee has completed -
        <span>(this field is optional)</span> )*
      </p>
      {trainigType.length > 0 && (
        <React.Fragment>
          <div className={`${c.labelC}`}>
            <label htmlFor="act">trainig title</label>
            <Select
              id="act"
              value={selectedOptionType}
              onChange={handleChangeType}
              options={trainigType}
              styles={customStyles}
            />
          </div>
          <p className={c.parg}>
            (classification that distinguishes the method or format of the
            employee's training - <span>(this field is optional)</span> )*
          </p>
          <div className={c.checkBox}>
            <label className={c["cyberpunk-checkbox-label"]}>
              <input
                type="checkbox"
                className={c["cyberpunk-checkbox"]}
                checked={checkBox}
                onChange={checkBoxChanged}
              />
              not completed
            </label>
            <div>
              <p>
                (note: TRAINING TITLE is{" "}
                <span style={{ color: "red", fontSize:"14px", borderBottom:"1px solid red", paddingBottom:"3px" }}>
                  required*
                </span>{" "}
                if you checked this checkBox)*
              </p>
              <p>
                (Leave this checkbox unchecked to view only the completed
                training.)*
              </p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default AdvancedCriteria;
