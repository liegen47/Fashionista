import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productImageSearchReducer from "./reducers/imageSearch";

const rootReducer = combineReducers({
  productImageSearch: productImageSearchReducer,
  // Other reducers...
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
