import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, ChevronRight, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReviewForm, { Review } from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { getStoredReviews, saveReview } from "@/lib/reviews";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product5 from "@/assets/product-5.jpg";

const productData = {
  id: 1,
  name: "Royal Burgundy Embroidered Suit",
  price: 4999,
  originalPrice: 6999,
  discount: 29,
  images: [product1, product5, product2, product3],
  category: "Ethnic Wear",
  subcategory: "Kurta Sets",
  sizes: ["M", "L", "XL", "XXL", "XXXL"],
  stock: 5,
  description: `
    Elevate your festive wardrobe with this exquisite Royal Burgundy Embroidered Suit. 
    Crafted with premium georgette fabric and adorned with intricate zari embroidery, 
    this piece perfectly blends traditional artistry with contemporary elegance.

    - Premium quality georgette fabric
    - Intricate gold zari embroidery
    - Includes kurta, palazzo, and matching dupatta
    - Semi-stitched for custom fit
    - Dry clean only
  `,
  features: [
    "Premium Georgette Fabric",
    "Handcrafted Embroidery",
    "Full Sleeves with Work",
    "Round Neck Design",
    "Matching Dupatta Included",
  ],
  defaultReviews: [
    { id: "default-1", name: "Priya S.", rating: 5, comment: "Absolutely stunning! The embroidery is even more beautiful in person.", date: "2 days ago", productId: 1 },
    { id: "default-2", name: "Anita M.", rating: 4, comment: "Great quality and fits perfectly. Delivery was fast too!", date: "1 week ago", productId: 1 },
    { id: "default-3", name: "Kavita R.", rating: 5, comment: "Wore this for Diwali and received so many compliments!", date: "2 weeks ago", productId: 1 },
  ],
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const product = productData; // In real app, fetch based on id
  const productId = Number(id) || product.id;

  // Load reviews on mount
  useEffect(() => {
    const storedReviews = getStoredReviews(productId);
    const allReviews = [...storedReviews, ...product.defaultReviews.filter(
      (dr) => !storedReviews.some((sr) => sr.id === dr.id)
    )];
    setReviews(allReviews);
  }, [productId]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;

  const handleReviewSubmitted = (newReview: Review) => {
    saveReview(newReview);
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        size: selectedSize || undefined,
        category: product.category,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 
      : 0,
  }));

  return (
    <>
      <Helmet>
        <title>{product.name} | Vasstra - Premium Ethnic Fashion</title>
        <meta name="description" content={`Buy ${product.name} at ₹${product.price}. Premium quality ethnic wear with free shipping. Shop now at Vasstra!`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images[0],
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating.toFixed(1),
              "reviewCount": reviews.length
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/ethnic-wear" className="hover:text-primary">{product.category}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div
                  className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted cursor-zoom-in"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-500",
                      isZoomed && "scale-125"
                    )}
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground font-bold px-3 py-1.5 rounded">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-20 h-24 rounded-md overflow-hidden border-2 transition-all",
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-gold font-medium text-sm uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-5 w-5",
                            star <= Math.round(averageRating)
                              ? "text-gold fill-gold"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium text-destructive">
                        Save ₹{(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Select Size</h3>
                    <button className="text-sm text-primary hover:underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "h-12 min-w-[48px] px-4 rounded-md border-2 font-medium transition-all",
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Urgency */}
                <div className="bg-destructive/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-destructive">
                      Hurry! Only {product.stock} left in stock
                    </span>
                    <span className="text-xs text-muted-foreground">High Demand</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full transition-all"
                      style={{ width: `${(product.stock / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-medium mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="gold" size="xl" className="flex-1" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button variant="hero" size="xl" className="flex-1" onClick={handleBuyNow}>
                    Buy It Now
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={cn("h-5 w-5", isWishlisted && "fill-destructive text-destructive")} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-14 w-14">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                  <div className="flex flex-col items-center text-center">
                    <Truck className="h-6 w-6 text-gold mb-2" />
                    <span className="text-sm font-medium">Free Shipping</span>
                    <span className="text-xs text-muted-foreground">Above ₹999</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Shield className="h-6 w-6 text-gold mb-2" />
                    <span className="text-sm font-medium">Secure Payment</span>
                    <span className="text-xs text-muted-foreground">100% Safe</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <RotateCcw className="h-6 w-6 text-gold mb-2" />
                    <span className="text-sm font-medium">Easy Returns</span>
                    <span className="text-xs text-muted-foreground">7 Days</span>
                  </div>
                </div>

                {/* Policy Notice */}
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Note:</span> No Return | No Exchange | No COD
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mt-16">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                >
                  Reviews ({reviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-8">
                <div className="max-w-3xl">
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {product.description}
                  </p>
                  <h3 className="font-display text-xl font-semibold mt-8 mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Reviews Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-card rounded-xl p-6 shadow-soft sticky top-28">
                      <div className="text-center mb-6">
                        <div className="font-display text-5xl font-bold text-foreground">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center gap-0.5 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-5 w-5",
                                star <= Math.round(averageRating)
                                  ? "text-gold fill-gold"
                                  : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Based on {reviews.length} reviews
                        </p>
                      </div>

                      {/* Rating Distribution */}
                      <div className="space-y-2">
                        {ratingDistribution.map(({ star, count, percentage }) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm w-3">{star}</span>
                            <Star className="h-4 w-4 text-gold fill-gold" />
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List & Form */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Review Form */}
                    <ReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />

                    {/* Reviews List */}
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-semibold">
                        Customer Reviews ({reviews.length})
                      </h3>
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="font-medium text-primary">
                                  {review.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">{review.name}</span>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={cn(
                                        "h-4 w-4",
                                        star <= review.rating
                                          ? "text-gold fill-gold"
                                          : "text-muted-foreground"
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground mt-3">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
