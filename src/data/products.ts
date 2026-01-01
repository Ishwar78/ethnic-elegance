import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  hoverImage: string;
  category: string;
  subcategory?: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isSummer?: boolean;
  isWinter?: boolean;
  isEthnic?: boolean;
  isWestern?: boolean;
}

export const products: Product[] = [
  // Kurta Sets (6 products)
  { id: 1, name: "Royal Burgundy Embroidered Suit", price: 4999, originalPrice: 6999, discount: 29, image: product1, hoverImage: product5, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["M", "L", "XL"], colors: ["Burgundy"], isNew: true, isBestseller: true, isEthnic: true },
  { id: 7, name: "Teal Georgette Kurta Set", price: 3999, originalPrice: 5499, discount: 27, image: product7, hoverImage: product2, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["M", "L", "XL"], colors: ["Teal"], isNew: true, isSummer: true, isEthnic: true },
  { id: 8, name: "Orange Bandhani Suit", price: 3499, originalPrice: 4999, discount: 30, image: product8, hoverImage: product8, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["S", "M", "L"], colors: ["Orange"], isSummer: true, isEthnic: true },
  { id: 13, name: "Mint Green Chikankari Kurta", price: 4299, originalPrice: 5999, discount: 28, image: product6, hoverImage: product7, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["S", "M", "L", "XL"], colors: ["Green"], isNew: true, isEthnic: true },
  { id: 14, name: "Navy Blue Silk Kurta Set", price: 5299, originalPrice: 7499, discount: 29, image: product2, hoverImage: product4, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["M", "L", "XL"], colors: ["Blue"], isBestseller: true, isEthnic: true },
  { id: 15, name: "Peach Cotton Kurta Set", price: 2999, originalPrice: 4299, discount: 30, image: product3, hoverImage: product5, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["S", "M", "L", "XL"], colors: ["Pink"], isSummer: true, isEthnic: true },

  // Anarkali Suits (5 products)
  { id: 2, name: "Royal Blue Anarkali Set", price: 5499, originalPrice: 7999, discount: 31, image: product2, hoverImage: product7, category: "Ethnic Wear", subcategory: "Anarkali Suits", sizes: ["S", "M", "L"], colors: ["Blue"], isBestseller: true, isEthnic: true },
  { id: 16, name: "Wine Red Floor Length Anarkali", price: 7999, originalPrice: 10999, discount: 27, image: product1, hoverImage: product3, category: "Ethnic Wear", subcategory: "Anarkali Suits", sizes: ["S", "M", "L", "XL"], colors: ["Maroon"], isNew: true, isEthnic: true },
  { id: 17, name: "Emerald Green Anarkali Gown", price: 8499, originalPrice: 11999, discount: 29, image: product4, hoverImage: product6, category: "Ethnic Wear", subcategory: "Anarkali Suits", sizes: ["M", "L", "XL"], colors: ["Green"], isBestseller: true, isEthnic: true },
  { id: 18, name: "Powder Pink Anarkali Set", price: 6299, originalPrice: 8999, discount: 30, image: product3, hoverImage: product8, category: "Ethnic Wear", subcategory: "Anarkali Suits", sizes: ["S", "M", "L"], colors: ["Pink"], isNew: true, isEthnic: true },
  { id: 19, name: "Mustard Yellow Anarkali", price: 5799, originalPrice: 7999, discount: 28, image: product8, hoverImage: product1, category: "Ethnic Wear", subcategory: "Anarkali Suits", sizes: ["M", "L", "XL", "XXL"], colors: ["Orange"], isEthnic: true },

  // Lehengas (5 products)
  { id: 3, name: "Pink Bridal Lehenga", price: 12999, originalPrice: 18999, discount: 32, image: product3, hoverImage: product3, category: "Ethnic Wear", subcategory: "Lehengas", sizes: ["M", "L", "XL", "XXL"], colors: ["Pink"], isNew: true, isEthnic: true },
  { id: 20, name: "Royal Maroon Bridal Lehenga", price: 24999, originalPrice: 34999, discount: 29, image: product1, hoverImage: product5, category: "Ethnic Wear", subcategory: "Lehengas", sizes: ["S", "M", "L", "XL"], colors: ["Maroon"], isBestseller: true, isEthnic: true },
  { id: 21, name: "Teal Embroidered Lehenga", price: 15999, originalPrice: 21999, discount: 27, image: product7, hoverImage: product2, category: "Ethnic Wear", subcategory: "Lehengas", sizes: ["M", "L", "XL"], colors: ["Teal"], isNew: true, isEthnic: true },
  { id: 22, name: "Golden Beige Reception Lehenga", price: 18999, originalPrice: 25999, discount: 27, image: product6, hoverImage: product4, category: "Ethnic Wear", subcategory: "Lehengas", sizes: ["S", "M", "L"], colors: ["Ivory"], isBestseller: true, isEthnic: true },
  { id: 23, name: "Navy Blue Designer Lehenga", price: 16999, originalPrice: 22999, discount: 26, image: product2, hoverImage: product7, category: "Ethnic Wear", subcategory: "Lehengas", sizes: ["M", "L", "XL", "XXL"], colors: ["Blue"], isEthnic: true },

  // Party Wear (5 products)
  { id: 4, name: "Emerald Silk Saree", price: 8999, originalPrice: 11999, discount: 25, image: product4, hoverImage: product4, category: "Ethnic Wear", subcategory: "Party Wear", sizes: ["Free Size"], colors: ["Green"], isEthnic: true },
  { id: 24, name: "Black Sequin Saree", price: 9999, originalPrice: 13999, discount: 29, image: product5, hoverImage: product1, category: "Ethnic Wear", subcategory: "Party Wear", sizes: ["Free Size"], colors: ["Burgundy"], isBestseller: true, isEthnic: true },
  { id: 25, name: "Champagne Gold Gown", price: 11999, originalPrice: 15999, discount: 25, image: product6, hoverImage: product3, category: "Ethnic Wear", subcategory: "Party Wear", sizes: ["S", "M", "L", "XL"], colors: ["Ivory"], isNew: true, isEthnic: true },
  { id: 26, name: "Ruby Red Evening Saree", price: 7999, originalPrice: 10999, discount: 27, image: product1, hoverImage: product8, category: "Ethnic Wear", subcategory: "Party Wear", sizes: ["Free Size"], colors: ["Maroon"], isEthnic: true },
  { id: 27, name: "Peacock Blue Party Suit", price: 6499, originalPrice: 8999, discount: 28, image: product7, hoverImage: product2, category: "Ethnic Wear", subcategory: "Party Wear", sizes: ["M", "L", "XL"], colors: ["Blue"], isNew: true, isEthnic: true },

  // Festive Collection (5 products)
  { id: 5, name: "Maroon Sharara Suit", price: 6999, originalPrice: 9999, discount: 30, image: product5, hoverImage: product1, category: "Ethnic Wear", subcategory: "Festive Collection", sizes: ["M", "L", "XL"], colors: ["Maroon"], isBestseller: true, isEthnic: true },
  { id: 11, name: "Woolen Shawl Suit", price: 7999, originalPrice: 10999, discount: 27, image: product4, hoverImage: product5, category: "Ethnic Wear", subcategory: "Festive Collection", sizes: ["M", "L", "XL"], colors: ["Green"], isWinter: true, isEthnic: true },
  { id: 28, name: "Diwali Special Red Suit", price: 5999, originalPrice: 8499, discount: 29, image: product1, hoverImage: product3, category: "Ethnic Wear", subcategory: "Festive Collection", sizes: ["S", "M", "L", "XL"], colors: ["Maroon"], isNew: true, isEthnic: true },
  { id: 29, name: "Eid Collection Green Sharara", price: 7499, originalPrice: 10499, discount: 29, image: product4, hoverImage: product7, category: "Ethnic Wear", subcategory: "Festive Collection", sizes: ["M", "L", "XL"], colors: ["Green"], isBestseller: true, isEthnic: true },
  { id: 30, name: "Navratri Special Chaniya Choli", price: 8999, originalPrice: 12499, discount: 28, image: product3, hoverImage: product6, category: "Ethnic Wear", subcategory: "Festive Collection", sizes: ["S", "M", "L"], colors: ["Pink"], isNew: true, isEthnic: true },

  // Tops & Tees (5 products)
  { id: 10, name: "Navy Blue Top", price: 1999, originalPrice: 2999, discount: 33, image: product2, hoverImage: product3, category: "Western Wear", subcategory: "Tops & Tees", sizes: ["S", "M", "L", "XL"], colors: ["Blue"], isNew: true, isWestern: true },
  { id: 31, name: "White Ruffle Top", price: 1799, originalPrice: 2499, discount: 28, image: product6, hoverImage: product8, category: "Western Wear", subcategory: "Tops & Tees", sizes: ["S", "M", "L"], colors: ["Ivory"], isSummer: true, isWestern: true },
  { id: 32, name: "Striped Crop Top", price: 1499, originalPrice: 2199, discount: 32, image: product7, hoverImage: product2, category: "Western Wear", subcategory: "Tops & Tees", sizes: ["S", "M", "L", "XL"], colors: ["Blue"], isNew: true, isWestern: true },
  { id: 33, name: "Floral Print Blouse", price: 2299, originalPrice: 3299, discount: 30, image: product3, hoverImage: product5, category: "Western Wear", subcategory: "Tops & Tees", sizes: ["S", "M", "L"], colors: ["Pink"], isBestseller: true, isWestern: true },
  { id: 34, name: "Black Formal Top", price: 2499, originalPrice: 3499, discount: 29, image: product5, hoverImage: product1, category: "Western Wear", subcategory: "Tops & Tees", sizes: ["S", "M", "L", "XL"], colors: ["Burgundy"], isWestern: true },

  // Dresses (5 products)
  { id: 9, name: "Velvet Maroon Dress", price: 5999, originalPrice: 7999, discount: 25, image: product1, hoverImage: product2, category: "Western Wear", subcategory: "Dresses", sizes: ["S", "M", "L"], colors: ["Maroon"], isWinter: true, isWestern: true },
  { id: 35, name: "Floral Maxi Dress", price: 3999, originalPrice: 5499, discount: 27, image: product3, hoverImage: product6, category: "Western Wear", subcategory: "Dresses", sizes: ["S", "M", "L", "XL"], colors: ["Pink"], isSummer: true, isWestern: true },
  { id: 36, name: "Little Black Dress", price: 4499, originalPrice: 5999, discount: 25, image: product5, hoverImage: product8, category: "Western Wear", subcategory: "Dresses", sizes: ["S", "M", "L"], colors: ["Burgundy"], isBestseller: true, isWestern: true },
  { id: 37, name: "Blue Denim Shirt Dress", price: 3299, originalPrice: 4599, discount: 28, image: product2, hoverImage: product7, category: "Western Wear", subcategory: "Dresses", sizes: ["S", "M", "L", "XL"], colors: ["Blue"], isNew: true, isWestern: true },
  { id: 38, name: "Emerald Cocktail Dress", price: 5499, originalPrice: 7499, discount: 27, image: product4, hoverImage: product3, category: "Western Wear", subcategory: "Dresses", sizes: ["S", "M", "L"], colors: ["Green"], isWestern: true },

  // Co-ord Sets (5 products)
  { id: 6, name: "Ivory Gold Palazzo Set", price: 4499, originalPrice: 5999, discount: 25, image: product6, hoverImage: product6, category: "Western Wear", subcategory: "Co-ord Sets", sizes: ["S", "M", "L", "XL"], colors: ["Ivory"], isSummer: true, isWestern: true },
  { id: 39, name: "Pink Blazer Set", price: 5999, originalPrice: 7999, discount: 25, image: product3, hoverImage: product1, category: "Western Wear", subcategory: "Co-ord Sets", sizes: ["S", "M", "L"], colors: ["Pink"], isBestseller: true, isWestern: true },
  { id: 40, name: "Olive Green Co-ord", price: 3999, originalPrice: 5499, discount: 27, image: product4, hoverImage: product7, category: "Western Wear", subcategory: "Co-ord Sets", sizes: ["S", "M", "L", "XL"], colors: ["Green"], isNew: true, isWestern: true },
  { id: 41, name: "Lavender Linen Set", price: 4299, originalPrice: 5799, discount: 26, image: product8, hoverImage: product2, category: "Western Wear", subcategory: "Co-ord Sets", sizes: ["S", "M", "L"], colors: ["Pink"], isSummer: true, isWestern: true },
  { id: 42, name: "Navy Power Suit Set", price: 6499, originalPrice: 8999, discount: 28, image: product2, hoverImage: product5, category: "Western Wear", subcategory: "Co-ord Sets", sizes: ["S", "M", "L", "XL"], colors: ["Blue"], isNew: true, isWestern: true },

  // Casual Wear (5 products)
  { id: 12, name: "Casual Cotton Dress", price: 2499, originalPrice: 3499, discount: 29, image: product6, hoverImage: product7, category: "Western Wear", subcategory: "Casual Wear", sizes: ["S", "M", "L"], colors: ["Ivory"], isSummer: true, isWestern: true },
  { id: 43, name: "Denim Jumpsuit", price: 3499, originalPrice: 4799, discount: 27, image: product2, hoverImage: product4, category: "Western Wear", subcategory: "Casual Wear", sizes: ["S", "M", "L", "XL"], colors: ["Blue"], isBestseller: true, isWestern: true },
  { id: 44, name: "Striped Culottes Set", price: 2799, originalPrice: 3999, discount: 30, image: product7, hoverImage: product3, category: "Western Wear", subcategory: "Casual Wear", sizes: ["S", "M", "L"], colors: ["Blue"], isNew: true, isWestern: true },
  { id: 45, name: "Boho Print Maxi", price: 3299, originalPrice: 4499, discount: 27, image: product8, hoverImage: product6, category: "Western Wear", subcategory: "Casual Wear", sizes: ["S", "M", "L", "XL"], colors: ["Orange"], isSummer: true, isWestern: true },
  { id: 46, name: "Weekend Lounge Set", price: 2299, originalPrice: 3299, discount: 30, image: product5, hoverImage: product1, category: "Western Wear", subcategory: "Casual Wear", sizes: ["S", "M", "L"], colors: ["Ivory"], isNew: true, isWestern: true },
];

export const categories = ["All", "Ethnic Wear", "Anarkali", "Lehenga", "Saree", "Sharara", "Palazzo", "Kurta Set"];
export const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
export const colors = [
  { name: "Burgundy", hex: "#722F37" },
  { name: "Blue", hex: "#1E3A8A" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Green", hex: "#059669" },
  { name: "Maroon", hex: "#800000" },
  { name: "Ivory", hex: "#FFFFF0" },
  { name: "Teal", hex: "#0D9488" },
  { name: "Orange", hex: "#EA580C" },
];

export const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
  { label: "Popularity", value: "popularity" },
];

export const ethnicSubcategories = [
  { name: "Kurta Sets", href: "/ethnic-wear/kurta-sets" },
  { name: "Anarkali Suits", href: "/ethnic-wear/anarkali-suits" },
  { name: "Lehengas", href: "/ethnic-wear/lehengas" },
  { name: "Party Wear", href: "/ethnic-wear/party-wear" },
  { name: "Festive Collection", href: "/ethnic-wear/festive-collection" },
];

export const westernSubcategories = [
  { name: "Tops & Tees", href: "/western-wear/tops-tees" },
  { name: "Dresses", href: "/western-wear/dresses" },
  { name: "Co-ord Sets", href: "/western-wear/coord-sets" },
  { name: "Casual Wear", href: "/western-wear/casual-wear" },
];
