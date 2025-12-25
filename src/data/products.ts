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
  { id: 1, name: "Royal Burgundy Embroidered Suit", price: 4999, originalPrice: 6999, discount: 29, image: product1, hoverImage: product5, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["M", "L", "XL"], colors: ["Burgundy"], isNew: true, isBestseller: true, isEthnic: true },
  { id: 2, name: "Royal Blue Anarkali Set", price: 5499, originalPrice: 7999, discount: 31, image: product2, hoverImage: product7, category: "Ethnic Wear", subcategory: "Anarkali Suits", sizes: ["S", "M", "L"], colors: ["Blue"], isBestseller: true, isEthnic: true },
  { id: 3, name: "Pink Bridal Lehenga", price: 12999, originalPrice: 18999, discount: 32, image: product3, hoverImage: product3, category: "Ethnic Wear", subcategory: "Lehengas", sizes: ["M", "L", "XL", "XXL"], colors: ["Pink"], isNew: true, isEthnic: true },
  { id: 4, name: "Emerald Silk Saree", price: 8999, originalPrice: 11999, discount: 25, image: product4, hoverImage: product4, category: "Ethnic Wear", subcategory: "Party Wear", sizes: ["Free Size"], colors: ["Green"], isEthnic: true },
  { id: 5, name: "Maroon Sharara Suit", price: 6999, originalPrice: 9999, discount: 30, image: product5, hoverImage: product1, category: "Ethnic Wear", subcategory: "Festive Collection", sizes: ["M", "L", "XL"], colors: ["Maroon"], isBestseller: true, isEthnic: true },
  { id: 6, name: "Ivory Gold Palazzo Set", price: 4499, originalPrice: 5999, discount: 25, image: product6, hoverImage: product6, category: "Western Wear", subcategory: "Co-ord Sets", sizes: ["S", "M", "L", "XL"], colors: ["Ivory"], isSummer: true, isWestern: true },
  { id: 7, name: "Teal Georgette Kurta Set", price: 3999, originalPrice: 5499, discount: 27, image: product7, hoverImage: product2, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["M", "L", "XL"], colors: ["Teal"], isNew: true, isSummer: true, isEthnic: true },
  { id: 8, name: "Orange Bandhani Suit", price: 3499, originalPrice: 4999, discount: 30, image: product8, hoverImage: product8, category: "Ethnic Wear", subcategory: "Kurta Sets", sizes: ["S", "M", "L"], colors: ["Orange"], isSummer: true, isEthnic: true },
  { id: 9, name: "Velvet Maroon Dress", price: 5999, originalPrice: 7999, discount: 25, image: product1, hoverImage: product2, category: "Western Wear", subcategory: "Dresses", sizes: ["S", "M", "L"], colors: ["Maroon"], isWinter: true, isWestern: true },
  { id: 10, name: "Navy Blue Top", price: 1999, originalPrice: 2999, discount: 33, image: product2, hoverImage: product3, category: "Western Wear", subcategory: "Tops & Tees", sizes: ["S", "M", "L", "XL"], colors: ["Blue"], isNew: true, isWestern: true },
  { id: 11, name: "Woolen Shawl Suit", price: 7999, originalPrice: 10999, discount: 27, image: product4, hoverImage: product5, category: "Ethnic Wear", subcategory: "Festive Collection", sizes: ["M", "L", "XL"], colors: ["Green"], isWinter: true, isEthnic: true },
  { id: 12, name: "Casual Cotton Dress", price: 2499, originalPrice: 3499, discount: 29, image: product6, hoverImage: product7, category: "Western Wear", subcategory: "Casual Wear", sizes: ["S", "M", "L"], colors: ["Ivory"], isSummer: true, isWestern: true },
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
  { name: "Kurta Sets", href: "/ethnic-wear?sub=kurta-sets" },
  { name: "Anarkali Suits", href: "/ethnic-wear?sub=anarkali-suits" },
  { name: "Lehengas", href: "/ethnic-wear?sub=lehengas" },
  { name: "Party Wear", href: "/ethnic-wear?sub=party-wear" },
  { name: "Festive Collection", href: "/ethnic-wear?sub=festive-collection" },
];

export const westernSubcategories = [
  { name: "Tops & Tees", href: "/western-wear?sub=tops-tees" },
  { name: "Dresses", href: "/western-wear?sub=dresses" },
  { name: "Co-ord Sets", href: "/western-wear?sub=coord-sets" },
  { name: "Casual Wear", href: "/western-wear?sub=casual-wear" },
];
