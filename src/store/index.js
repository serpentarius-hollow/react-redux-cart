import { configureStore } from "@reduxjs/toolkit";
import UiReducer from "./ui-slice";
import CartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: UiReducer,
    cart: CartReducer,
  },
});

export default store;
