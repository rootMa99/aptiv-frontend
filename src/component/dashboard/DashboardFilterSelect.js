import { useEffect, useMemo } from "react";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "18rem",
    height: "3rem",
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

const DashboardFilterSelect = (p) => {
 // const [selectedOption, setSelectedOption] = useState("");
  const options = useMemo(() => {
    return [
      {
        value: "All",
        label: "ALL",
      },
    ];
  }, []);

  useEffect(() => {
    if (p.identif === "CF") {
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
    //setSelectedOption(e);

    switch (p.identif) {
      case "CF":
        p.chooseTitre(e.value);
        break;
      case "DP":
        p.chooseDepartement(e.value);
        break;
      case "CP":
        p.chooseCategoriePer(e.value);
        break;
      case "CTF":
        p.chooseTitreFormation(e.value);
        break;
      default:
        break;
    }
  };
  //console.log(selectedOption, p.identif);
  return (
    <div>
      <Select
        id="ac"
        value={p.value}
        onChange={handleChange}
        options={options}
        styles={customStyles}
      />
    </div>
  );
};

export default DashboardFilterSelect;
