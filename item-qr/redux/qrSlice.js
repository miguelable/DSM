import { createSlice } from "@reduxjs/toolkit";

const qrSlice = createSlice({
  name: "qr",
  initialState: {
    scannedData: "", // Almacena el contenido del QR escaneado
  },
  reducers: {
    setScannedData: (state, action) => {
      state.scannedData = action.payload;
    },
    clearScannedData: (state) => {
      state.scannedData = "";
    },
  },
});

export const { setScannedData, clearScannedData } = qrSlice.actions;
export default qrSlice.reducer;
