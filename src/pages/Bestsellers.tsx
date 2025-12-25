import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function Bestsellers() {
  const bestsellers = products.filter(p => p.isBestseller);

  return (
    <CollectionLayout
      title="Bestsellers"
      subtitle="Bestselling Outfits Loved by Customers"
      metaTitle="Bestsellers | Vasstra - Top Selling Ethnic Fashion"
      metaDescription="Shop our bestselling ethnic wear collection. Customer favorites with premium quality and stunning designs. Free shipping above ₹999."
      products={bestsellers}
      showTrending
      heroBg="bg-gradient-to-b from-primary/5 to-background"
    />
  );
}
