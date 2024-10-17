import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginReducers from "./Reducers/loginReducers";
import pendaftaranMagangReducers from "./Reducers/pendaftaranMagangReducers";
import profileReducers from "./Reducers/profileReducers";

const rootReducer = combineReducers({
  auth: loginReducers,
  pendaftaran: pendaftaranMagangReducers,
  profil: profileReducers
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
