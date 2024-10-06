import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      size="icon"
      variant="outline"
      className={`rounded-full p-2 transition-color ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      onClick={ handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon className={`w-6 h-6 ${star <= rating ? 'fill-yellow-500' : 'fill-black'}`} />
    </Button>
  ));
}

export default StarRatingComponent;
