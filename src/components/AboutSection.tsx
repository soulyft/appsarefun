import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const pillars = [
    "Native Swift + SwiftUI",
    "Real-time audio / AUv3 / MIDI",
    "Accessibility & performance first",
    "App Store launch & iteration",
    "Small team, fast feedback"
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 fade-in">
          <h2 className="mb-6 text-foreground">
            Native iOS experiences that feel obvious
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Apps Are Fun designs and builds thoughtful iOS experiences that feel obvious from the first tap. 
            We specialize in SwiftUI and real-time audio, shipping high-quality apps with smooth performance, 
            accessibility, and a clean, modern aesthetic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-subtle border border-border/50"
            >
              <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
              <span className="text-foreground font-medium">{pillar}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;