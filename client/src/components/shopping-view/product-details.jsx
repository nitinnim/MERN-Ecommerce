import { setProductDetails } from "@/store/shop/product-slice";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import StarRatingComponent from "../common/star-rating";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useToast } from "../hooks/use-toast";

function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
  addToCartHandler,
}) {
  const dispatch = useDispatch();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview(e) {
    // e.preventDefault();
    dispatch(
      addReview({
        userId: user?.id,
        userName: user?.userName,
        productId: productDetails?._id,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);
  // console.log(productDetails, "-productDetails");

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTitle className="sr-only">Product Details</DialogTitle>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80ww] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square object-cover w-full"
            width={600}
            height={600}
          />
        </div>
        <div className="">
          <div>
            <h2 className="font-extrabold text-3xl">{productDetails?.title}</h2>
            <p className="text-muted-foreground text-normal mt-3 mb-3">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex justify-between items-center mb-3">
            <p
              className={`text-2xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } `}
            >
              {productDetails?.price}
            </p>
            <p className={`text-2xl font-bold text-primary`}>
              {productDetails?.salePrice > 0 ? productDetails.salePrice : null}
            </p>
          </div>

          <div className="flex items-center mt-2 gap-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="my-3">
            <Button
              className="w-full"
              disabled={productDetails?.totalStock <= 0}
              onClick={() =>
                addToCartHandler(
                  productDetails?._id,
                  productDetails?.totalStock
                )
              }
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[200px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((reviewItem) => (
                <div className="grid gap-6 mb-5">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>{reviewItem.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>No reviews found</h2>
            )}
          </div>
          <div className="mt-10 flex-col flex gap-2">
            <Label>Write a review</Label>
            <div className="flex gap-1">
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(event) => setReviewMsg(event.target.value)}
              placeholder="Write a review..."
            />
            <Button
              onClick={handleAddReview}
              disabled={reviewMsg.trim() === ""}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
