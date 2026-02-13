import React, { useEffect, useRef } from "react";

/**
 * A section that reveals text word by word as the user scrolls.
 * Each word fades from gray to black like a typing effect.
 */
const SpeedSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split each line into word spans
    const lines = container.querySelectorAll(".animate-line");
    lines.forEach((line) => {
      const text = line.textContent || "";
      // Split by spaces and filter out empty strings
      const words = text.split(/\s+/).filter((word) => word.length > 0);
      
      // Clear the line and wrap each word in a span
      line.innerHTML = "";
      words.forEach((word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "animate-word";
        wordSpan.textContent = word;
        wordSpan.style.transition = "color 0.1s ease-out";
        wordSpan.style.color = "rgb(180, 180, 180)"; // Start gray
        line.appendChild(wordSpan);
        
        // Add space after each word except the last
        if (index < words.length - 1) {
          line.appendChild(document.createTextNode(" "));
        }
      });
    });

    const words = container.querySelectorAll(".animate-word");

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const wordCenterY = scrollY + rect.top + rect.height / 2;
        
        // Calculate progress based on scroll position relative to viewport
        // Each word becomes black when it's exactly in the middle and fades in as it approaches
        const viewportCenter = scrollY + windowHeight / 2;
        const distance = Math.abs(viewportCenter - wordCenterY);
        const threshold = windowHeight / 2.5; // Wider threshold for smoother typing effect
        
        // Map distance to progress (0 = far, 1 = center)
        let progress = 1 - distance / threshold;
        progress = Math.min(1, Math.max(0, progress));
        
        // Easing function for smoother transition
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        // Interpolate from light gray (180) to black (0)
        const intensity = Math.round(180 * (1 - eased));
        word.style.color = `rgb(${intensity}, ${intensity}, ${intensity})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-[150vh] flex flex-col justify-center items-center py-16 px-8 bg-white"
      style={{
        fontFamily:
          "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
      }}
    >
      <div className="max-w-4xl w-full text-left">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
          <span className="animate-line block mb-2">
            We enable brands
          </span>
          <span className="animate-line block mb-2">
            to go faster and
          </span>
          <span className="animate-line block mb-2">
            further.
          </span>
          <span className="animate-line block mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
            With Webflow.
          </span>
        </h2>
      </div>
      
      {/* Decorative scroll indicator */}
      <div className="mt-32 max-w-xl w-full text-center border-t border-gray-200 pt-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-gray-300 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SpeedSection;