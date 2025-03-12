"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from '../context/ThemeContext'; // Adjust the import path
import { EASING } from '../utils/constants';

const PARTICLE_SIZE = 0.025;
const HIGHLIGHTED_PARTICLE_SIZE = PARTICLE_SIZE * 2;
const EARTH_RADIUS = 1.33;
const PARTICLE_COUNT = 20000;
const DEFAULT_COLOR = new THREE.Color("#999"); 

const LIGHT_THEME_COLORS = [
  new THREE.Color("#ff6ec4"),
  new THREE.Color("#7873f5"),
  new THREE.Color("#50c9c3")
];

const DARK_THEME_COLORS = [
  new THREE.Color("#84fab0"),
  new THREE.Color("#8fd3f4")
];
export function EarthParticles({ completion, preload = false }) {
  const pointsRef = useRef(null);
  const [positions, setPositions] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [particleChangeOrder, setParticleChangeOrder] = useState([]);
  const previousCompletion = useRef(0);
  const [particleColors, setParticleColors] = useState([]);
  const isLoadedRef = useRef(false);
  const time = useRef(0);

  const { theme } = useTheme();
  
  useEffect(() => {
    const image = new Image();
    image.src = "/assets/earth_landmask.png";
    image.crossOrigin = "Anonymous";
    
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx?.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx?.getImageData(0, 0, image.width, image.height).data;
      
      const tempPositions = [];
      const tempColors = new Float32Array(PARTICLE_COUNT * 3);
      const tempSizes = new Float32Array(PARTICLE_COUNT);
      let sampledPixels = 0;
      
      const precomputedColors = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseColor = theme === 'light' ? LIGHT_THEME_COLORS[Math.floor(Math.random() * LIGHT_THEME_COLORS.length)] : DARK_THEME_COLORS[Math.floor(Math.random() * DARK_THEME_COLORS.length)];
        precomputedColors.push(baseColor.clone().multiplyScalar(0.8 + Math.random() * 0.4));
        tempSizes[i] = PARTICLE_SIZE;
      }
      
      setParticleColors(precomputedColors);
      
      for (let i = 0; i < imageData.length; i += 4 * Math.floor(imageData.length / (PARTICLE_COUNT * 4))) {
        const brightness = imageData[i];
        if (brightness > 1) {
          const index = i / 4;
          const x = index % image.width;
          const y = Math.floor(index / image.width);
          const lat = -((y / image.height) - 0.5) * Math.PI;
          const lon = -((x / image.width) - 0.5) * Math.PI * 2;
          const px = EARTH_RADIUS * Math.cos(lat) * Math.cos(lon);
          const py = EARTH_RADIUS * Math.sin(lat);
          const pz = EARTH_RADIUS * Math.cos(lat) * Math.sin(lon);
          tempPositions.push(px, py, pz);
          tempColors[sampledPixels * 3] = DEFAULT_COLOR.r;
          tempColors[sampledPixels * 3 + 1] = DEFAULT_COLOR.g;
          tempColors[sampledPixels * 3 + 2] = DEFAULT_COLOR.b;
          sampledPixels++;
          if (sampledPixels >= PARTICLE_COUNT) break;
        }
      }
      
      const orderIndices = Array.from({ length: PARTICLE_COUNT }, (_, i) => i);
      for (let i = orderIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [orderIndices[i], orderIndices[j]] = [orderIndices[j], orderIndices[i]];
      }
      
      setParticleChangeOrder(orderIndices);
      setPositions(new Float32Array(tempPositions));
      setColors(tempColors);
      setSizes(tempSizes);
      isLoadedRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (!colors || !pointsRef.current || particleColors.length === 0) return;
    
    const colorArray = new Float32Array(colors);
    const sizeArray = new Float32Array(sizes);
    
    const particlesToColor = Math.ceil((completion / 100) * PARTICLE_COUNT);
    const safeParticlesToColor = Math.min(particlesToColor, PARTICLE_COUNT);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particleIndex = particleChangeOrder[i];
      if (i < safeParticlesToColor) {
        const targetColor = particleColors[particleIndex];
        colorArray[particleIndex * 3] = targetColor.r;
        colorArray[particleIndex * 3 + 1] = targetColor.g;
        colorArray[particleIndex * 3 + 2] = targetColor.b;
        sizeArray[particleIndex] = HIGHLIGHTED_PARTICLE_SIZE;
      } else {
        colorArray[particleIndex * 3] = DEFAULT_COLOR.r;
        colorArray[particleIndex * 3 + 1] = DEFAULT_COLOR.g;
        colorArray[particleIndex * 3 + 2] = DEFAULT_COLOR.b;
        sizeArray[particleIndex] = PARTICLE_SIZE;
      }
    }
    
    previousCompletion.current = completion;
    
    if (pointsRef.current.geometry.attributes.color) {
      pointsRef.current.geometry.attributes.color.array = colorArray;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
    
    if (pointsRef.current.geometry.attributes.size) {
      pointsRef.current.geometry.attributes.size.array = sizeArray;
      pointsRef.current.geometry.attributes.size.needsUpdate = true;
    }
  }, [completion, colors, particleChangeOrder, particleColors, sizes]);

  // Rotate the particles around the Earth's axis
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const rotationSpeed = 0.005; // Adjust speed as needed
      pointsRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
    }
  });

  return positions && colors && sizes ? (
    <points ref={pointsRef} rotation={[THREE.MathUtils.degToRad(23.5), 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizes} count={sizes.length} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial 
        size={PARTICLE_SIZE} 
        vertexColors 
        transparent 
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  ) : null;
}


export function ContactModel({ completion, preload = false }) {
  const [isReady, setIsReady] = useState(false);
  
  // Wait for the next frame before showing the animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 50); // Small delay to avoid pop-in effect
    return () => clearTimeout(timeout);
  }, []);

  // If it's preloading mode, render minimal version
  if (preload) {
    return (
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <EarthParticles completion={0} preload={true} />
        </Canvas>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15}}
      animate={isReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 2.5, ease: EASING }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <EarthParticles completion={completion} />
      </Canvas>
    </motion.div>
  );
}