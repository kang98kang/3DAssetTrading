import { createSlice } from "@reduxjs/toolkit";
import { setCart } from "./cartSlice";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const loginUser = (userData) => async (dispatch) => {
  dispatch(setUser(userData));

  const response = await fetch(`/api/user/cart?id=${userData.id}`);
  const cartData = await response.json();
  dispatch(setCart(cartData.cartItems));
};

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
