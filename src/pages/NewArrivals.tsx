import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function NewArrivals() {
  const newArrivals = products.filter(p => p.isNew);

  return (
    <CollectionLayout
      title="New Arrivals"
      subtitle="Fresh Styles Just Dropped"
      metaTitle="New Arrivals | Vasstra - Latest Ethnic Fashion"
      metaDescription="Discover our latest ethnic wear collection. Fresh designs, premium fabrics, and contemporary styles. Shop new arrivals with free shipping."
      products={newArrivals}
      heroBg="bg-gradient-to-b from-gold/5 to-background"
    />
  );
}
