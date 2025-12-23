import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImage1 from "@/assets/hero-model-1.jpg";
import heroImage2 from "@/assets/hero-model-2.jpg";
import heroImage3 from "@/assets/hero-model-3.jpg";

const slides = [
  {
    image: heroImage1,
    title: "New Arrivals",
    subtitle: "Festive Suit Collection",
    description: "Discover exquisite handcrafted ethnic wear for every occasion",
    cta: "Shop Now",
    ctaLink: "/shop?category=new-arrivals",
  },
  {
    image: heroImage2,
    title: "Exclusive",
    subtitle: "Royal Lehenga Collection",
    description: "Timeless elegance meets contemporary design",
    cta: "Explore Collection",
    ctaLink: "/shop?category=lehengas",
  },
  {
    image: heroImage3,
    title: "Bridal Edit",
    subtitle: "Wedding Season Special",
    description: "Make your special day unforgettable",
    cta: "View Collection",
    ctaLink: "/shop?category=bridal",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-gradient-hero">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-out",
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          )}
        >
          {/* Diagonal Image Container */}
          <div className="absolute right-0 top-0 h-full w-full md:w-[65%] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform origin-left md:skew-x-[-6deg] md:translate-x-12 scale-110"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent md:skew-x-[-6deg] md:translate-x-12" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4">
        <div className="h-full flex items-center">
          <div className="max-w-xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={cn(
                  "transition-all duration-700",
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute pointer-events-none"
                )}
              >
                <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6 animate-fade-in">
                  {slide.title}
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
                  {slide.subtitle}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="xl">
                    {slide.cta}
                  </Button>
                  <Button variant="heroOutline" size="xl">
                    View All
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-3">
        <button
          onClick={prevSlide}
          className="h-12 w-12 rounded-full border-2 border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="h-12 w-12 rounded-full border-2 border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-gold"
                : "w-2 bg-gold/30 hover:bg-gold/50"
            )}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
    </section>
  );
}
