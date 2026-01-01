import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MediaItem {
  type: "gif" | "video";
  src: string;
  title: string;
  alt: string;
}

const mediaItems: MediaItem[] = [
  {
    type: "gif",
    src: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
    title: "Fashion Forward",
    alt: "Fashion showcase"
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-in-front-of-a-white-background-42329-large.mp4",
    title: "Elegance in Motion",
    alt: "Model showcase video"
  },
  {
    type: "gif",
    src: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
    title: "Style Statement",
    alt: "Style showcase"
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-dress-39875-large.mp4",
    title: "Premium Collection",
    alt: "Elegant fashion video"
  }
];

const MediaShowcase = () => {
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleLoad = (index: number) => {
    setLoadedItems(prev => new Set([...prev, index]));
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-16 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">
            Live Showcase
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Experience the Elegance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Watch our stunning collection come to life
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {mediaItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] pl-4"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl shadow-card group">
                    {!loadedItems.has(index) && (
                      <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center z-10">
                        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    
                    {item.type === "gif" ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
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
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                          loadedItems.has(index) ? "opacity-100" : "opacity-0"
                        }`}
                        onLoadedData={() => handleLoad(index)}
                      />
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                        {item.type === "gif" ? "GIF" : "Video"}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all shadow-gold hover:shadow-lg hover:scale-105"
          >
            Explore Collection
          </a>
        </div>
      </div>
    </section>
  );
};

export default MediaShowcase;
