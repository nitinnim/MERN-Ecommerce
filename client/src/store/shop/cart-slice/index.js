import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cart: [],
};
export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, productId, quantity }) => {
    // console.log(userId, productId, quantity, "-store")
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
      { userId, productId, quantity }
    );

    return response?.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "/cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/delete/${userId}/${productId}`,
    );

    return response?.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "/cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`,
    );

    return response?.data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "/cart/updateCartItemQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
      { userId, productId, quantity }
    );

    return response?.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
    })
    .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cart = [];
    })
    .addCase(deleteCartItem.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
    })
    .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
    })
    .addCase(updateCartItemQuantity.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
    })
    .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
    })
    .addCase(fetchCartItems.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
    })
    .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cart = [];
    })
  },
});

export default cartSlice.reducer;