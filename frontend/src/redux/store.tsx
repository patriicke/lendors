// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// // import userReducer from "./slices/userSlice";
// // import persistStore from "redux-persist/es/persistStore";
// // import storage from "redux-persist/lib/storage";
// // import persistReducer from "redux-persist/es/persistReducer";
// // import sessionStorage from "redux-persist/es/storage/session";
// // const rootPersitConfig = {
// //   key: "root",
// //   storage
// //   // blacklist: ["counterSlice"]
// // };
// // // Here we also don't want to persist our count property in the counterSlice
// // const counterPersistConfig = {
// //   key: "count",
// //   storage: sessionStorage
// // };
// // const rootReducer = combineReducers({
// //   userSlice: userReducer,
// //   counterSlice: persistReducer(counterPersistConfig, counterReducer)
// // });
// // const persistedReducer = persistReducer(rootPersitConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk]
// });
// export const persistor = persistStore(store);
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
// import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk]
});
