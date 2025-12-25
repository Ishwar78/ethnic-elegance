import CollectionLayout from "@/components/CollectionLayout";
import { products, ethnicSubcategories } from "@/data/products";

export default function EthnicWear() {
  const ethnicProducts = products.filter(p => p.isEthnic);
  const filterCategories = ethnicSubcategories.map(s => s.name);

  return (
    <CollectionLayout
      title="Ethnic Wear Collection"
      subtitle="Timeless elegance meets contemporary design"
      metaTitle="Ethnic Wear | Vasstra - Premium Indian Fashion"
      metaDescription="Explore our exclusive ethnic wear collection. Shop kurta sets, anarkali suits, lehengas, and festive wear with free shipping above ₹999."
      products={ethnicProducts}
      filterCategories={filterCategories}
      heroBg="bg-gradient-to-b from-primary/10 to-background"
    />
  );
}
