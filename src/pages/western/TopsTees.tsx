import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function TopsTees() {
  const topsProducts = products.filter(p => p.subcategory === "Tops & Tees");

  return (
    <CollectionLayout
      title="Tops & Tees"
      subtitle="Trendy tops and tees for everyday style"
      metaTitle="Tops & Tees | Vasstra - Western Fashion"
      metaDescription="Shop trendy tops and tees collection. Casual, formal, and party wear tops. Free shipping above ₹999."
      products={topsProducts}
      heroBg="bg-gradient-to-b from-secondary/10 to-background"
    />
  );
}
