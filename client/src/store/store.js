
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from './admin/product-slice';
import adminOrderSlice from './admin/order-slice';
import shopProductSlice from './shop/product-slice';
import cartSlice from './shop/cart-slice';
import addressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';
import shopSearchSlice from './shop/search-slice';
import shopReviewSlice from './shop/review-slice';
import commonFeature from './common-slice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        adminOrder: adminOrderSlice,
        shopProducts: shopProductSlice,
        shopCart: cartSlice,
        shopAddress: addressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,
        commonFeature: commonFeature
    },
});
export default store;
