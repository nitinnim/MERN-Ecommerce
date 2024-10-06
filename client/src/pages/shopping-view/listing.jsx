import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowDownUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProduct,
  getProductDetails,
} from "../../store/shop/product-slice";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

// import { getProductDetails } from "@/store/shop/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/hooks/use-toast";

function createSearchParamHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const Listing = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [filters, setFilters] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const categorySearchParam = searchParams.get('category')

  // sort the products
  function handleSort(value) {
    // console.log(item,"-item");
    setSort(value);
  }

  // apply the filters on products
  function handleFilters(getSectionId, getCurrentOptions) {
    let cpyFilters = { ...filters };

    let indexOfcurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfcurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOptions);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOptions);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }
  // console.log(filters, "-filters");

  // creating the search query including filters
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // initilizing the sort and filters with session storage
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  // fetching the products
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProduct({ filtersParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  // Show dialog box
  useEffect(() => {
    if (productDetails != null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // get product details
  function getProductDetailsData(productId) {
    dispatch(getProductDetails(productId._id));
  }

  // add to cart handler
  function addToCartHandler(getCurrentProductId, getTotalStock) {
    // console.log('Inside addToCartHandler');

    let getCartItems = cart.items || [];
    // console.log(getCartItems, '-getCartItems');
    if(getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductId);
      if(indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem]?.quantity;
        if(getQuantity+1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: 'destructive'
          })
          return;
        }
      }
    }

    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    );
  }

  // console.log(productList, '-productList');
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4">
      <ProductFilter filters={filters} handleFilters={handleFilters} />

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="flex flex-row p-4 items-center justify-between border-b">
          <h3 className="text-lg font-extrabold">All Products</h3>

          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">
              {productList?.length} Products
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem?.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((product, id) => (
                <ShoppingProductTile
                  key={id}
                  product={product}
                  getProductDetailsData={getProductDetailsData}
                  addToCartHandler={addToCartHandler}
                />
              ))
            : null}
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        addToCartHandler={addToCartHandler}
      />
    </div>
  );
};

export default Listing;
