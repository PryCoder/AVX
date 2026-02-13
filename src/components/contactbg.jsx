// components/ThreeBackground.jsx
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sparkles, useDetectGPU } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const GLOBE_RADIUS = 2.5;
const SHIELD_RADIUS = GLOBE_RADIUS + 0.5;

// Performance detection hook
const usePerformanceTier = () => {
  const GPU = useDetectGPU();
  const [tier, setTier] = useState('medium');
  
  useEffect(() => {
    if (GPU.tier < 1) setTier('low');
    else if (GPU.tier > 2) setTier('high');
    else setTier('medium');
  }, [GPU]);
  
  return tier;
};

// Artistic pulsing core
const ArtisticCore = () => {
  const coreRef = useRef();
  const glowRef = useRef();
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.material.emissiveIntensity = 1.2 + Math.sin(time * 2) * 0.4;
      coreRef.current.rotation.y += 0.001;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
      glowRef.current.material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group>
      {/* Main Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 0.6, 32, 32]} />
        <meshStandardMaterial
          color="#ffaa44"
          emissive="#ff5500"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 0.8, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa44"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Minimalist shield with flowing particles
const MinimalShield = ({ performanceTier }) => {
  const shieldRef = useRef();
  
  // Optimize node count based on performance
  const nodeCount = performanceTier === 'high' ? 24 : 
                   performanceTier === 'medium' ? 16 : 8;
  
  const connectionCount = performanceTier === 'high' ? 0.5 : 
                         performanceTier === 'medium' ? 0.4 : 0.3;
  
  const { nodes, connections } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(SHIELD_RADIUS, 
      performanceTier === 'high' ? 2 : 1);
    const positions = geometry.attributes.position.array;
    
    const tempNodes = [];
    for (let i = 0; i < positions.length; i += 3) {
      tempNodes.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
    }
    
    // Create connections
    const tempConnections = [];
    for (let i = 0; i < tempNodes.length; i++) {
      for (let j = i + 1; j < tempNodes.length; j++) {
        const dist = tempNodes[i].distanceTo(tempNodes[j]);
        if (dist < SHIELD_RADIUS * connectionCount) {
          if (Math.random() > 0.7) { // Random selection for artistic effect
            tempConnections.push({ start: tempNodes[i], end: tempNodes[j] });
          }
        }
      }
    }
    
    return { nodes: tempNodes, connections: tempConnections };
  }, [performanceTier, connectionCount]);

  useFrame(({ clock }) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      shieldRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={shieldRef}>
      {/* Artistic nodes with varying sizes */}
      {nodes.slice(0, nodeCount).map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06 + (i % 3) * 0.02, 8, 8]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#ffaa44" : "#44aaff"} 
            emissive={i % 2 === 0 ? "#ff5500" : "#2244aa"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Minimal connections with gradient */}
      {connections.map((conn, i) => (
        <ArtisticConnection key={i} {...conn} index={i} />
      ))}
    </group>
  );
};

// Simplified flowing particles
const ArtisticConnection = ({ start, end, index }) => {
  const particleRef = useRef();
  const curve = useMemo(() => new THREE.LineCurve3(start, end), [start, end]);
  const speed = useMemo(() => 0.1 + Math.random() * 0.1, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (particleRef.current) {
      const t = (Math.sin(clock.getElapsedTime() * speed + offset) + 1) * 0.5;
      curve.getPoint(t, particleRef.current.position);
      
      // Pulse intensity
      if (particleRef.current.material) {
        particleRef.current.material.emissiveIntensity = 
          0.5 + Math.sin(t * Math.PI) * 0.5;
      }
    }
  });

  return (
    <>
      {/* Connection line (semi-transparent) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={index % 2 === 0 ? "#ffaa44" : "#44aaff"} 
          transparent 
          opacity={0.15}
        />
      </line>
      
      {/* Flowing particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial 
          color="white" 
          emissive={index % 2 === 0 ? "#ffaa44" : "#44aaff"}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </>
  );
};

// Background stars with performance optimization
const BackgroundStars = ({ count = 200 }) => {
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Warm and cool color variation
      const isWarm = Math.random() > 0.5;
      const color = isWarm ? 
        new THREE.Color(0xffaa44).lerp(new THREE.Color(0xff5500), Math.random()) :
        new THREE.Color(0x44aaff).lerp(new THREE.Color(0x2244aa), Math.random());
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    return { positions: pos, colors: col };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Responsive camera setup - FIXED version
const ResponsiveCamera = () => {
  const { camera, viewport } = useThree();
  
  useEffect(() => {
    // Adjust camera distance based on screen size
    if (viewport.width < 5) {
      camera.position.z = 12;
    } else if (viewport.width < 10) {
      camera.position.z = 10;
    } else {
      camera.position.z = 8;
    }
  }, [viewport.width, camera]);

  return null;
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#0a0a0a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffaa44',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      zIndex: 1000
    }}>
      Loading...
    </div>
  );
};

// Main Scene
const ThreeScene = () => {
  const performanceTier = usePerformanceTier();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate loading complete
    const timer = setTimeout(() => setIsLoading(false), 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Performance-based settings
  const starCount = isMobile ? 80 : performanceTier === 'high' ? 200 : 150;
  const enableBloom = performanceTier !== 'low' && !isMobile;
  const enableControls = !isMobile;

  if (isLoading) return <LoadingFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: isMobile ? 65 : 50 }}
      style={{ 
        background: '#0a0a0a',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: isMobile ? 'none' : 'auto'
      }}
      gl={{ 
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false
      }}
      performance={{ min: 0.5 }}
      dpr={[1, isMobile ? 1.5 : 2]}
    >
      {/* Responsive camera */}
      <ResponsiveCamera />
      
      {/* Lighting - optimized */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffaa44" />
      <pointLight position={[-5, -3, 5]} intensity={0.25} color="#44aaff" />
      
      {/* Main composition - artistic arrangement */}
      <group position={[0, 0, 0]}>
        <ArtisticCore />
        <MinimalShield performanceTier={performanceTier} />
      </group>
      
      {/* Background elements */}
      <BackgroundStars count={starCount} />
      
      {/* Subtle sparkles - reduced on mobile */}
      {!isMobile && (
        <Sparkles
          count={performanceTier === 'high' ? 80 : 40}
          scale={12}
          size={0.3}
          speed={0.1}
          color="white"
          opacity={0.15}
        />
      )}
      
      {/* Controls - disabled on mobile for better performance */}
      {enableControls && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.3}
          rotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      )}
      
      {/* Post-processing - conditional based on performance */}
      {enableBloom && (
        <EffectComposer>
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.5}
            height={isMobile ? 240 : 480}
          />
          <Vignette 
            eskil={false} 
            offset={0.2} 
            darkness={0.7} 
          />
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default ThreeScene;