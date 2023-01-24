import appReducer from "./reducers/appData";
import userReducer from "./reducers/userData";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    app: appReducer,
  },
});

export default store;

// import React, { createContext, useReducer } from "react";

// const initialState = {
//   isAppLock: false,
//   theme: "light",
//   files: [],
//   folders: [],
// };
// const store = createContext(initialState);
// const { Provider } = store;

// const StateProvider = ({ children }) => {
//   const [state, dispatch] = useReducer((state, action) => {
//     switch (action.type) {
//       case "ADD_FILE":
//         return { ...state, files: [...state.files, action.payload] };
//       case "REMOVE_FILE":
//         const filteredIdeas = state.files.filter(
//           (item) => item.id !== action.payload
//         );
//         return { ...state, files: filteredIdeas };
//       case "TOGGLE_THEME":
//         const newTheme = state.theme === "light" ? "dark" : "light";
//         return { ...state, theme: newTheme };
//       case "LOCK_APP":
//         return { ...state, isAppLock: true };
//       case "UNLOCK_APP":
//         return { ...state, isAppLock: false };
//       default:
//         return state;
//     }
//   }, initialState);

//   return <Provider value={{ state, dispatch }}>{children}</Provider>;
// };

// export { store, StateProvider };
