import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
import { useTheme } from '../context/ThemeContext'; // Adjust import path as needed

const waveEffects = {
  hero: { speed: 0.02, maxSpeed: 0.04, scale: 0.5, noiseStrength: 1.8, position: [0, -1, 0], rotation: [-Math.PI / 4, 0, -0.5] },
  "cta-0": { speed: 0.02, maxSpeed: 0.02, scale:1.125, noiseStrength: 1.2, position: [0, 0, 0], rotation: [0.1, -1.2, 0] },
  "cta-1": { speed: 0.03, maxSpeed: 0.03, scale: 0.67, noiseStrength: 1.4, position: [-2, -2.5, 0], rotation: [-1, -2.2, 1] },
  "cta-2": {speed: 0.02, maxSpeed: 0.02, scale: 1.125, noiseStrength: 1.2, position: [0, 0, 0], rotation: [0.1, -1.2, 0]  },
  "cta-3": { speed: 0.03, maxSpeed: 0.03, scale: 0.67, noiseStrength: 1.4, position: [-2, -2.5, 0], rotation: [-1, -2.25, 0] },
  portfolio: { speed: 0.01, maxSpeed: 0.02, scale: 0.5, noiseStrength: 1.2, position: [0, 0, 0], rotation: [-5, 0, 0] },
  services: { speed: 0.02, maxSpeed: 0.3, scale: 1, noiseStrength: 1.2, position: [0, 0, 0], rotation: [Math.PI / 2, 0, -Math.PI / 2] },
  footer: { 
    speed: 0.04, 
    maxSpeed: 0.4, 
    scale: 2.1, 
    noiseStrength: 2, 
    position: [0, 0, 0], 
    rotation: [5, -3, -4], 
    pulseEnabled: true, 
    colorEffects: true,
    baseSize: 0.085,
    maxSize: 0.1
  },
};

// Define gradient color palette for footer effect
const gradientColors = [
  new THREE.Color("#ff2299").convertSRGBToLinear(), // Modern THREE.js uses this instead of multiplyScalar
  new THREE.Color("#00eeff").convertSRGBToLinear(),
  new THREE.Color("#cc22ff").convertSRGBToLinear(),
  new THREE.Color("#ff6622").convertSRGBToLinear(),
];

const gradientColorsDark = [
  new THREE.Color("#84fab0").convertSRGBToLinear(), // Modern THREE.js uses this instead of multiplyScalar
  new THREE.Color("#8fd3f4").convertSRGBToLinear(),
]

// Custom particle texture for better glow effect
const createParticleTexture = () => {
  const canvas = document.createElement('canvas');
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  const texture = new THREE.CanvasTexture(canvas);
  // Modern THREE.js uses these properties instead of sRGBEncoding
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const ParticleWave = ({ isMenuOpen, activeEffect, progress, isWaveOn }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const simplex = new SimplexNoise();
  const time = useRef(0);
  const colorMap = useRef(new Map());
  const particleTexture = useRef(null);

  const { theme } = useTheme();
  
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [opacity, setOpacity] = useState(1);
  const [particleColors, setParticleColors] = useState(null);
  const isFooter = activeEffect === 'footer';

  // Set up the target and current position/rotation
  const targetPosition = new THREE.Vector3(...waveEffects[activeEffect]?.position);
  const currentPosition = useRef(new THREE.Vector3(...waveEffects[activeEffect]?.position));

  const targetRotation = new THREE.Euler(...waveEffects[activeEffect]?.rotation);
  const currentRotation = useRef(new THREE.Euler(...waveEffects[activeEffect]?.rotation));

  // Create particle texture on first render
  useEffect(() => {
    particleTexture.current = createParticleTexture();
  }, []);

  // Window resize effect
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize particle colors
  useEffect(() => {
    if (meshRef.current && isFooter) {
      const count = meshRef.current.geometry.attributes.position.count;
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const c = theme === 'light' ? gradientColors : gradientColorsDark;
      
      for (let i = 0; i < count; i++) {
        const colorIndex = Math.floor(Math.random() * c.length);
        const color = c[colorIndex];
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        const sizeVariation = 0.7 + Math.random() * 0.6;
        sizes[i] = waveEffects.footer.baseSize * sizeVariation;
        
        colorMap.current.set(i, {
          baseColor: colorIndex,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 1.7,
          sizeMultiplier: 0.8 + Math.random() * 0.4
        });
      }
      
      setParticleColors(colors);
      
      if (meshRef.current.geometry.attributes.color === undefined) {
        meshRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      }
      
      if (meshRef.current.geometry.attributes.size === undefined) {
        meshRef.current.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      }
    }
  }, [isFooter, meshRef.current]);

  // Main animation loop
  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current || isMenuOpen || !isWaveOn) return;

    const { speed, maxSpeed, noiseStrength, pulseEnabled, colorEffects, baseSize, maxSize } = waveEffects[activeEffect];

    // Adjust animation speed based on progress
    const progressFactor = Math.min(1, Math.max(0, progress / 100));
    const waveSpeed = speed + progressFactor * (maxSpeed - speed);

    time.current = clock.getElapsedTime();
    const elapsedTime = time.current * waveSpeed;
    const pos = meshRef.current.geometry.attributes.position;

    // Animate wave
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      let z = noiseStrength * simplex.noise3d(x * 0.22, y * 0.22, elapsedTime);
      
      if (isFooter && pulseEnabled) {
        const particleData = colorMap.current.get(i) || { phase: 0, pulseSpeed: 1 };
        const pulseFactor = Math.sin(time.current * particleData.pulseSpeed + particleData.phase) * 0.5;
        z += pulseFactor * progressFactor;
      }
      
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;

    // Smoothly interpolate position and rotation
    currentPosition.current.lerp(targetPosition, 0.04);
    currentRotation.current.x += (targetRotation.x - currentRotation.current.x) * 0.07;
    currentRotation.current.y += (targetRotation.y - currentRotation.current.y) * 0.07;
    currentRotation.current.z += (targetRotation.z - currentRotation.current.z) * 0.07;

    meshRef.current.position.copy(currentPosition.current);
    meshRef.current.rotation.set(currentRotation.current.x, currentRotation.current.y, currentRotation.current.z);

    // Color and size animation for footer effect
    if (isFooter && colorEffects && particleColors && meshRef.current.geometry.attributes.color) {
      const colors = meshRef.current.geometry.attributes.color.array;
      const sizes = meshRef.current.geometry.attributes.size?.array;
      
      for (let i = 0; i < pos.count; i++) {
        const particleData = colorMap.current.get(i);
        if (!particleData) continue;

        const c = theme === 'light' ? gradientColors : gradientColorsDark;
        
        const baseColor = c[particleData.baseColor];
        const brightness = 0.8 + 0.7 * Math.sin(time.current * particleData.pulseSpeed + particleData.phase);
        
        const nextColorIndex = (particleData.baseColor + 1) % c.length;
        const nextColor = c[nextColorIndex];
        
        const transitionFactor = (Math.sin(time.current * 0.2 + particleData.phase) + 1) * 0.5;
        
        const color = new THREE.Color().copy(baseColor).lerp(nextColor, transitionFactor);
        
        if (progressFactor > 0.7) {
          // Use modern THREE.js color manipulation
          const adjustedColor = color.clone().multiplyScalar(0.8 + brightness * 0.5);
          colors[i * 3] = adjustedColor.r;
          colors[i * 3 + 1] = adjustedColor.g;
          colors[i * 3 + 2] = adjustedColor.b;
        } else {
          const adjustedColor = color.clone().multiplyScalar(0.9 + brightness * 0.3);
          colors[i * 3] = adjustedColor.r;
          colors[i * 3 + 1] = adjustedColor.g;
          colors[i * 3 + 2] = adjustedColor.b;
        }
        
        if (sizes) {
          const sizePulse = baseSize * particleData.sizeMultiplier * 
                          (1 + Math.sin(time.current * particleData.pulseSpeed * 0.8 + particleData.phase) * 0.5);
          
          const finalSize = baseSize + (sizePulse * progressFactor);
          sizes[i] = Math.min(finalSize, maxSize);
        }
      }
      
      meshRef.current.geometry.attributes.color.needsUpdate = true;
      if (meshRef.current.geometry.attributes.size) {
        meshRef.current.geometry.attributes.size.needsUpdate = true;
      }
    } else {
      // Standard color transition based on progress
      const colorStart = new THREE.Color(theme === 'light' ? '#333' : "#ccc");
      const colorEnd = new THREE.Color("#ff0077");
      const newColor = colorStart.clone().lerp(colorEnd, progressFactor);
      materialRef.current.color.set(newColor);
      
      materialRef.current.size = isFooter ? baseSize : 0.02;
      materialRef.current.needsUpdate = true;
    }
  });

  const particleSize = isFooter ? waveEffects.footer.baseSize : 0.02;
  
  return (
    <points ref={meshRef} scale={waveEffects[activeEffect].scale}>
      <planeGeometry args={[size.width / 100, size.height / 100, 100, 100]} />
      <pointsMaterial 
        ref={materialRef} 
        size={particleSize} 
        transparent 
        opacity={opacity} 
        vertexColors={isFooter} 
        blending={isFooter ? THREE.AdditiveBlending : THREE.NormalBlending}
        map={particleTexture.current}
        alphaTest={0.01}
        sizeAttenuation={true}
      />
    </points>
  );
};

const BackgroundWave = ({ isMenuOpen, activeEffect, progress, isWaveOn }) => {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 30 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <ParticleWave isMenuOpen={isMenuOpen} activeEffect={activeEffect} progress={progress} isWaveOn={isWaveOn} />
      {/* Removed postprocessing effects */}
    </Canvas>
  );
};

export default BackgroundWave;
