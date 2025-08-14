import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import chimeIcon from "@/assets/chime-icon.png";
import gradientSynthIcon from "@/assets/gradient-synth-icon.png";
import winterZenIcon from "@/assets/winter-zen-icon.png";
import promotePdxIcon from "@/assets/promote-pdx-icon.png";

const FeaturedAppsSection = () => {
  const apps = [
    {
      id: "chime",
      name: "Chime",
      icon: chimeIcon,
      shortDescription: "A touch-first instrument for sonic exploration.",
      longDescription: "Built in collaboration with Sketch Audio, Chime turns gestures into expressive sound. Minimal UI, rich tone, zero friction.",
      available: true,
      appStoreUrl: "#"
    },
    {
      id: "gradient-synth", 
      name: "Gradient Synth",
      icon: gradientSynthIcon,
      shortDescription: "Turn colors into sounds.",
      longDescription: "Swipe across a color gradient to sculpt evolving soundscapes. Beginner-friendly, deep for pros—MIDI and performance-ready.",
      available: true,
      appStoreUrl: "#"
    },
    {
      id: "winter-zen",
      name: "Winter Zen", 
      icon: winterZenIcon,
      shortDescription: "A calming snow globe in your pocket.",
      longDescription: "An interactive winter scene for focus and relaxation. Gentle animations, serene audio, pure unwind.",
      available: true,
      appStoreUrl: "#"
    },
    {
      id: "promote-pdx",
      name: "Promote PDX",
      icon: promotePdxIcon,
      shortDescription: "Discover Portland's live music scene.",
      longDescription: "A community-minded guide to artists, venues, and shows—built to support local music.",
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