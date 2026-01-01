import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function CasualWear() {
  const casualProducts = products.filter(p => p.subcategory === "Casual Wear");

  return (
    <CollectionLayout
      title="Casual Wear"
      subtitle="Comfortable and stylish everyday wear"
      metaTitle="Casual Wear | Vasstra - Western Fashion"
      metaDescription="Shop comfortable casual wear collection. Everyday fashion that's stylish and comfortable. Free shipping above ₹999."
      products={casualProducts}
      heroBg="bg-gradient-to-b from-secondary/10 to-background"
    />
  );
}
