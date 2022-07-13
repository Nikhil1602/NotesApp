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
