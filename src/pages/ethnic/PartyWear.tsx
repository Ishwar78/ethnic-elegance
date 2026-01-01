import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/data/products";

export default function PartyWear() {
  const partyProducts = products.filter(p => p.subcategory === "Party Wear");

  return (
    <CollectionLayout
      title="Party Wear"
      subtitle="Stunning outfits for parties and celebrations"
      metaTitle="Party Wear | Vasstra - Ethnic Party Collection"
      metaDescription="Shop glamorous party wear collection. Sarees, suits, and gowns for every celebration. Free shipping above ₹999."
      products={partyProducts}
      heroBg="bg-gradient-to-b from-primary/5 to-background"
    />
  );
}
