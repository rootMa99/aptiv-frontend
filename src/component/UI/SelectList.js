import { useEffect, useMemo, useState } from "react";
import Select from "react-select";



const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height:'3rem',
      fontWeight: "600",
      borderRadius: "5px",
      fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol"`,
      letterSpacing: "2px",
      textAlign: "center",
      outline: "none",
      border: "2px solid #fff",
      backgroundColor: state.isFocused ? "grey" : "#474b4d",
      boxShadow: "none",
      "&:hover": {
        border: "2px solid #474b4d",
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


  const SelectList=p=>{
    const [selectedOption, setSelectedOption] = useState(p.valueS);
    const options = useMemo(() => {
      return [
        {
          value: "All",
          label: "ALL",
        },
      ];
    }, []);
    useEffect(() => {
        if (p.identif==="CF") {
          const keys = Object.keys(p.option);
    
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
        } else {
          p.option.map((m) => {
            const optionN = {
              value: m,
              label: m,
            };
    
            return options.push(optionN);
          });
        }
      }, [p.option, options, p.identif]);
      const handleChange = (e) => {
        setSelectedOption(e);
        switch(p.identif){
          case "CF" :
              p.chooseTitre(e.value);
              break;
          case "CTF":
              p.chooseTitreFormation(e.value);
              break;
          default:
              break;
      }
    }

    return(
        <Select
        id="ac"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        defaultValue={' '}
      />
    )
  }


  export default SelectList