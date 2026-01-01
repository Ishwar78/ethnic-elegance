import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function Dresses() {
  const dressProducts = products.filter(p => p.subcategory === "Dresses");

  return (
    <CollectionLayout
      title="Dresses"
      subtitle="Beautiful dresses for every occasion"
      metaTitle="Dresses | Vasstra - Western Fashion"
      metaDescription="Shop stunning dresses collection. Casual, party, and formal dresses. Free shipping above ₹999."
      products={dressProducts}
      heroBg="bg-gradient-to-b from-secondary/10 to-background"
    />
  );
}
