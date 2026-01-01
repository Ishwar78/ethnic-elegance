import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function KurtaSets() {
  const kurtaProducts = products.filter(p => p.subcategory === "Kurta Sets");

  return (
    <CollectionLayout
      title="Kurta Sets"
      subtitle="Elegant kurta sets for every occasion"
      metaTitle="Kurta Sets | Vasstra - Ethnic Fashion"
      metaDescription="Shop beautiful kurta sets collection. Traditional and contemporary designs with premium fabrics. Free shipping above ₹999."
      products={kurtaProducts}
      heroBg="bg-gradient-to-b from-primary/5 to-background"
    />
  );
}
