import React from 'react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const HowCanWeHelp = () => {
  return (
    <div className="text-black w-full relative overflow-hidden min-h-screen flex items-center bg-white">
      {/* Subtle background elements - even more transparent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -right-20 w-[600px] h-[600px] bg-black/[0.01] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-black/[0.01] rounded-full blur-3xl"></div>
      </div>

      <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header Section - Fully responsive text */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/[0.02] border border-black/10 mb-4 sm:mb-5 md:mb-6">
              <span className="relative flex h-1.5 sm:h-2 w-1.5 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40"></span>
                <span className="relative inline-flex rounded-full h-1.5 sm:h-2 w-1.5 sm:w-2 bg-black/60"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-black/70 font-dm-sans">HOW CAN WE HELP YOU</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0">
              <span className="font-cormorant italic text-black/80 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 sm:mb-2">With this in mind,</span>
              <span className=" clash-font font-medium text-black/90 tracking-[2px] block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-1 sm:mb-2 font-serif">more than 3 years ago,</span>
              <span className="text-black/70 block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-1 sm:mb-2 font-serif">we chose to develop</span>
              <span className="clash-font font-medium bg-clip-text tracking-[2px] text-transparent bg-gradient-to-r from-black/90 to-black/70 block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif">
                all our sites on Webflow.
              </span>
            </h2>
            
           
          </div>

          {/* Three Cards - Fully responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 px-2 sm:px-0">
            
            {/* Card 1 - Webflow development */}
            <div className="group bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl border border-black/10 shadow-lg sm:shadow-xl shadow-black/5 p-5 sm:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-black rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-3 lg:mb-4 shadow-md sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 3.75h13.5A2.25 2.25 0 0021 12.75v-6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6.75v6a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="clash-font font-semibold text-lg sm:text-xl lg:text-3xl font-bold text-black/90 mb-2 sm:mb-2 lg:mb-3 font-montserrat">Webflow development</h3>
                <p className="text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed flex-grow font-inter">
                  We transform your designs and ideas into a completely tailor-made, functional and scalable Webflow site.
                </p>
              </div>
            </div>
            
            {/* Card 2 - UI/UX Design */}
            <div className="group bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl border border-black/10 shadow-lg sm:shadow-xl shadow-black/5 p-5 sm:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-black rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-3 lg:mb-4 shadow-md sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 01-5.78 1.128 3 3 0 015.78-1.128zM14.25 9.75L16.5 12l-2.25 2.25M18 12h2.25M4 6h16" />
                  </svg>
                </div>
                <h3 className="clash-font font-semibold text-lg sm:text-xl lg:text-3xl font-bold text-black/90 mb-2 sm:mb-2 lg:mb-3 font-montserrat">UI/UX Design</h3>
                <p className="text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed flex-grow font-inter">
                  We design intuitive web and mobile Figma mockups focused on user engagement and retention.
                </p>
              </div>
            </div>
            
            {/* Card 3 - Technical SEO on Webflow */}
            <div className="group bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl border border-black/10 shadow-lg sm:shadow-xl shadow-black/5 p-5 sm:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1 sm:max-w-[calc(50%-0.75rem)] sm:mx-auto lg:max-w-none">
              <div className="flex flex-col h-full">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-black rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-3 lg:mb-4 shadow-md sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="clash-font font-semibold text-lg sm:text-xl lg:text-3xl font-bold text-black/90 mb-2 sm:mb-2 lg:mb-3 font-montserrat">Technical SEO on Webflow</h3>
                <p className="text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed flex-grow font-inter">
                  We activate our SEO optimization skills in order to achieve sustainable results for your business.
                </p>
              </div>
            </div>
            
          </div>
          
          {/* CTA Button - Fully responsive */}
          <div className="flex justify-center mt-10 sm:mt-12 md:mt-16 lg:mt-20 px-4 sm:px-0">
           <Link to={'/contact'}><Button 
              size="lg" 
              className="sfpro-font font-medium bg-black text-white hover:bg-black/90 font-medium text-sm sm:text-base lg:text-lg h-12 sm:h-14 px-6 sm:px-8 lg:px-10 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto font-sans"
            >
              Book a free appointment
            </Button></Link> 
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default HowCanWeHelp;