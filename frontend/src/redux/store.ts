import { combineReducers, configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/carsSlice";
import userReducer from "./slices/userSlice";
import usersReducer from "./slices/usersSlice";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import requestsReducer from "./slices/requestsSlice";
import userRequestsReducer from "./slices/userRequestsSlice";

const persitConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  userSlice: userReducer,
  carsSlice: carsReducer,
  usersSlice: usersReducer,
  requestsSlice: requestsReducer,
  userRequestsSlice: userRequestsReducer
});

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
