
import {configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./EmployeeSlice";
import alltypeSlice from "./allType-slice";


const store= configureStore(

    {
        reducer:{
            empls:EmployeeSlice.reducer,
            typeS:alltypeSlice.reducer
        }
    }

)

export default store;