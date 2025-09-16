import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Volume2, Palette, Zap, Store } from "lucide-react";

const ServicesSection = () => {
  const capabilities = [
    {
      icon: Smartphone,
      text: "Full-stack iOS development (SwiftUI, Core Data, CloudKit)"
    },
    {
      icon: Volume2,
      text: "Advanced audio features (Core Audio, AUv3, MIDI, real-time processing)"
    },
    {
      icon: Palette,
      text: "User experience design & conversion optimization"
    },
    {
      icon: Zap,
      text: "Performance optimization & technical architecture"
    },
    {
      icon: Store,
      text: "App Store launch strategy, ASO, and revenue optimization"
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
          <h2 className="mb-6 text-foreground">
            Transform your business with a custom iOS app
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Partner with a proven team that delivers results. We take your vision from concept to profitable App Store presence, 
            handling everything from development and design to launch strategy and ongoing optimization.
          </p>
        </div>
        
        <div className="space-y-4 mb-12 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards]">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card transition-all duration-300 hover:bg-gradient-subtle hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
            >
              <capability.icon className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="text-foreground">{capability.text}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center opacity-0 animate-[fadeInUp_0.7s_ease-out_0.3s_forwards]">
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
