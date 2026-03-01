import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import logo from '../assets/test.png';
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Landingpage = () => {
   
      
  return (
    <div className="mt-14 bg-white text-black min-h-screen w-full relative">
      {/* Subtle glass background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -right-20 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-black/[0.01] rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      <main className="relative min-h-screen flex items-center">
        {/* Hero Section - Full height */}
        <section className="w-full py-8 md:py-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[calc(100vh-80px)]">
              
              {/* Left Content - Lower z-index than image */}
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 relative z-10">
                {/* Experts Client-First Badge */}
                

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight">
                  <span className="font-serif italic text-black/80">Our</span>
                  <br />
                  <span className="clash-font text-5xl sm:text-30xl md:text-15xl lg:text-7xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black/90 to-black/70">
  SERVICES
</span>


                  <br />
                
                </h1>
                
                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-black/60 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 backdrop-blur-sm bg-black/[0.02] p-4 sm:p-6 rounded-2xl border border-black/5">
                We are a company that builds full-stack web applications, AI-powered solutions, and UI/UX designs. We leverage our expertise to deliver tailored services, Figma web design, Webflow maintenance and specialized SEO.
                <span className="block mt-2 sm:mt-3 font-medium text-black/80 italic">
  "We believe great design drives impact, and our expertise makes it happen."
</span>
  </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                 <Link to={'/contact'}> <Button 
                    size="lg" 
                    className="bg-black sf-font text-white hover:bg-black/90 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-10 rounded-none shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  >
                    Make an appointment
                  </Button></Link>
                  
                  {/* 10+ Projects Badge */}
                 
                </div>
              </div>

              {/* Right Content - Image at MAXIMUM z-index, ahead of EVERYTHING */}
              <div className="relative flex items-center justify-center h-full py-8 lg:py-0" style={{ zIndex: 10 }}>
                <div className="relative w-[110%] lg:w-[120%] xl:w-[130%] ">
                <div className="absolute inset-0 bg-white rounded-3xl"></div>
                  {/* Shadow layers for depth - behind image */}
                  <div className="absolute -inset-4 bg-black/5 rounded-3xl blur-3xl opacity-60" style={{ zIndex: 1 }}></div>
                  <div className="absolute -inset-2 bg-black/10 rounded-3xl blur-2xl opacity-40" style={{ zIndex: 2 }}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/5 rounded-3xl blur-xl opacity-30" style={{ zIndex: 3 }}></div>
                  
                  {/* Main image - MAXIMUM Z-INDEX */}
                  <div className="relative" style={{ zIndex: 9 }}>
                    <img
                      src={logo}
                      alt="Webflow Design Studio"
                      className="w-full h-auto object-cover rounded-3xl shadow-2xl shadow-black/30 hover:shadow-black/40 transition-shadow duration-500 relative"
                      style={{ zIndex: 1 }}
                    />
                    
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 rounded-3xl" style={{ zIndex: 9999 }}></div>
                  </div>
                  
                  {/* Additional floating shadow for depth - behind image */}
                  <div className="absolute -bottom-6 left-10 right-10 h-20 bg-black/20 blur-3xl rounded-full" style={{ zIndex: 1 }}></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-50">
          <ChevronDown
            size={40}
            className="animate-bounce text-black/70 cursor-pointer"
            onClick={() =>
              document
                .getElementById("next-div")
                .scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>
        
            {/* Bottom Stats - Glass Grid */}
          
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landingpage;