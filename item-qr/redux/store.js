import { configureStore } from "@reduxjs/toolkit";
import qrReducer from "./qrSlice";

export const store = configureStore({
  reducer: {
    qr: qrReducer,
  },
});
