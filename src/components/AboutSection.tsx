import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const pillars = [
    "Native Swift + SwiftUI expertise",
    "Real-time audio / AUv3 / MIDI integration", 
    "App Store optimization & launch strategy",
    "Performance-first architecture",
    "ROI-focused development process"
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 opacity-0 animate-fadeInUp">
          <h2 className="mb-6 text-foreground">
            Turn your app idea into revenue
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Apps Are Fun specializes in building profitable iOS applications that scale. We combine cutting-edge SwiftUI development 
            with proven business strategies to deliver apps that not only delight users but drive measurable ROI for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards]">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-subtle border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
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
