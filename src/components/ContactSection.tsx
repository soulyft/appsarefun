import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for reaching out!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', project: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12 animate-in slide-in-from-bottom-4 duration-700">
          <h2 className="mb-6 text-foreground">
            Let's make something fun
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have an idea, or want to collaborate? We'd love to hear from you.
          </p>
          
          <a 
            href="mailto:hello@appsarefun.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-lg font-medium transition-colors"
          >
            <Mail className="h-5 w-5" />
            hello@appsarefun.com
          </a>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-6 duration-700 delay-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background border-border/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project">What are you building?</Label>
            <Textarea 
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              rows={4}
              className="bg-background border-border/50"
              placeholder="Tell us about your project, timeline, or any questions you have..."
            />
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Send message
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            We'll only use your info to reply. No spam.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;