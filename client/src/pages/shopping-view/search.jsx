import CommonForm from "@/components/common/form";
import { useToast } from "@/components/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getProductDetails } from "@/store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { Component } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { cart } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { searchResults } = useSelector((state) => state.shopSearch);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // add to cart handler
  function addToCartHandler(productId, totalStock) {
    let getCartItems = cart.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    );
  }

  // Show dialog box
  useEffect(() => {
    if (productDetails != null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // get product details
  function getProductDetailsData(productId) {
    dispatch(getProductDetails(productId._id));
  }

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      dispatch(resetSearchResults());
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
    }
  }, [keyword]);

  //   console.log(searchResults, "-searchResults");

  return (
    <div className="grid grid-col container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            placeholder="Search Products..."
            className="border-black py-6"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((item) => (
            <ShoppingProductTile
              product={item}
              getProductDetailsData={getProductDetailsData}
              addToCartHandler={addToCartHandler}
            />
          ))
        ) : (
          <h1 className="text-5xl font-bold w-[100vw]">No Results Found!</h1>
        )}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        addToCartHandler={addToCartHandler}
      />
    </div>
  );
}

export default SearchProducts;
