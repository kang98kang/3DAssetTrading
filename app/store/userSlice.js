import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 설정
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    cart: [], // 장바구니 데이터를 저장할 배열
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.cart = []; // 유저 로그아웃 시 장바구니도 초기화
    },
    setCart: (state, action) => {
      state.cart = action.payload; // 전체 장바구니 데이터를 설정
    },
    addToCart: (state, action) => {
      // 장바구니에 항목 추가
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        // 이미 장바구니에 있는 경우 수량 업데이트
        existingItem.quantity += action.payload.quantity;
      } else {
        // 새로운 항목을 장바구니에 추가
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      // 특정 항목을 장바구니에서 제거
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    updateCartItemQuantity: (state, action) => {
      // 장바구니 항목의 수량 업데이트
      const item = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      // 장바구니 비우기
      state.cart = [];
    },
  },
});

export const {
  setUser,
  clearUser,
  setCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} = authSlice.actions;

export default authSlice.reducer;
