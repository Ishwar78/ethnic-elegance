import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface MediaItem {
  type: "gif" | "video";
  src: string;
  category: string;
  title: string;
  price: number;
  originalPrice: number;
  badge?: "NEW" | "BESTSELLER";
  alt: string;
}

const mediaItems: MediaItem[] = [
  {
    type: "gif",
    src: "https://media.tenor.com/7gHmDpVg5O4AAAAd/chaniya-choli-printed-lehenga.gif",
    category: "LEHENGA",
    title: "Printed Chaniya Choli",
    price: 4999,
    originalPrice: 6999,
    badge: "NEW",
    alt: "Chaniya Choli showcase"
  },
  {
    type: "gif",
    src: "https://media.tenor.com/kQJfNt6lH-wAAAAd/chaniya-choli-silk-lehenga.gif",
    category: "LEHENGA",
    title: "Silk Haldi Yellow Lehenga",
    price: 5499,
    originalPrice: 7999,
    badge: "BESTSELLER",
    alt: "Yellow Silk Lehenga"
  },
  {
    type: "gif",
    src: "https://media.tenor.com/9cJNHWYpDkkAAAAd/chaniya-choli-silk-lehenga-choli.gif",
    category: "ETHNIC WEAR",
    title: "Embroidered Lehenga Set",
    price: 12999,
    originalPrice: 18999,
    badge: "NEW",
    alt: "Embroidered Lehenga"
  },
  {
    type: "gif",
    src: "https://media.tenor.com/RzVJrEfDNs4AAAAd/indian-girl-saree.gif",
    category: "SAREE",
    title: "Elegant Silk Saree",
    price: 8999,
    originalPrice: 11999,
    alt: "Saree showcase"
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-in-front-of-a-white-background-42329-large.mp4",
    category: "WESTERN",
    title: "Designer Gown Collection",
    price: 6999,
    originalPrice: 9999,
    badge: "BESTSELLER",
    alt: "Designer gown video"
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-dress-39875-large.mp4",
    category: "FESTIVE",
    title: "Festive Special Dress",
    price: 7499,
    originalPrice: 10999,
    alt: "Festive dress video"
  }
];

const MediaShowcase = () => {
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false,
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleLoad = (index: number) => {
    setLoadedItems(prev => new Set([...prev, index]));
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const getDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-16 bg-[#f8f5f0] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">
            Live Collection
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Trending Ethnic Wear
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experience our stunning collection in motion
          </p>
        </div>
        
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {mediaItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-4"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="bg-[#faf6f1] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                    {/* Media Container */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {!loadedItems.has(index) && (
                        <div className="absolute inset-0 bg-[#f0ebe4] animate-pulse flex items-center justify-center z-10">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      
                      {item.type === "gif" ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                            loadedItems.has(index) ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => handleLoad(index)}
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                            loadedItems.has(index) ? "opacity-100" : "opacity-0"
                          }`}
                          onLoadedData={() => handleLoad(index)}
                        />
                      )}
                      
                      {/* Discount Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-2 py-1 bg-[#d64545] text-white text-xs font-bold rounded">
                          -{getDiscount(item.originalPrice, item.price)}%
                        </span>
                      </div>

                      {/* NEW/BESTSELLER Badge */}
                      {item.badge && (
                        <div className="absolute top-10 left-3 z-20">
                          <span className={`px-2 py-1 text-xs font-bold rounded ${
                            item.badge === "NEW" 
                              ? "bg-[#4a6741] text-white" 
                              : "bg-[#c9a227] text-foreground"
                          }`}>
                            {item.badge}
                          </span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className={`absolute top-3 right-3 z-20 flex flex-col gap-2 transition-all duration-300 ${
                        hoveredIndex === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      }`}>
                        <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <span className="text-xs text-muted-foreground tracking-wider uppercase">
                        {item.category}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground mt-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-display text-xl font-bold text-foreground">
                          ₹{item.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to="/ethnic-wear"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all shadow-gold hover:shadow-lg hover:scale-105"
          >
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MediaShowcase;
