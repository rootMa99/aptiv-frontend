import { configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./EmployeeSlice";
import alltypeSlice from "./allType-slice";
import dashboardSlice from "./dashboardSlice";

const store = configureStore({
  reducer: {
    empls: EmployeeSlice.reducer,
    typeS: alltypeSlice.reducer,
    dashboardS: dashboardSlice.reducer,
  },
});

export default store;
