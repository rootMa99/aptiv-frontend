import { useEffect, useMemo, useState } from "react";
import c from "./UserCriteria.module.css";
import Select from "react-select";


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "30rem",
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
      backgroundColor:"#676c6e"
    },
  }),
  option: (provided, state) => ({
    ...provided,
    width: "30rem",
    color: state.isFocused ? "#f3f3f3" : "#474b4d",
    backgroundColor: state.isFocused && "#474b4d",
    fontWeight: "bold",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol"`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
  }),
  input: (provided) => ({
    ...provided,
    color: '#f3f3f3',
  }),
  singleValue:(p)=>({
    ...p,
    color: '#f3f3f3',
  })
};
const UserCriteria = (p) => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = useMemo(()=>{
    return [{
      value: null,
      label: 'none',
    }];
  } , []) ;

  useEffect(() => {
    p.option.map((m) => {
     

      const optionN = {
        value: m,
        label: m,
      };
      
      return options.push(optionN);
    });
  }, [p.option,options]);
  const handleChange = (e) => {
    setSelectedOption(e);
    p.setUC(e.value)
  };


  return (
    <div className={c.inputContainerUC}>
    
      <div className={c.labelC}>
        <label htmlFor="uc">user criteria</label>
        <Select
          id="uc"
          value={selectedOption}
          onChange={handleChange}
          options={options}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default UserCriteria;
