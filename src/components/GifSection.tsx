import { useState } from "react";

const GifSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Replace this URL with your actual GIF
  const gifUrl = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Experience the Elegance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our stunning collection come to life
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-card">
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <span className="text-muted-foreground">Loading...</span>
            </div>
          )}
          <img
            src={gifUrl}
            alt="Vasstra Fashion Collection Showcase"
            className={`w-full h-auto object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
          
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          
          {/* Optional CTA overlay */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors shadow-gold"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GifSection;
