import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center text-white relative z-10 fade-in">
        <h1 className="mb-6 max-w-4xl mx-auto">
          We build delightful native iOS apps.
        </h1>
        <p className="text-xl lg:text-2xl mb-12 text-white/90 max-w-2xl mx-auto font-light">
          Designed with SwiftUI. Crafted for people.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="secondary"
            size="lg" 
            onClick={() => scrollToSection('featured-apps')}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm text-lg px-8 py-3"
          >
            See the apps
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-3"
          >
            Work with us
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;