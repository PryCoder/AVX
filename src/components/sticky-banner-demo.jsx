"use client";

import { StickyBanner } from "../components/ui/sticky-banner";
import { X, Crown } from "lucide-react";
import { Button } from "../components/ui/button";

export default function StickyBannerDemo({ onDismiss }) {
  return (
    <div className="relative w-full">
      <StickyBanner
        hideCloseButton
        className="relative z-50 bg-gradient-to-r from-pink-500 to-rose-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-center text-left md:text-center gap-2">
          <Crown className="size-5 stroke-2 shrink-0 text-yellow-300 fill-yellow-300" />
          <span className="font-medium">
            Announcing project mayhem ventures.{" "}
            <a
              href="#"
              className="text-white/90 hover:text-white transition duration-200 hover:underline font-semibold"
            >
              Read announcement
            </a>
          </span>
          <Button
            onClick={onDismiss}
            variant="ghost"
            className="size-8 text-white hover:text-white hover:bg-white/20"
          >
            <X className="size-4 stroke-2" />
            <span className="sr-only">Dismiss banner</span>
          </Button>
        </div>
      </StickyBanner>
    </div>
  );
}