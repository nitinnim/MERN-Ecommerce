import { useEffect, useState } from "react";
import AuthLayout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import Dashboard from "./pages/admin-view/dashboard";
import Orders from "./pages/admin-view/orders";
import Products from "./pages/admin-view/products";
import Features from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import Home from "./pages/shopping-view/home";
import Checkout from "./pages/shopping-view/checkout";
import Listing from "./pages/shopping-view/listing";
import Account from "./pages/shopping-view/accounts";
import NotFound from "./pages/NotFound";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import AdminOrders from "./pages/admin-view/orders";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaypalCancelPage from "./pages/shopping-view/paypal-cancel";
import PaymentSuccess from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import Loader from "./components/common/Loader";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
          }
        />
        <Route
          path="auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<Products />} />
          <Route path="features" element={<Features />} />
        </Route>

        <Route
          path="shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="listing" element={<Listing />} />
          <Route path="account" element={<Account />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-cancel" element={<PaypalCancelPage />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unath-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
