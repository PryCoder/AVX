"use client";

import { StickyBanner } from "../components/ui/sticky-banner";
import { X, Crown } from "lucide-react";

export default function StickyBannerDemo({ onDismiss }) {
  return (
    <div className="relative w-full">
      <StickyBanner
        hideCloseButton
        className="relative z-50 bg-gradient-to-b from-blue-500 to-blue-600"
      >
        <div className="relative flex items-center justify-center w-full px-4">
          <div className="flex items-center gap-2 text-white drop-shadow-md">
            <Crown className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <p className="text-center">
              Announcing project mayhem ventures.{" "}
              <a
                href="#"
                className="transition duration-200 hover:underline"
              >
                Read announcement
              </a>
            </p>
          </div>

          <button
            onClick={onDismiss}
            className="absolute right-4 text-white/80 hover:text-white transition-colors duration-200"
            aria-label="Dismiss banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </StickyBanner>
    </div>
  );
}