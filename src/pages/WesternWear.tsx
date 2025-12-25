import CollectionLayout from "@/components/CollectionLayout";
import { products, westernSubcategories } from "@/data/products";

export default function WesternWear() {
  const westernProducts = products.filter(p => p.isWestern);
  const filterCategories = westernSubcategories.map(s => s.name);

  return (
    <CollectionLayout
      title="Modern Western Styles"
      subtitle="Contemporary fashion for the modern woman"
      metaTitle="Western Wear | Vasstra - Modern Fashion"
      metaDescription="Shop our western wear collection. Trendy tops, dresses, co-ord sets, and casual wear. Free shipping above ₹999."
      products={westernProducts}
      filterCategories={filterCategories}
      heroBg="bg-gradient-to-b from-secondary/10 to-background"
    />
  );
}
