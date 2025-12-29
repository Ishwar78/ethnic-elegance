import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import QuickViewModal from "@/components/QuickViewModal";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const products = [
  {
    id: 1,
    name: "Royal Burgundy Embroidered Suit",
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    image: product1,
    hoverImage: product5,
    category: "Ethnic Wear",
    sizes: ["M", "L", "XL"],
    colors: ["Burgundy"],
    isNew: true,
  },
  {
    id: 2,
    name: "Royal Blue Anarkali Set",
    price: 5499,
    originalPrice: 7999,
    discount: 31,
    image: product2,
    hoverImage: product7,
    category: "Anarkali",
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    isBestseller: true,
  },
  {
    id: 3,
    name: "Pink Bridal Lehenga",
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    image: product3,
    hoverImage: product3,
    category: "Lehenga",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Pink"],
    isNew: true,
  },
  {
    id: 4,
    name: "Emerald Silk Saree",
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    image: product4,
    hoverImage: product4,
    category: "Saree",
    sizes: ["Free Size"],
    colors: ["Green"],
  },
  {
    id: 5,
    name: "Maroon Sharara Suit",
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    image: product5,
    hoverImage: product1,
    category: "Sharara",
    sizes: ["M", "L", "XL"],
    colors: ["Maroon"],
    isBestseller: true,
  },
  {
    id: 6,
    name: "Ivory Gold Palazzo Set",
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    image: product6,
    hoverImage: product6,
    category: "Palazzo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory"],
  },
  {
    id: 7,
    name: "Teal Georgette Kurta Set",
    price: 3999,
    originalPrice: 5499,
    discount: 27,
    image: product7,
    hoverImage: product2,
    category: "Kurta Set",
    sizes: ["M", "L", "XL"],
    colors: ["Teal"],
    isNew: true,
  },
  {
    id: 8,
    name: "Orange Bandhani Suit",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    image: product8,
    hoverImage: product8,
    category: "Ethnic Wear",
    sizes: ["S", "M", "L"],
    colors: ["Orange"],
  },
];

interface ProductCardProps {
  product: typeof products[0];
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      discount: product.discount,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        className="group animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg bg-card shadow-soft group-hover:shadow-hover transition-all duration-500">
          <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
            <img
              src={isHovered ? product.hoverImage : product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-gold text-charcoal text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  BESTSELLER
                </span>
              )}
            </div>

            <div className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            )}>
              <button
                onClick={handleToggleWishlist}
                className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
                  isWishlisted
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
              </button>
              <button
                onClick={handleQuickView}
                className="h-9 w-9 rounded-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-md"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>

            <div className={cn(
              "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <Button variant="gold" className="w-full gap-2" onClick={handleAddToCart}>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </Link>

          <div className="p-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.category}
            </span>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-display text-xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold font-medium tracking-widest uppercase text-sm">
            Curated for You
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked styles that define elegance and tradition
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
