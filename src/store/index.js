import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Yerel depolama kullanmak için
import { combineReducers } from "redux"; // combineReducers ekleyin

import userSlice from "./slices/userSlice";

// Redux Persist konfigürasyonu
const persistConfig = {
  key: "root", // Yerel depolama anahtarı (istediğiniz bir isim olabilir)
  storage, // Kullanılacak depolama yöntemi (localStorage gibi)
};

// Diğer reducer'ları burada ekleyin ve combineReducers ile birleştirin
const rootReducer = combineReducers({
  user: userSlice,
  // Diğer reducer'ları burada ekleyin
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Redux Persist ile saran reducer'ı kullanın
});

export const persistor = persistStore(store); // Redux Persist store'unu oluşturun
