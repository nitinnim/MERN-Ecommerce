import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQuantity,
} from "@/store/shop/cart-slice";
import { useToast } from "../hooks/use-toast";

function CartSheetItems({ item }) {
  // console.log(item, "-item")
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const { toast } = useToast();

  function removeItemFromCart(item) {
    // console.log(item.productId, '-shhetitems')
    dispatch(
      deleteCartItem({ userId: user?.id, productId: item?.productId })
    ).then((data) => {
      if (data.payload.success) {
        toast({
          title: "Product removed from cart",
        });
      }
    });
  }

  function changeItemQuantity(item, actionToPerform) {
    // console.log(item, '-item');
    if (actionToPerform == "plus") {
      let getCartItems = cart.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (singleItem) => singleItem.productId === item?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === item?.productId
        );

        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;
        // console.log(indexOfCurrentCartItem, getTotalStock, getCurrentProductIndex, '-item');
        if(indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem]?.quantity;
          if(getQuantity+1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: 'destructive'
            })
            return;
          }
        }

      }
    }

    dispatch(
      updateCartItemQuantity({
        userId: user?.id,
        productId: item?.productId,
        quantity:
          actionToPerform === "minus" ? item.quantity - 1 : item.quantity + 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  return (
    <div>
      <div className="flex items-center space-x-4 px-2 mt-5">
        <div>
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 rounded border object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="font-extrabold">{item.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => changeItemQuantity(item, "minus")}
              disabled={item.quantity === 1}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => changeItemQuantity(item, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold">
            {(
              (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity
            ).toFixed(2)}
          </span>
          <Trash
            onClick={() => removeItemFromCart(item)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
    </div>
  );
}

export default CartSheetItems;
