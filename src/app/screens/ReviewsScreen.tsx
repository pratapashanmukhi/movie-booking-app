import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Star, ThumbsUp } from "lucide-react";
import { reviews } from "../data/movies";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

export function ReviewsScreen() {
  const navigate = useNavigate();
  const [showAddReview, setShowAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-background border border-border w-10 h-10 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl" style={{ fontWeight: 700 }}>
              Reviews & Ratings
            </h1>
            <p className="text-sm text-muted-foreground">
              {reviews.length} reviews
            </p>
          </div>
          <Button
            onClick={() => setShowAddReview(!showAddReview)}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl"
          >
            Add Review
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-card to-card/50 border border-border rounded-3xl p-6 mb-6"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              <span className="text-5xl" style={{ fontWeight: 700 }}>
                4.5
              </span>
            </div>
            <p className="text-muted-foreground mb-4">out of 5</p>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= 4.5
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {reviews.length} reviews
            </p>
          </div>
        </motion.div>

        {/* Add Review Form */}
        {showAddReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card border border-border rounded-2xl p-5 mb-6 overflow-hidden"
          >
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>
              Write Your Review
            </h3>
            
            {/* Star Rating */}
            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block">
                Your Review
              </label>
              <Textarea
                placeholder="Share your thoughts about the movie..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-24 bg-background border-border rounded-xl"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAddReview(false)}
                className="flex-1 rounded-xl border-border"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl"
                disabled={rating === 0 || !reviewText}
              >
                Submit
              </Button>
            </div>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-lg" style={{ fontWeight: 600 }}>
            User Reviews
          </h3>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                    <span style={{ fontWeight: 600 }}>
                      {review.user.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600 }}>{review.user}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm" style={{ fontWeight: 600 }}>
                    {review.rating}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground mb-3">{review.comment}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful (23)</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
