import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import CartSheetWrapper from "./cart-sheet-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

function MenuItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function hanldeNavigateToShopItems(menuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? { category: [menuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${menuItem.id}`))
      : navigate(menuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer"
          onClick={() => {
            hanldeNavigateToShopItems(menuItem);
          }}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartSheet, setCartSheet] = useState(false);
  const { cart } = useSelector((state) => state.shopCart);

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login")
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Sheet open={cartSheet} onOpenChange={() => setCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCartSheet(true)}
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span
            className="absolute top-[-5px] right-[2px] rounded aspect-square font-bold"
            size="icon"
          >
            {cart?.items?.length || 0}
          </span>
        </Button>

        <CartSheetWrapper
          cartItems={
            cart && cart.items && cart.items.length > 0 ? cart.items : []
          }
          setCartSheet={setCartSheet}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-[20px] text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-3">
          <DropdownMenuLabel>Log in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="w-4 h-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems(user.id));
  });

  // console.log(user, "-user");
  return (
    <header className="z-40 w-full sticky top-0 border-b bg-background">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <Link to={"/shop/home"} className="flex gap-1 items-center">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Nav-Items */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItem />
            <HeaderRightContent user={user} />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItem />
        </div>

        {/* Profile */}
        <div className="hidden lg:block">
          <HeaderRightContent user={user} />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
