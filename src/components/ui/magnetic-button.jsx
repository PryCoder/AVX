"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const MagneticButton = ({
  children,
  strength = 40,
  onClick,
  className = "",
  onMouseMove: userOnMouseMove,
  onMouseLeave: userOnMouseLeave,
  ...props
}) => {
  const ref = useRef(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e) => {
    userOnMouseMove?.(e);
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * 0.25,
      y: y * 0.25,
    });
  };

  const handleMouseLeave = () => {
    userOnMouseLeave?.();
    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};