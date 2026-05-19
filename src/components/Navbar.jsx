"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/avx.png';
import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";
import { RainbowButton } from "./ui/rainbow-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
// Import from your local navbar-menu components
import { Menu, MenuItem, ProductItem, HoveredLink } from "../components/ui/navbar-menu";
import { cn } from "../lib/utils";

export function NavbarDemo({ topOffset = 0 }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeAceternityMenu, setActiveAceternityMenu] = useState(null); // Removed TypeScript syntax

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom Navbar Logo component
  const CustomNavbarLogo = () => (
    <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
      <img src={logo} alt="AVXONIA INNOVATIONS" className="h-12 sm:h-14 w-auto object-contain" />
    </Link>
  );

  // Custom dropdown items for Services
  const serviceItems = [
    { label: "Web Development", value: "Website Development" },
    { label: "UI/UX Design", value: "UI/UX Design" },
    { label: "AI Automation", value: "Ai Automation" },
  ];

  const resourceItems = [
    { label: "FAQs", path: "/faq" },
  ];

  const handleNavigation = (path, service = null) => {
    if (service) {
      navigate(`${path}?service=${encodeURIComponent(service)}`);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleServiceClick = (service) => handleNavigation('/projects', service);

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const handleDropdownMouseEnter = (dropdownName) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  // Aceternity Services Dropdown using their Menu component
  const AceternityServicesDropdown = () => (
    <MenuItem setActive={setActiveAceternityMenu} active={activeAceternityMenu} item="Services">
      <div className="flex flex-col space-y-4 text-sm min-w-[200px]">
        {serviceItems.map((item) => (
          <div
            key={item.value}
            onClick={() => handleServiceClick(item.value)}
            className="cursor-pointer"
          >
            <HoveredLink href="#">{item.label}</HoveredLink>
          </div>
        ))}
      </div>
    </MenuItem>
  );

  // Aceternity Products Dropdown
  const AceternityProductsDropdown = () => (
    <MenuItem setActive={setActiveAceternityMenu} active={activeAceternityMenu} item="Products">
      <div className="text-sm grid grid-cols-2 gap-10 p-4 min-w-[600px]">
        <ProductItem
          title="Algochurn"
          href="https://algochurn.com"
          src="https://assets.aceternity.com/demos/algochurn.webp"
          description="Prepare for tech interviews like never before."
        />
        <ProductItem
          title="Tailwind Master Kit"
          href="https://tailwindmasterkit.com"
          src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
          description="Production ready Tailwind css components for your next project"
        />
        <ProductItem
          title="Moonbeam"
          href="https://gomoonbeam.com"
          src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
          description="Never write from scratch again. Go from idea to blog in minutes."
        />
        <ProductItem
          title="Rogue"
          href="https://userogue.com"
          src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
          description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
        />
      </div>
    </MenuItem>
  );

  // Aceternity Pricing Dropdown
  const AceternityPricingDropdown = () => (
    <MenuItem setActive={setActiveAceternityMenu} active={activeAceternityMenu} item="Pricing">
      <div className="flex flex-col space-y-4 text-sm min-w-[180px]">
        <HoveredLink href="/pricing/hobby">Hobby</HoveredLink>
        <HoveredLink href="/pricing/individual">Individual</HoveredLink>
        <HoveredLink href="/pricing/team">Team</HoveredLink>
        <HoveredLink href="/pricing/enterprise">Enterprise</HoveredLink>
      </div>
    </MenuItem>
  );

  // Aceternity Resources Dropdown
  const AceternityResourcesDropdown = () => (
    <MenuItem setActive={setActiveAceternityMenu} active={activeAceternityMenu} item="Resources">
      <div className="flex flex-col space-y-4 text-sm min-w-[180px]">
        {resourceItems.map((item) => (
          <div key={item.label} onClick={() => handleNavigation(item.path)} className="cursor-pointer">
            <HoveredLink href="#">{item.label}</HoveredLink>
          </div>
        ))}
      </div>
    </MenuItem>
  );

  // Aceternity Who We Are Dropdown
  const AceternityWhoWeAreDropdown = () => (
    <MenuItem setActive={setActiveAceternityMenu} active={activeAceternityMenu} item="Who we are">
      <div className="flex flex-col space-y-4 text-sm min-w-[200px]">
        <div onClick={() => handleNavigation('/aboutus')} className="cursor-pointer">
          <HoveredLink href="#">About Us</HoveredLink>
        </div>
        <div onClick={() => handleNavigation('/joinus')} className="cursor-pointer">
          <HoveredLink href="#">Join Us</HoveredLink>
        </div>
      </div>
    </MenuItem>
  );

  // Original ServicesDropdown (keep as backup or alternative)
  const ServicesDropdown = () => (
    <div 
      className="relative inline-block"
      onMouseEnter={() => handleDropdownMouseEnter("services")}
      onMouseLeave={handleDropdownMouseLeave}
    >
      <DropdownMenu open={openDropdown === "services"} modal={false}>
        <DropdownMenuTrigger asChild>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-1.5 px-1 lg:px-3 group font-sans">
            Services
            <ChevronDown className={`h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 ${openDropdown === "services" ? "rotate-180" : "group-hover:rotate-180"}`} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[280px] p-4 z-[100]" 
          align="start" 
          sideOffset={8}
          onMouseEnter={() => handleDropdownMouseEnter("services")}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-1.5 font-serif">Our Expertise</h3>
            <ul className="space-y-2 font-sans">
              {serviceItems.map((item) => (
                <DropdownMenuItem 
                  key={item.value} 
                  className="cursor-pointer px-0 py-1 hover:bg-transparent focus:bg-transparent" 
                  onClick={() => handleServiceClick(item.value)}
                >
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">{item.label}</span>
                </DropdownMenuItem>
              ))}
            </ul>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  // Decide which menu system to use (can be toggled with a flag)
  const USE_ACETERNITY_MENU = false; // Set to false to avoid potential issues with Aceternity components

  return (
    <div className="relative w-full">
      <ResizableNavbar scrolled={scrolled} topOffset={topOffset}>
        {/* Desktop Navigation */}
        <NavBody className="py-5">
          <div className="flex items-center justify-between w-full py-1">
            <CustomNavbarLogo />
            
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-2">
              {USE_ACETERNITY_MENU ? (
                <Menu setActive={setActiveAceternityMenu}>
                  <AceternityServicesDropdown />
                  <AceternityProductsDropdown />
                  <AceternityResourcesDropdown />
                  <AceternityWhoWeAreDropdown />
                  <AceternityPricingDropdown />
                </Menu>
              ) : (
                <>
                  <ServicesDropdown />
                  <ResourcesDropdown />
                  <WhoWeAreDropdown />
                </>
              )}
              
              {!USE_ACETERNITY_MENU && (
                <span 
                  onClick={() => handleNavigation('/blog')} 
                  className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-2 px-2 font-sans"
                >
                  Blog
                </span>
              )}
            </div>
            
            <div className="hidden lg:flex items-center gap-1.5">
              <button 
                onClick={() => handleNavigation('/projects')}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-md text-xs font-sans transition-colors"
              >
                Discover
              </button>
              <RainbowButton
                onClick={() => handleNavigation('/contact')}
                className="px-3 xl:px-5 py-2 h-9 xl:h-10 font-sans text-xs xl:text-sm"
              >
                Appointment
              </RainbowButton>
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation - Keep existing mobile implementation */}
        <MobileNav>
          <MobileNavHeader>
            <CustomNavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Services Section */}
              <div className="border-b border-border/60">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "mobile-services" ? null : "mobile-services")}
                  className="w-full flex items-center justify-between py-4 px-4 text-base font-medium hover:bg-accent/30 transition-colors"
                >
                  <span className="text-foreground font-sans">Services</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openDropdown === "mobile-services" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "mobile-services" && (
                  <div className="px-4 pb-4 pt-2 bg-accent/10">
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5 font-serif">Our Expertise</h3>
                      <ul className="space-y-0.5 font-sans">
                        {serviceItems.map((item) => (
                          <li
                            key={item.value}
                            onClick={() => handleServiceClick(item.value)}
                            className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer py-1.5 px-2 hover:bg-accent/50 rounded-md"
                          >
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Section */}
              <div className="border-b border-border/60">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "mobile-resources" ? null : "mobile-resources")}
                  className="w-full flex items-center justify-between py-4 px-4 text-base font-medium hover:bg-accent/30 transition-colors"
                >
                  <span className="text-foreground font-sans">Resources</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openDropdown === "mobile-resources" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "mobile-resources" && (
                  <div className="px-4 pb-4 pt-2 bg-accent/10">
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5 font-serif">Support</h3>
                      <ul className="space-y-0.5 font-sans">
                        {resourceItems.map((item) => (
                          <li
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer py-1.5 px-2 hover:bg-accent/50 rounded-md"
                          >
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Who We Are Section */}
              <div className="border-b border-border/60">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "mobile-whoweare" ? null : "mobile-whoweare")}
                  className="w-full flex items-center justify-between py-4 px-4 text-base font-medium hover:bg-accent/30 transition-colors"
                >
                  <span className="text-foreground font-sans">Who we are</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openDropdown === "mobile-whoweare" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "mobile-whoweare" && (
                  <div className="px-4 pb-4 pt-2 bg-accent/10">
                    <div className="space-y-2">
                      <div
                        onClick={() => handleNavigation('/aboutus')}
                        className="cursor-pointer px-3 py-3 hover:bg-accent/50 rounded-lg transition-colors group"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans block">About Us</span>
                        <span className="text-xs text-muted-foreground/70">Our story, mission & vision</span>
                      </div>
                      <div
                        onClick={() => handleNavigation('/joinus')}
                        className="cursor-pointer px-3 py-3 hover:bg-accent/50 rounded-lg transition-colors group"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans block">Join Us</span>
                        <span className="text-xs text-muted-foreground/70">Careers & opportunities</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Blog Link */}
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/blog');
                }}
                className="block py-4 px-4 border-b border-border/60 hover:bg-accent/30 transition-colors"
              >
                <span className="text-foreground font-sans">Blog</span>
              </a>

              {/* Mobile Buttons */}
              <div className="flex w-full flex-col gap-4 p-4 mt-auto">
                <button
                  onClick={() => {
                    handleNavigation('/projects');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-sans w-full transition-colors"
                >
                  Discover
                </button>
                <RainbowButton
                  onClick={() => {
                    handleNavigation('/contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Appointment
                </RainbowButton>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}

// WhoWeAreDropdown component
const WhoWeAreDropdown = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleNavigation = (path) => navigate(path);
  
  const handleDropdownMouseEnter = (dropdownName) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 150);
    setHoverTimeout(timeout);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => handleDropdownMouseEnter("whoweare")}
      onMouseLeave={handleDropdownMouseLeave}
    >
      <DropdownMenu open={openDropdown === "whoweare"} modal={false}>
        <DropdownMenuTrigger asChild>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-2 px-1 lg:px-2 group font-sans">
            Who we are
            <ChevronDown className={`h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 ${openDropdown === "whoweare" ? "rotate-180" : "group-hover:rotate-180"}`} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[240px] p-3 z-[100]" 
          align="start" 
          sideOffset={8}
          onMouseEnter={() => handleDropdownMouseEnter("whoweare")}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="space-y-1">
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2.5 hover:bg-accent/50 focus:bg-accent/50 rounded-lg group" 
              onClick={() => handleNavigation('/aboutus')}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">About Us</span>
                <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">Our story, mission & vision</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2.5 hover:bg-accent/50 focus:bg-accent/50 rounded-lg group" 
              onClick={() => handleNavigation('/joinus')}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors font-sans">Join Us</span>
                <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">Careers & opportunities</span>
              </div>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator className="my-2" />
          <div className="px-2 py-1">
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 italic font-sans">Be part of our journey</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// ResourcesDropdown component
const ResourcesDropdown = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  
  const resourceItems = [
    { label: "FAQs", path: "/faq" },
  ];

  const handleNavigation = (path) => navigate(path);
  
  const handleDropdownMouseEnter = (dropdownName) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 150);
    setHoverTimeout(timeout);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => handleDropdownMouseEnter("resources")}
      onMouseLeave={handleDropdownMouseLeave}
    >
      <DropdownMenu open={openDropdown === "resources"} modal={false}>
        <DropdownMenuTrigger asChild>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-2 px-1 lg:px-2 group font-sans">
            Resources
            <ChevronDown className={`h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 ${openDropdown === "resources" ? "rotate-180" : "group-hover:rotate-180"}`} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[240px] p-4 z-[100]" 
          align="start" 
          sideOffset={8}
          onMouseEnter={() => handleDropdownMouseEnter("resources")}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground border-b border-border pb-1.5 font-serif">Support</h3>
            <ul className="space-y-2 font-sans">
              {resourceItems.map((item) => (
                <DropdownMenuItem 
                  key={item.label} 
                  className="cursor-pointer px-0 py-1 hover:bg-transparent focus:bg-transparent" 
                  onClick={() => handleNavigation(item.path)}
                >
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">{item.label}</span>
                </DropdownMenuItem>
              ))}
            </ul>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarDemo;