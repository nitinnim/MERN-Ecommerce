import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if(location.pathname==='/') {
    if(!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }else{
      if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // if user is not login and try to access shopping page and all
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // if user or admin is logged in and trying to go to login or register page
  if (
    isAuthenticated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // is normal user try to go to the admin page
  if (
    isAuthenticated &&
    location.pathname.includes("admin") &&
    user.role !== "admin"
  ) {
    return <Navigate to="/unath-page" />;
  }

  // if admin try to go to shopping page
  if (
    isAuthenticated &&
    location.pathname.includes("shop") &&
    user.role === "admin"
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
