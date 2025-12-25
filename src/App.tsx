import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Install from "./pages/Install";
import Checkout from "./pages/Checkout";
import Bestsellers from "./pages/Bestsellers";
import NewArrivals from "./pages/NewArrivals";
import EthnicWear from "./pages/EthnicWear";
import WesternWear from "./pages/WesternWear";
import SummerCollection from "./pages/SummerCollection";
import WinterWear from "./pages/WinterWear";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import InstallPWA from "./components/InstallPWA";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/install" element={<Install />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/bestsellers" element={<Bestsellers />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/ethnic-wear" element={<EthnicWear />} />
              <Route path="/western-wear" element={<WesternWear />} />
              <Route path="/summer-collection" element={<SummerCollection />} />
              <Route path="/winter-wear" element={<WinterWear />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CartDrawer />
            <InstallPWA />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
