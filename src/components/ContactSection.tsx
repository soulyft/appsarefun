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
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
          <h2 className="mb-6 text-foreground">
            Ready to build your next iOS success story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a startup with a groundbreaking idea or an established business looking to expand into mobile, 
            we'd love to discuss how we can help you succeed.
          </p>
          
          <a 
            href="mailto:dev@appsarefun.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-lg font-medium transition-colors"
          >
            <Mail className="h-5 w-5" />
            dev@appsarefun.com
          </a>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards]">
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
            <Label htmlFor="project">Tell us about your project</Label>
            <Textarea 
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              rows={4}
              className="bg-background border-border/50"
              placeholder="Describe your app idea, target audience, business goals, timeline, or budget..."
            />
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get free consultation
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            We'll provide a detailed project proposal within 48 hours. No spam, ever.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;