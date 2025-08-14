import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Volume2, Palette, Zap, Store } from "lucide-react";

const ServicesSection = () => {
  const capabilities = [
    {
      icon: Smartphone,
      text: "Swift + SwiftUI app development"
    },
    {
      icon: Volume2,
      text: "Real-time audio (Core Audio, AUv3, MIDI, Bluetooth MIDI)"
    },
    {
      icon: Palette,
      text: "Product design & interaction design"
    },
    {
      icon: Zap,
      text: "App performance, accessibility, and offline-friendly UX"
    },
    {
      icon: Store,
      text: "App Store launch, beta/TestFlight, and updates"
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="mb-6 text-foreground">
            Available for select collaborations
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We prototype, polish, and ship native iOS experiences—from idea to App Store. 
            If you need a small senior team that moves fast and cares about the details, let's talk.
          </p>
        </div>
        
        <div className="space-y-4 mb-12 fade-in">
          {capabilities.map((capability, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:bg-gradient-subtle transition-colors duration-200"
            >
              <capability.icon className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="text-foreground">{capability.text}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center fade-in">
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          >
            Start a project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;