import { useEffect, useMemo, useState } from "react";
import c from "./AdvancedCriteria.module.css";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "33rem",
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
  console.log("this AC run");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionType, setSelectedOptionType] = useState(null);
  const [trainigType, setTrainigType] = useState([]);
  
  const options = useMemo(() => {
    return [];
  }, []);

  const keys = Object.keys(p.option);
  console.log(keys, options);

  useEffect(() => {
    console.log("effect AC run");
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
    console.log("thi");
    const existing = keys.find((f) => {
      return f === opt;
    });
    console.log(opt);
    if (existing !== undefined && Object.keys(p.option).length > 0) {
      const types = [];
      p.option[opt].map((m) => {
        return types.push({ value: m, label: m });
      });
      setTrainigType(types);
    }
  };

  const handleChange = (e) => {
    console.log(e);
    setSelectedOption(e);
    getTypeOpt(e.value);
  };
  const handleChangeType = (e) => {
    setSelectedOptionType(e);
  };

  return (
    <div className={c.inputContainerUC}>
      <div className={c.labelC}>
        <label htmlFor="advancedCriteria">trainig title</label>
        <Select
          id="advancedCriteria"
          value={selectedOption}
          onChange={handleChange}
          options={options}
          styles={customStyles}
          menuPlacement="top"
        />
      </div>

      {trainigType.length > 0 && (
        <div className={`${c.labelC} ${c.anim}`}>
          <label htmlFor="advancedCriteria">trainig type</label>
          <Select
            id="advancedCriteria"
            value={selectedOptionType}
            onChange={handleChangeType}
            options={trainigType}
            styles={customStyles}
            menuPlacement="top"
          />
        </div>
      )}
    </div>
  );
};
export default AdvancedCriteria;
