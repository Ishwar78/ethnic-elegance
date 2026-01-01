import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function Lehengas() {
  const lehengaProducts = products.filter(p => p.subcategory === "Lehengas");

  return (
    <CollectionLayout
      title="Lehengas"
      subtitle="Bridal and designer lehengas for special occasions"
      metaTitle="Lehengas | Vasstra - Bridal & Designer Collection"
      metaDescription="Shop exquisite lehenga collection. Bridal lehengas, party wear, and designer pieces. Free shipping above ₹999."
      products={lehengaProducts}
      heroBg="bg-gradient-to-b from-primary/5 to-background"
    />
  );
}
