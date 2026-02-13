import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from '../assets/avx.png';

import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Mobile Accordion Item with improved UX
  const MobileAccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border-b border-border/60">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-4 px-4 sm:px-5 text-base font-medium hover:bg-accent/30 transition-colors"
          aria-expanded={isOpen}
        >
          <span className="text-foreground font-sans">{title}</span>
          <ChevronDown 
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`} 
          />
        </button>
        {isOpen && (
          <div className="px-4 sm:px-5 pb-4 pt-2 bg-accent/10 animate-in slide-in-from-top duration-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Services dropdown content
  const ServicesDropdown = () => (
    <DropdownMenu 
      onOpenChange={(open) => setOpenDropdown(open ? "services" : null)}
      open={openDropdown === "services"}
    >
      <DropdownMenuTrigger asChild>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-2 px-1 lg:px-6 group font-sans">
          Services
          <ChevronDown 
            className={`h-3.5 w-3.5 lg:h-5 lg:w-5 transition-transform duration-200 ${
              openDropdown === "services" ? "rotate-180" : "group-hover:rotate-180"
            }`} 
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-screen max-w-[90vw] sm:max-w-[550px] p-4 sm:p-5 mx-2 sm:mx-4 z-[100]" 
        align="center" 
        sideOffset={8}
        onMouseEnter={() => setOpenDropdown("services")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-1.5 font-serif">
              Digital Solutions
            </h3>
            <ul className="space-y-1 font-sans">
              {["Web Development", "Mobile Applications", "UI/UX Design", "Cloud Solutions"].map((item) => (
                <DropdownMenuItem key={item} className="cursor-pointer px-0 py-1 hover:bg-transparent focus:bg-transparent">
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </span>
                </DropdownMenuItem>
              ))}
            </ul>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-1.5 font-serif">
              Consulting
            </h3>
            <ul className="space-y-1 font-sans">
              {["Digital Strategy", "Technology Advisory", "Process Optimization", "Innovation Workshops"].map((item) => (
                <DropdownMenuItem key={item} className="cursor-pointer px-0 py-1 hover:bg-transparent focus:bg-transparent">
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </span>
                </DropdownMenuItem>
              ))}
            </ul>
          </div>
        </div>
        <DropdownMenuSeparator className="my-3 sm:my-4" />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="default" size="sm" className="flex-1 text-white font-sans text-xs sm:text-sm h-8 sm:h-9">
            Discover our work
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-foreground font-sans text-xs sm:text-sm h-8 sm:h-9">
            Make an appointment
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Resources dropdown content
  const ResourcesDropdown = () => (
    <DropdownMenu 
      onOpenChange={(open) => setOpenDropdown(open ? "resources" : null)}
      open={openDropdown === "resources"}
    >
      <DropdownMenuTrigger asChild>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-2 px-1 lg:px-2 group font-sans">
          Resources
          <ChevronDown 
            className={`h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 ${
              openDropdown === "resources" ? "rotate-180" : "group-hover:rotate-180"
            }`} 
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-screen max-w-[90vw] sm:max-w-[650px] p-4 sm:p-5 mx-2 sm:mx-4 z-[100]" 
        align="center" 
        sideOffset={8}
        onMouseEnter={() => setOpenDropdown("resources")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-1.5 font-serif">
              Learning
            </h3>
            <ul className="space-y-1 font-sans">
              {["Blog", "Case Studies", "Whitepapers", "Webinars"].map((item) => (
                <DropdownMenuItem key={item} className="cursor-pointer px-0 py-1 hover:bg-transparent focus:bg-transparent">
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </span>
                </DropdownMenuItem>
              ))}
            </ul>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-1.5 font-serif">
              Tools
            </h3>
            <ul className="space-y-1 font-sans">
              {["ROI Calculator", "Tech Stack Guide", "Project Planner", "Assessment Tool"].map((item) => (
                <DropdownMenuItem key={item} className="cursor-pointer px-0 py-1 hover:bg-transparent focus:bg-transparent">
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </span>
                </DropdownMenuItem>
              ))}
            </ul>
          </div>
          <div className="space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-1.5 font-serif">
              Support
            </h3>
            <ul className="space-y-1 font-sans">
              {["Documentation", "FAQs", "Community", "Help Center"].map((item) => (
                <DropdownMenuItem key={item} className="cursor-pointer px-0 py-1 hover:bg-transparent focus:bg-transparent">
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </span>
                </DropdownMenuItem>
              ))}
            </ul>
          </div>
        </div>
        <DropdownMenuSeparator className="my-3 sm:my-4" />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="default" size="sm" className="flex-1 text-white font-sans text-xs sm:text-sm h-8 sm:h-9">
            Discover our work
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-foreground font-sans text-xs sm:text-sm h-8 sm:h-9">
            Make an appointment
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Who We Are dropdown content - UPDATED with Team, About Us, Join Us
  const WhoWeAreDropdown = () => (
    <DropdownMenu 
      onOpenChange={(open) => setOpenDropdown(open ? "whoweare" : null)}
      open={openDropdown === "whoweare"}
    >
      <DropdownMenuTrigger asChild>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-2 px-1 lg:px-2 group font-sans">
          Who we are
          <ChevronDown 
            className={`h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 ${
              openDropdown === "whoweare" ? "rotate-180" : "group-hover:rotate-180"
            }`} 
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-screen max-w-[90vw] sm:max-w-[280px] p-3 sm:p-4 mx-2 sm:mx-4 z-[100]" 
        align="center" 
        sideOffset={8}
        onMouseEnter={() => setOpenDropdown("whoweare")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="space-y-1">
          {/* Team Link */}
          <DropdownMenuItem className="cursor-pointer px-3 py-2.5 hover:bg-accent/50 focus:bg-accent/50 rounded-lg group">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">
                Team
              </span>
              <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                Meet our experts and leadership
              </span>
            </div>
          </DropdownMenuItem>
          
          {/* About Us Link */}
          <DropdownMenuItem className="cursor-pointer px-3 py-2.5 hover:bg-accent/50 focus:bg-accent/50 rounded-lg group">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">
                About Us
              </span>
              <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                Our story, mission & vision
              </span>
            </div>
          </DropdownMenuItem>
          
          {/* Join Us Link */}
          <DropdownMenuItem className="cursor-pointer px-3 py-2.5 hover:bg-accent/50 focus:bg-accent/50 rounded-lg group">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">
                Join Us
              </span>
              <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                Careers & opportunities
              </span>
            </div>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="my-2 sm:my-3" />
        
        <div className="px-2 py-1">
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 italic font-sans">
            Be part of our journey
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-[100] transition-all duration-300
        ${scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm py-1 sm:py-2" 
          : "bg-background/90 backdrop-blur-sm border-b border-border/40"
        }
      `}
    >
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <img
            src={logo} 
            alt="Hero"
            className="h-25 w-auto object-contain" 
          />
        </div>

        {/* Desktop Navigation - Hidden on Tablet/Mobile */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-1 xl:gap-3">
              <NavigationMenuItem>
                <ServicesDropdown />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ResourcesDropdown />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <WhoWeAreDropdown />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Action Buttons - Hidden on Tablet/Mobile */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <Button 
            variant="default" 
            size="sm" 
            className="sfpro-font font-medium bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all px-3 xl:px-5 h-8 xl:h-9 font-sans text-xs xl:text-sm"
          >
            Discover
          </Button>
          <Button 
            variant="default"
            size="sm" 
            className="sfpro-font font-medium bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all px-3 xl:px-5 h-8 xl:h-9 font-sans text-xs xl:text-sm"
          >
            Appointment
          </Button>
        </div>

        {/* Tablet & Mobile Menu Button - Visible on Tablet and Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Tablet Quick Action Buttons - Visible only on Tablet (768px - 1024px) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="sfpro-font font-medium bg-primary hover:bg-primary/90 text-white shadow-sm px-3 h-8 font-sans text-xs"
            >
              Discover
            </Button>
            <Button 
              variant="default"
              size="sm" 
              className="sfpro-font font-medium bg-primary hover:bg-primary/90 text-white shadow-sm px-3 h-8 font-sans text-xs"
            >
              Appointment
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 sm:h-9 sm:w-9 z-[101]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5 transition-transform rotate-90 duration-300" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile & Tablet Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-full sm:w-[450px] md:w-[500px] p-0 bg-background border-l border-border/40 z-[200] overflow-y-auto">
          <SheetHeader className="p-4 sm:p-5 md:p-6 border-b border-border/40 bg-gradient-to-r from-primary/5 to-transparent sticky top-0 bg-background/95 backdrop-blur-sm z-[201]">
            <SheetTitle className="text-left text-xl sm:text-2xl md:text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent font-bold font-serif">
              anxvvion
            </SheetTitle>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 font-sans">Innovate. Transform. Succeed.</p>
            <SheetClose className="absolute right-4 top-4 sm:right-5 sm:top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>
          
          <div className="flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Mobile Navigation Links */}
            <div className="flex-1 py-1 sm:py-2">
              <MobileAccordionItem title="Services">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5 sm:mb-2 font-serif">
                      Digital Solutions
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1 font-sans">
                      {["Web Development", "Mobile Applications", "UI/UX Design", "Cloud Solutions"].map((item) => (
                        <SheetClose asChild key={item}>
                          <li className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer py-1.5 sm:py-2 px-2 sm:px-2 hover:bg-accent/50 rounded-md">
                            {item}
                          </li>
                        </SheetClose>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5 sm:mb-2 font-serif">
                      Consulting
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1 font-sans">
                      {["Digital Strategy", "Technology Advisory", "Process Optimization", "Innovation Workshops"].map((item) => (
                        <SheetClose asChild key={item}>
                          <li className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer py-1.5 sm:py-2 px-2 sm:px-2 hover:bg-accent/50 rounded-md">
                            {item}
                          </li>
                        </SheetClose>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-3">
                    <SheetClose asChild>
                      <Button size="sm" variant="default" className="flex-1 text-xs h-8 sm:h-9 text-white font-sans">
                        Discover work
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8 sm:h-9 text-foreground font-sans">
                        Appointment
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </MobileAccordionItem>

              <MobileAccordionItem title="Resources">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5 sm:mb-2 font-serif">
                      Learning
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1 font-sans">
                      {["Blog", "Case Studies", "Whitepapers", "Webinars"].map((item) => (
                        <SheetClose asChild key={item}>
                          <li className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer py-1.5 sm:py-2 px-2 sm:px-2 hover:bg-accent/50 rounded-md">
                            {item}
                          </li>
                        </SheetClose>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5 sm:mb-2 font-serif">
                      Tools
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1 font-sans">
                      {["ROI Calculator", "Tech Stack Guide", "Project Planner", "Assessment Tool"].map((item) => (
                        <SheetClose asChild key={item}>
                          <li className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer py-1.5 sm:py-2 px-2 sm:px-2 hover:bg-accent/50 rounded-md">
                            {item}
                          </li>
                        </SheetClose>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5 sm:mb-2 font-serif">
                      Support
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1 font-sans">
                      {["Documentation", "FAQs", "Community", "Help Center"].map((item) => (
                        <SheetClose asChild key={item}>
                          <li className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer py-1.5 sm:py-2 px-2 sm:px-2 hover:bg-accent/50 rounded-md">
                            {item}
                          </li>
                        </SheetClose>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-3">
                    <SheetClose asChild>
                      <Button size="sm" variant="default" className="flex-1 text-xs h-8 sm:h-9 text-white font-sans">
                        Discover work
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8 sm:h-9 text-foreground font-sans">
                        Appointment
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </MobileAccordionItem>

              <MobileAccordionItem title="Who we are">
                <div className="space-y-2">
                  {/* Team Link */}
                  <SheetClose asChild>
                    <div className="cursor-pointer px-3 py-3 hover:bg-accent/50 rounded-lg transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">
                          Team
                        </span>
                        <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground">
                          Meet our experts and leadership
                        </span>
                      </div>
                    </div>
                  </SheetClose>
                  
                  {/* About Us Link */}
                  <SheetClose asChild>
                    <div className="cursor-pointer px-3 py-3 hover:bg-accent/50 rounded-lg transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">
                          About Us
                        </span>
                        <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground">
                          Our story, mission & vision
                        </span>
                      </div>
                    </div>
                  </SheetClose>
                  
                  {/* Join Us Link */}
                  <SheetClose asChild>
                    <div className="cursor-pointer px-3 py-3 hover:bg-accent/50 rounded-lg transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">
                          Join Us
                        </span>
                        <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground">
                          Careers & opportunities
                        </span>
                      </div>
                    </div>
                  </SheetClose>
                  
                  <div className="pt-3 mt-1 border-t border-border/40">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <SheetClose asChild>
                        <Button size="sm" variant="default" className="flex-1 text-xs h-8 sm:h-9 text-white font-sans">
                          Discover work
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button size="sm" variant="outline" className="flex-1 text-xs h-8 sm:h-9 text-foreground font-sans">
                          Appointment
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </MobileAccordionItem>
            </div>

            {/* Mobile Action Buttons - Sticky at bottom */}
            <div className="border-t border-border/40 p-4 sm:p-5 space-y-2 sm:space-y-3 bg-muted/30 mt-auto sticky bottom-0 backdrop-blur-sm">
              <SheetClose asChild>
                <Button 
                  className="w-full shadow-sm h-10 sm:h-11 text-white font-sans text-xs sm:text-sm" 
                  size="lg"
                  variant="default"
                >
                  Discover our work
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button 
                  className="w-full h-10 sm:h-11 text-foreground font-sans text-xs sm:text-sm" 
                  variant="outline" 
                  size="lg"
                >
                  Make an appointment
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;