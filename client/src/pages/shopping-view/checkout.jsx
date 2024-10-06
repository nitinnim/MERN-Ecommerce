import React, { useState } from "react";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import CartSheetItems from "@/components/shopping-view/cart-sheet-items";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/hooks/use-toast";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { cart } = useSelector((state) => state.shopCart);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);

  const totalCartAmount =
    cart && cart.items && cart.items.length > 0
      ? cart.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (!currentSelectedAddress) {
      toast({
        title: "Please! select one address first",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cart?._id,
      cartItems: cart.items.map((singleCartItem) => ({
        productId: singleCartItem.productId,
        title: singleCartItem.title,
        price:
          singleCartItem.salePrice > 0
            ? singleCartItem.salePrice
            : singleCartItem.price,
        image: singleCartItem.image,
        quantity: singleCartItem.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        phone: currentSelectedAddress?.phone,
        pincode: currentSelectedAddress?.pincode,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    // console.log(orderData, "-cart")

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStarted(true);
      } else {
        setIsPaymentStarted(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="h-[300px] w-full overflow-hidden relative">
        <img
          src={accImg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 p-5 mt-5 gap-8">
        <Address
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          currentSelectedAddressId={currentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cart && cart.items && cart.items.length > 0
            ? cart.items.map((item) => (
                <CartSheetItems item={item} key={item.title} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={() => handleInitiatePaypalPayment()}
              className="w-full"
              disabled={totalCartAmount === 0}
            >
              {isPaymentStarted
                ? "Proceesing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
