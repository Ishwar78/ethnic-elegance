import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function FestiveCollection() {
  const festiveProducts = products.filter(p => p.subcategory === "Festive Collection");

  return (
    <CollectionLayout
      title="Festive Collection"
      subtitle="Traditional wear for festivals and celebrations"
      metaTitle="Festive Collection | Vasstra - Festival Wear"
      metaDescription="Shop festive wear collection. Diwali, Eid, and wedding outfits. Premium ethnic designs. Free shipping above ₹999."
      products={festiveProducts}
      heroBg="bg-gradient-to-b from-gold/10 to-background"
    />
  );
}
