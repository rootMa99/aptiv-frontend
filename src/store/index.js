
import {configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./EmployeeSlice";


const store= configureStore(

    {
        reducer:{
            empls:EmployeeSlice.reducer,
        }
    }

)

export default store;