// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: "12", // Başlangıçta kullanıcı bilgisi null
  reducers: {
    setUser: (state, action) => {
      return action.payload; // Kullanıcı bilgisini sakla
    },
    clearUser: (state) => {
      return null; // Kullanıcı bilgisini temizle
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
