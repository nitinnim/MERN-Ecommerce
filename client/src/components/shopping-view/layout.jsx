import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./Footer";

const ShoppingLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col bg-white overflow-hidden min-h-screen">
      {/* common header/navbar */}
      <ShoppingHeader />
      <main className="flex flex-col w-full flex-grow">
        <Outlet />
      </main>
      {/* Conditionally render the footer based on the route */}
      {!location.pathname.includes("/payment-success") && <Footer />}
    </div>
  );
};

export default ShoppingLayout;
