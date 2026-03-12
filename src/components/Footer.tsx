import { ExternalLink, Globe, Instagram, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "App Store", icon: ExternalLink, href: "https://apps.apple.com/us/developer/apps-are-fun-llc/id1659934806" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/soulyftmusic/" },
    { name: "Soulyft Audio", icon: Globe, href: "https://soulyftaudio.com/" },
    { name: "Droplet", icon: Sparkles, href: "https://appsarefun.com/droplet" }
  ];

  return (
    <footer className="section-padding border-t border-border/50 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © {currentYear} Apps Are Fun
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Built with SwiftUI-inspired design principles.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              link.href ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transition-transform"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ) : (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transition-transform"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
