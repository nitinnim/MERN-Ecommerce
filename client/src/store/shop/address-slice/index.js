import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
      formData
    );

    return response?.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
    );

    return response?.data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({userId, addressId, formData}) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/address/edit/${userId}/${addressId}`,
      formData
    );

    return response?.data;
  } 
);

export const getAllAddress = createAsyncThunk(
  "/address/getAllAddress",
  async ({ userId }) => {
  // console.log(userId, "-store");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`,
    );

    return response?.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addNewAddress.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
    })
    .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
    })
    .addCase(deleteAddress.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
    })
    .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
    })
    .addCase(editAddress.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
    })
    .addCase(editAddress.rejected, (state, action) => {
        state.isLoading = false;
    })
    .addCase(getAllAddress.pending, (state, action) => {
        state.isLoading = true;
    })
    .addCase(getAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
    })
    .addCase(getAllAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
    })
  },
});

export default addressSlice.reducer;