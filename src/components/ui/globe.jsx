// components/ui/globe.jsx
'use client';

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '../../lib/utils';

const Earth = ({
  className,
  theta = 0.25,
  dark = 0.7,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [1, 0, 0],
  glowColor = [0.2745, 0.5765, 0.898],
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;
    let globeInstance = null;
    
    const initGlobe = () => {
      if (!canvasRef.current) return;
      
      // Get the actual width of the canvas container
      width = canvasRef.current.clientWidth;
      if (width === 0) return;
      
      // Destroy existing globe instance if it exists
      if (globeInstance) {
        globeInstance.destroy();
      }
      
      // Create new globe instance
      globeInstance = createGlobe(canvasRef.current, {
        devicePixelRatio: window.devicePixelRatio || 2,
        width: width,
        height: width,
        phi: 0,
        theta: theta,
        dark: dark,
        scale: scale,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: baseColor,
        markerColor: markerColor,
        glowColor: glowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.003;
        },
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initGlobe();
    }, 100);

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.clientWidth !== width) {
        initGlobe();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (globeInstance) {
        globeInstance.destroy();
      }
    };
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor]);

  return (
    <div
      className={cn(
        'flex items-center justify-center z-[10] w-full',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          aspectRatio: '1',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Earth;