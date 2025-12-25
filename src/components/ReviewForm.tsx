import { useState } from "react";
import { Star } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().trim().min(10, "Review must be at least 10 characters").max(500, "Review must be less than 500 characters"),
});

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  productId: number;
}

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted: (review: Review) => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ name?: string; rating?: string; comment?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reviewSchema.safeParse({ name, rating, comment });

    if (!result.success) {
      const fieldErrors: { name?: string; rating?: string; comment?: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field as keyof typeof fieldErrors] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newReview: Review = {
      id: `review-${Date.now()}`,
      name: result.data.name,
      rating: result.data.rating,
      comment: result.data.comment,
      date: "Just now",
      productId,
    };

    onReviewSubmitted(newReview);

    toast({
      title: "Review Submitted!",
      description: "Thank you for sharing your feedback.",
    });

    // Reset form
    setName("");
    setRating(0);
    setComment("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-muted/30 rounded-xl p-6 space-y-6">
      <h3 className="font-display text-xl font-semibold">Write a Review</h3>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium mb-3">Your Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  (hoverRating || rating) >= star
                    ? "text-gold fill-gold"
                    : "text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-destructive text-sm mt-1">{errors.rating}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Name *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          maxLength={50}
          className={cn(errors.name && "border-destructive")}
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Review *</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          maxLength={500}
          className={cn(errors.comment && "border-destructive")}
        />
        <div className="flex justify-between mt-1">
          {errors.comment ? (
            <p className="text-destructive text-sm">{errors.comment}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground">
            {comment.length}/500
          </span>
        </div>
      </div>

      <Button type="submit" variant="hero" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
