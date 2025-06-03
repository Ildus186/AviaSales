import { configureStore } from "@reduxjs/toolkit";
import ticketFilterReducer from "./ticketSlice";

export const store = configureStore({
  reducer: {
    ticketFilter: ticketFilterReducer,
  },
});

export default store;
