import { useSelector } from "react-redux";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartSheetItems from "./cart-sheet-items";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CartSheetWrapper({ cartItems, setCartSheet }) {
  // const {cart} = useSelector((state) => state.shopCart)
  const [totalCostOfItems, setTotalCostOfItems] = useState(0);
  const navigate = useNavigate();

  const totalCartItemAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId}>
              <CartSheetItems item={item} key={item.title} />
              <Separator className="mt-1" />
            </div>
          ))
        ) : (
          <div>No items</div>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartItemAmount}</span>
        </div>
      </div>
      <Button
        className="mt-6 w-full"
        onClick={() => {
          setCartSheet(false);
          navigate("/shop/checkout");
        }}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default CartSheetWrapper;
