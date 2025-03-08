import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

const projects = [
  { title: "Neural Vision", description: "AI-powered image recognition system for smart applications." },
  { title: "Quantum Commerce", description: "Next-gen e-commerce platform with predictive analytics." },
  { title: "Horizon OS", description: "Lightweight and secure operating system for IoT devices." },
  { title: "EchoSphere", description: "An immersive 3D sound engine for VR applications." }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const sphereRef = useRef();

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <motion.div 
        className="absolute w-1/2 h-screen flex items-center justify-center"
        animate={{ x: selectedProject ? "-30%" : "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Canvas camera={{ position: [0, 0, 3] }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <mesh ref={sphereRef} onClick={() => handleProjectClick(projects[0])}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="royalblue" wireframe />
          </mesh>
        </Canvas>
      </motion.div>
      {selectedProject && (
        <motion.div 
          className="absolute right-10 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">{selectedProject.title}</h2>
          <p className="mt-2 text-gray-600">{selectedProject.description}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedProject(null)}
          >
            Back to Sphere
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
