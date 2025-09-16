import { Ear, Zap, Smartphone, Rocket, RotateCcw } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Ear,
      title: "Listen & define",
      description: "Goals, audience, success metrics."
    },
    {
      icon: Zap,
      title: "Prototype fast", 
      description: "Clickable flows and proof-of-concepts."
    },
    {
      icon: Smartphone,
      title: "Build native",
      description: "SwiftUI components, real-time performance."
    },
    {
      icon: Rocket,
      title: "Polish & ship",
      description: "Accessibility, QA, App Store assets."
    },
    {
      icon: RotateCcw,
      title: "Iterate",
      description: "Analytics-informed updates."
    }
  ];

  return (
    <section className="section-padding gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 opacity-0 animate-fadeInUp">
          <h2 className="mb-6 text-foreground">
            Our Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven approach to shipping delightful native iOS experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] relative"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>

              {/* Arrow connector for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-muted-foreground/30">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
