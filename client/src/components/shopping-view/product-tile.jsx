import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({
  product,
  getProductDetailsData,
  addToCartHandler,
}) {

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => getProductDetailsData(product)}>
        <div className="relative mb-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          {product?.totalStock <= 0 ? (
            <Badge className="absolute top-2 left-2 hover:bg-red-600">
              Out of stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge
              className="absolute top-2 left-2 hover:bg-red-600"
              variant="destructive"
            >
              Only {product.totalStock} products left
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge
              className="absolute top-2 left-2 hover:bg-red-600"
              variant="destructive"
            >
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex items-center mb-2 justify-between">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product.brand]}
            </span>
          </div>
          <div className="flex items-center mb-2 justify-between">
            <span
              className={`text-lg font-semibold text-primary ${
                product.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex flex-col">
        <Button
          onClick={() => addToCartHandler(product?._id, product?.totalStock)}
          className="w-full"
          disabled={product.totalStock <= 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
