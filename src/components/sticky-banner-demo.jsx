"use client";

import { StickyBanner } from "../components/ui/sticky-banner";
import { X } from "lucide-react"; // or use any close icon you prefer

export default function StickyBannerDemo({ onDismiss }) {
  return (
    <div className="relative w-full">
      <StickyBanner className="relative z-50 bg-gradient-to-b from-blue-500 to-blue-600">
        <div className="flex items-center justify-between w-full px-4">
          <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            Announcing $10M seed funding from project mayhem ventures.{" "}
            <a href="#" className="transition duration-200 hover:underline">
              Read announcement
            </a>
          </p>
          <button 
            onClick={onDismiss}
            className="ml-4 text-white/80 hover:text-white transition-colors duration-200"
            aria-label="Dismiss banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </StickyBanner>
    </div>
  );
}