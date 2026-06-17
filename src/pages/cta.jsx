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
     <Button
  size="lg"
  className="gap-2 !bg-white !border-2 !border-white !shadow-none"
  onClick={handleNavigation}
>
  <Calendar className="w-4 h-4 text-gray-400" />
  <span className="bg-gradient-to-b from-white to-gray-900 bg-clip-text text-transparent">
    Book a Strategy Call
  </span>
</Button>

        <Button
  size="lg"
  onClick={handleNavigation}
  className="group gap-2 rounded-xl bg-white border border-zinc-200 text-zinc-900 px-6 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-zinc-300 hover:-translate-y-0.5 transition-all duration-300"
>
  <span className="font-semibold bg-gradient-to-b from-zinc-100 to-zinc-600 bg-clip-text text-transparent">
    Get Free Website Audit
  </span>

  <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
</Button>
      </div>

      {/* Trust Badge */}
      
    </div>
  );
}