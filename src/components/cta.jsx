"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import StickyBannerDemo from "./sticky-banner-demo";

export default function Layout({ children }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if banner was already dismissed in this session
    const bannerDismissed = sessionStorage.getItem("bannerDismissed");
    if (!bannerDismissed) {
      setShowBanner(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("bannerDismissed", "true");
  };

  return (
    <> 
      {showBanner && (
        <div className="relative z-[100]">
          <StickyBannerDemo onDismiss={handleDismiss} />
        </div>
      )}
      
      <div className="relative z-[99]">
        <Navbar topOffset={showBanner ? "3.5rem" : 0} />
      </div>
      
      <main className="min-h-screen pt-14">
        {children}
      </main>
      
      <Footer />
    </>
  );
}