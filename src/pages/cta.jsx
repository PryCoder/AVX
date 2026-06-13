import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Calendar, Shield, CheckCircle2, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import SectionWrapper from "../components/ui/section-wrapper";

const CTASection = () => {
  return (
    <SectionWrapper>
      <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Brand Card - Clean shadcn style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <Card className="p-8 lg:p-10 shadow-lg border-border/50">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <span className="text-primary-foreground font-bold text-3xl lg:text-4xl">
                    AV
                  </span>
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-3">
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    The AVXONIA Standard
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                    Built to help businesses move from basic online presence to structured 
                    digital systems that drive predictable, long-term growth.
                  </p>
                
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main CTA - Clean shadcn style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border-primary/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
              
              <div className="relative p-8 lg:p-12 text-center space-y-8">
                <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm mx-auto w-fit">
                  <Sparkles className="w-3 h-3" />
                  Limited Availability
                </Badge>
                
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    Ready to Build a System That{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      Actually Grows
                    </span>{" "}
                    Your Business?
                  </h2>
                  
                  <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                    Limited slots available each month to ensure highest quality execution.
                    Join industry leaders who trust AVXONIA.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" className="group gap-2">
                    <Link to="/contact">
                      <Calendar className="w-4 h-4" />
                      Book a Strategy Call
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="group gap-2">
                    <Link to="/contact">
                      <Sparkles className="w-4 h-4" />
                      Get Free Website Audit
                    </Link>
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                 
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default CTASection;