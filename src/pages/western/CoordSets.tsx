import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function CoordSets() {
  const coordProducts = products.filter(p => p.subcategory === "Co-ord Sets");

  return (
    <CollectionLayout
      title="Co-ord Sets"
      subtitle="Matching sets for a coordinated look"
      metaTitle="Co-ord Sets | Vasstra - Western Fashion"
      metaDescription="Shop stylish co-ord sets collection. Matching top and bottom sets for effortless style. Free shipping above ₹999."
      products={coordProducts}
      heroBg="bg-gradient-to-b from-secondary/10 to-background"
    />
  );
}
