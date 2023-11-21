import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../component/hooks/dateCriteriaFunctions";

const curretDate = new Date();
const currentYear = curretDate.getFullYear();
const jan = new Date(currentYear, 0, 1);
const dec = new Date(currentYear, 11, 31);

const dashboardSlice = createSlice({
  name: "dashboards",
  initialState: {
    dashboardData: [],
    selectedDate: {
      startDate: formatDate(jan),
      endDate: formatDate(dec),
    },
  },
  reducers: {
    addDashboard(s, p) {
      s.dashboardData = [];
      s.dashboardData = p.payload;
    },
    setSelectedDate(s, p) {
      s.selectedDate.startDate = p.payload.startDate;
      s.selectedDate.endDate = p.payload.endDate;
    },
  },
});
export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice;
