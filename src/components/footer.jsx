"use client";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { Badge } from "../components/ui/badge";
import {
  Sparkles,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Heart,
  Moon,
} from "lucide-react";
import logo from '../assets/avx.png';
const FOOTER_TITLE = "Build Tastefully Crafted UIs";

const SolaceUILogo = ({ className }) => {
  return (
    <svg
      className={className}
      width="64"
      height="38"
      viewBox="0 0 64 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20.1032L39.8387 20.1032C44.7808 20.1032 48.7871 24.1095 48.7871 29.0516C48.7871 33.9937 44.7808 38 39.8387 38L1.56459e-06 38L0 20.1032Z"
        fill="currentColor"
      />
      <path
        d="M63.4968 17.8968L23.6581 17.8968C18.716 17.8968 14.7097 13.8904 14.7097 8.94839C14.7097 4.00633 18.716 0 23.6581 0L63.4968 0V17.8968Z"
        fill="currentColor"
      />
    </svg>
  );
};

// Social Icon Components with animations
const XIcon = ({ className }) => (
  <motion.svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 23 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <path
      d="M9.46617 12.6219L14.625 19.5H22.2083L13.6955 8.14883L20.7783 0H17.9075L12.3641 6.3765L7.58333 0H0L8.13583 10.8496L0.6175 19.5H3.48833L9.46617 12.6219ZM15.7083 17.3333L4.33333 2.16667H6.5L17.875 17.3333H15.7083Z"
      fill="currentColor"
    />
  </motion.svg>
);

const LinkedInIcon = ({ className }) => (
  <motion.svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.2, rotate: -5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <path
      d="M20 0C20.663 0 21.2989 0.263392 21.7678 0.732233C22.2366 1.20107 22.5 1.83696 22.5 2.5V20C22.5 20.663 22.2366 21.2989 21.7678 21.7678C21.2989 22.2366 20.663 22.5 20 22.5H2.5C1.83696 22.5 1.20107 22.2366 0.732233 21.7678C0.263392 21.2989 0 20.663 0 20V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H20ZM19.375 19.375V12.75C19.375 11.6692 18.9457 10.6328 18.1815 9.86854C17.4172 9.10433 16.3808 8.675 15.3 8.675C14.2375 8.675 13 9.325 12.4 10.3V8.9125H8.9125V19.375H12.4V13.2125C12.4 12.25 13.175 11.4625 14.1375 11.4625C14.6016 11.4625 15.0467 11.6469 15.3749 11.9751C15.7031 12.3033 15.8875 12.7484 15.8875 13.2125V19.375H19.375ZM4.85 6.95C5.40695 6.95 5.9411 6.72875 6.33492 6.33492C6.72875 5.9411 6.95 5.40695 6.95 4.85C6.95 3.6875 6.0125 2.7375 4.85 2.7375C4.28973 2.7375 3.75241 2.96007 3.35624 3.35624C2.96007 3.75241 2.7375 4.28973 2.7375 4.85C2.7375 6.0125 3.6875 6.95 4.85 6.95ZM6.5875 19.375V8.9125H3.125V19.375H6.5875Z"
      fill="currentColor"
    />
  </motion.svg>
);

const GithubIcon = ({ className }) => (
  <motion.svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <path
      d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.165 5.22 19.845 4.98 19.155C4.845 18.795 4.26 17.715 3.75 17.415C3.33 17.175 2.73 16.59 3.735 16.575C4.68 16.56 5.355 17.445 5.58 17.82C6.66 19.665 8.385 19.275 9.075 18.96C9.18 18.18 9.495 17.655 9.84 17.355C7.17 17.055 4.38 16.02 4.38 11.4C4.38 10.08 4.845 8.985 5.61 8.13C5.49 7.83 5.07 6.585 5.73 4.935C5.73 4.935 6.735 4.62 9.03 6.18C9.99 5.91 11.01 5.775 12.03 5.775C13.05 5.775 14.07 5.91 15.03 6.18C17.325 4.605 18.33 4.935 18.33 4.935C18.99 6.585 18.57 7.83 18.45 8.13C19.215 8.985 19.68 10.08 19.68 11.4C19.68 16.035 16.875 17.055 14.205 17.355C14.64 17.73 15.015 18.45 15.015 19.545C15.015 21.105 14.985 22.365 14.985 22.815C14.985 23.13 15.21 23.505 15.81 23.385C20.565 21.795 24 17.31 24 12C24 5.37 18.63 0 12 0Z"
      fill="currentColor"
    />
  </motion.svg>
);

const InstagramIcon = ({ className }) => (
  <motion.svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.2, rotate: -5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <path
      d="M6.76667 0H16.5667C20.3 0 23.3333 3.03333 23.3333 6.76667V16.5667C23.3333 18.3613 22.6204 20.0824 21.3514 21.3514C20.0824 22.6204 18.3613 23.3333 16.5667 23.3333H6.76667C3.03333 23.3333 0 20.3 0 16.5667V6.76667C0 4.97204 0.712915 3.25091 1.98191 1.98191C3.25091 0.712915 4.97204 0 6.76667 0ZM6.53333 2.33333C5.41942 2.33333 4.35114 2.77583 3.56349 3.56349C2.77583 4.35114 2.33333 5.41942 2.33333 6.53333V16.8C2.33333 19.1217 4.21167 21 6.53333 21H16.8C17.9139 21 18.9822 20.5575 19.7699 19.7699C20.5575 18.9822 21 17.9139 21 16.8V6.53333C21 4.21167 19.1217 2.33333 16.8 2.33333H6.53333ZM17.7917 4.08333C18.1784 4.08333 18.5494 4.23698 18.8229 4.51047C19.0964 4.78396 19.25 5.15489 19.25 5.54167C19.25 5.92844 19.0964 6.29937 18.8229 6.57286C18.5494 6.84635 18.1784 7 17.7917 7C17.4049 7 17.034 6.84635 16.7605 6.57286C16.487 6.29937 16.3333 5.92844 16.3333 5.54167C16.3333 5.15489 16.487 4.78396 16.7605 4.51047C17.034 4.23698 17.4049 4.08333 17.7917 4.08333ZM11.6667 5.83333C13.2138 5.83333 14.6975 6.44792 15.7915 7.54188C16.8854 8.63584 17.5 10.1196 17.5 11.6667C17.5 13.2138 16.8854 14.6975 15.7915 15.7915C14.6975 16.8854 13.2138 17.5 11.6667 17.5C10.1196 17.5 8.63584 16.8854 7.54188 15.7915C6.44792 14.6975 5.83333 13.2138 5.83333 11.6667C5.83333 10.1196 6.44792 8.63584 7.54188 7.54188C8.63584 6.44792 10.1196 5.83333 11.6667 5.83333ZM11.6667 8.16667C10.7384 8.16667 9.84817 8.53542 9.19179 9.19179C8.53542 9.84817 8.16667 10.7384 8.16667 11.6667C8.16667 12.5949 8.53542 13.4852 9.19179 14.1415C9.84817 14.7979 10.7384 15.1667 11.6667 15.1667C12.5949 15.1667 13.4852 14.7979 14.1415 14.1415C14.7979 13.4852 15.1667 12.5949 15.1667 11.6667C15.1667 10.7384 14.7979 9.84817 14.1415 9.19179C13.4852 8.53542 12.5949 8.16667 11.6667 8.16667Z"
      fill="currentColor"
    />
  </motion.svg>
);

const SocialCloud = ({ className }) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}>
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        <XIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        <LinkedInIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
    </div>
  );
};

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Navigation handlers
  const handleServiceClick = (service) => {
    navigate(`/projects?service=${encodeURIComponent(service)}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };
const CustomNavbarLogo = () => (
    <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
      <img src={logo} alt="AVXONIA INNOVATIONS" className="h-10 sm:h-12 w-auto object-contain" />
    </Link>
  );
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Website Development", value: "Website Development" },
        { label: "UI/UX Design", value: "UI/UX Design" },
        { label: "AI Automation", value: "Ai Automation" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Case Studies", path: "/projects" },
        { label: "Blog", path: "/blog" },
        { label: "Whitepapers", path: "/blog" },
        { label: "Documentation", path: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", path: "/about" },
        { label: "Careers", path: "/careers" },
        { label: "Team", path: "/team" },
        { label: "Press", path: "/press" },
        { label: "Contact", path: "/contact" },
        { label: "Privacy", path: "/privacy" },
      ],
    },
    {
      title: "Socials",
      links: [
        { label: "Twitter", icon: Twitter, href: "#" },
        { label: "LinkedIn", icon: Linkedin, href: "#" },
        { label: "GitHub", icon: Github, href: "#" },
        { label: "Instagram", icon: Instagram, href: "#" },
      ],
    },
  ];

  return (
    <section className="py-8 sm:py-12 px-4 bg-[#0a0a0a]">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-7xl"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Blue Card - Left */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            className="relative w-full lg:w-1/3 min-h-[300px] lg:min-h-[600px] overflow-hidden rounded-2xl bg-[#003AF9] flex flex-col justify-between p-6 sm:p-8 lg:p-10"
          >
            {/* SVG Noise Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-90 pointer-events-none mix-blend-multiply z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="noiseFilter2">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter2)" />
            </svg>

            {/* Blur Effect at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#003AF9] via-[#003AF9]/80 to-transparent z-[5] pointer-events-none"></div>
            
            {/* Bottom Blur Overlay with additional glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#003AF9]/90 to-transparent backdrop-blur-[2px] z-[5] pointer-events-none"></div>

            {/* Top Logo */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-white">
               <CustomNavbarLogo className="h-6 sm:h-7 w-auto" />
                <span className="text-lg sm:text-xl font-bold tracking-tight">
                  AVXONIA
                </span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <p className="text-lg font-bold text-white capitalize">
                    Crafting digital experiences with intention
                  </p>
                </div>
              </div>

              {/* Social Icons in Blue Card */}
              <SocialCloud className="pt-1 sm:pt-2" />

              <p className="text-[10px] sm:text-xs text-white/40 pt-3 sm:pt-4 border-t border-white/10">
                &copy; {currentYear} AVXONIA, All rights reserved
              </p>
            </div>
          </motion.div>

          {/* Black Card - Right */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            className="w-full lg:w-2/3 rounded-2xl bg-black border border-neutral-700 p-6 sm:p-8 lg:p-12 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
          >
            {/* Top Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {footerLinks.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-4 sm:space-y-6">
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-400 font-medium">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        {section.title === "Socials" ? (
                          <a
                            href={link.href}
                            className="hover:text-white transition-colors flex items-center gap-2 text-neutral-400"
                          >
                            <link.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-sm sm:text-base">{link.label}</span>
                          </a>
                        ) : section.title === "Services" ? (
                          <span
                            onClick={() => handleServiceClick(link.value)}
                            className="hover:text-white transition-colors cursor-pointer text-sm sm:text-base text-neutral-400"
                          >
                            {link.label}
                          </span>
                        ) : (
                          <span
                            onClick={() => handleNavigation(link.path)}
                            className="hover:text-white transition-colors cursor-pointer text-sm sm:text-base text-neutral-400"
                          >
                            {link.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Newsletter */}
            <div className="space-y-3 sm:space-y-4 mt-8 sm:mt-12 lg:mt-0">
              <h4 className="text-base sm:text-lg font-bold text-white">
                Newsletter
              </h4>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-full sm:max-w-md w-full">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white bg-transparent text-white border border-neutral-700 placeholder:text-neutral-500"
                />
                <button className="rounded-xl bg-gradient-to-b from-white via-zinc-100 to-zinc-300 text-zinc-900 px-8 py-3 text-sm font-medium border border-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_rgba(0,0,0,0.16)] transition-all duration-300">
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}