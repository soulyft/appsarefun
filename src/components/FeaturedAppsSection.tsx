import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const FeaturedAppsSection = () => {
  const apps = [
    {
      id: "chime",
      name: "Chime",
      icon: "https://placehold.co/128x128?text=Chime",
      shortDescription: "Turn noise into music with touch.",
      longDescription: "Built for the curious, Chime transforms raw noise into rich, playable textures the moment your fingers hit the screen. No text labels, just discovery. Called 'so satisfying' by users.",
      available: true,
      appStoreUrl: "https://apps.apple.com/us/app/chime-turn-noise-into-music/id6692633791"
    },
    {
      id: "gradient-synth",
      name: "Gradient Synth",
      icon: "https://placehold.co/128x128?text=Gradient%20Synth",
      shortDescription: "Make music from color.",
      longDescription: "Tap, slide, and hear gradients morph into pads, leads, and drones. Designed with beginners in mind, making music exploration fun and intuitive for everyone.",
      available: true,
      appStoreUrl: "https://apps.apple.com/us/app/gradient-synth/id6477543878"
    },
    {
      id: "winter-zen",
      name: "Winter Zen",
      icon: "https://placehold.co/128x128?text=Winter%20Zen",
      shortDescription: "A musical snow globe for relaxation.",
      longDescription: "Step into a serene winter wonderland that transforms your device into an interactive snow globe. Each tap creates cascading snowflakes and ambient soundscapes.",
      available: true,
      appStoreUrl: "https://apps.apple.com/us/app/winter-zen-snow-globe-music/id1659934804"
    },
    {
      id: "promote-pdx",
      name: "Promote PDX",
      icon: "https://placehold.co/128x128?text=Promote%20PDX",
      shortDescription: "Discover Portland's live music scene.",
      longDescription: "A community-minded guide to artists, venues, and shows—built to support local music discovery and connect fans with Portland's vibrant scene.",
      available: false,
      comingSoon: true
    }
  ];

  return (
    <section id="featured-apps" className="section-padding gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 opacity-0 animate-fadeInUp">
          <h2 className="mb-6 text-foreground">
            Featured Apps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Native iOS experiences built with SwiftUI, designed for delightful interactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app, index) => (
            <div 
              key={app.id} 
              className="app-card group opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={app.icon} 
                  alt={`${app.name} app icon`}
                  className="w-16 h-16 rounded-2xl shadow-md flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {app.name}
                    {app.comingSoon && (
                      <span className="ml-2 text-sm text-muted-foreground font-normal">
                        — Coming Soon
                      </span>
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-1">
                    {app.shortDescription}
                  </p>
                </div>
              </div>
              
              <p className="text-foreground/80 mb-6 leading-relaxed">
                {app.longDescription}
              </p>
              
              {app.available ? (
                <Button 
                  variant="default" 
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
                    Learn more
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  disabled
                >
                  Get updates →
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAppsSection;
