import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "./JobSlice";

export default configureStore({reducer: JobSlice});