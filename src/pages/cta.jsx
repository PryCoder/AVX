import { Button } from "../components/ui/button";
import { DecorIcon } from "../components/ui/decor-icon";
import { Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/contact");
  };

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col justify-between gap-y-6 border-y px-6 py-12 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <DecorIcon className="size-5" position="top-left" />
      <DecorIcon className="size-5" position="top-right" />
      <DecorIcon className="size-5" position="bottom-left" />
      <DecorIcon className="size-5" position="bottom-right" />

      <div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l" />
      <div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r" />

      <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed" />

      {/* Brand Section */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          The AVXONIA Standard
        </div>
      </div>

      <h2 className="text-center font-bold text-2xl md:text-4xl lg:text-5xl tracking-tight">
        Ready to Build a System That{" "}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Actually Grows
        </span>{" "}
        Your Business?
      </h2>

      <p className="text-balance text-center font-medium text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
        Limited slots available each month to ensure highest quality execution.
        Join industry leaders who trust AVXONIA for their digital transformation.
      </p>

      <div className="flex flex-col text-white sm:flex-row items-center justify-center gap-3 pt-4">
        <Button variant="outline" size="lg" className="gap-2 " onClick={handleNavigation}>
          <Calendar className="w-4 h-4" />
          Book a Strategy Call
        </Button>
        <Button size="lg" className="gap-2 group" onClick={handleNavigation}>
          Get Free Website Audit
          <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </Button>
      </div>

      {/* Trust Badge */}
      <div className="pt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by <span className="font-semibold text-foreground">50+</span> businesses worldwide
        </p>
      </div>
    </div>
  );
}