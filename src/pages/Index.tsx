import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DropletBanner from "@/components/DropletBanner";
import FeaturedAppsSection from "@/components/FeaturedAppsSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DropletBanner />
      <AboutSection />
      <FeaturedAppsSection />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
