import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function AnarkaliSuits() {
  const anarkaliProducts = products.filter(p => p.subcategory === "Anarkali Suits");

  return (
    <CollectionLayout
      title="Anarkali Suits"
      subtitle="Graceful anarkali suits for a royal look"
      metaTitle="Anarkali Suits | Vasstra - Ethnic Fashion"
      metaDescription="Shop stunning anarkali suits collection. Flowy silhouettes with intricate embroidery. Free shipping above ₹999."
      products={anarkaliProducts}
      heroBg="bg-gradient-to-b from-primary/5 to-background"
    />
  );
}
