import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice= createSlice({
    name:"dashboards",
    initialState:{
        dashboardData:[]
    },
    reducers:{
        addDashboard(s,p){
            s.dashboardData=[];
            s.dashboardData=p.payload;
        }
    }
})
export const dashboardActions= dashboardSlice.actions;
export default dashboardSlice;