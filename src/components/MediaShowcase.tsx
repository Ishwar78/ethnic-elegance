import { useState } from "react";

interface MediaItem {
  type: "gif" | "video";
  src: string;
  poster?: string;
  alt: string;
}

const mediaItems: MediaItem[] = [
  {
    type: "gif",
    src: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
    alt: "Fashion showcase"
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-in-front-of-a-white-background-42329-large.mp4",
    alt: "Model showcase video"
  },
  {
    type: "gif",
    src: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
    alt: "Style showcase"
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-dress-39875-large.mp4",
    alt: "Elegant fashion video"
  }
];

const MediaShowcase = () => {
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());

  const handleLoad = (index: number) => {
    setLoadedItems(prev => new Set([...prev, index]));
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {mediaItems.map((item, index) => (
            <div 
              key={index}
              className="relative aspect-video overflow-hidden rounded-2xl shadow-card group"
            >
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
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                  {item.type === "gif" ? "GIF" : "Video"}
                </span>
              </div>
            </div>
          ))}
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
