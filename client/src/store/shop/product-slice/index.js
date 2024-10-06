import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null
};

export const fetchAllFilteredProduct = createAsyncThunk(
  "/products/fetchAllFilteredProduct",
  async ({ filtersParams, sortParams }) => {
    const query = new URLSearchParams({ ...filtersParams, sortBy: sortParams });

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );
    return response?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "/products/getProductDetails",
  async (id) => {
    // console.log("shop-",id)
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/getproductdetails/${id}`,
    );

    return response?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState: initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});
export const {setProductDetails} = shopProductSlice.actions;
export default shopProductSlice.reducer;
