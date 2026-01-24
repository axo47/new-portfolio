import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

// Floating mathematical equations
const equations = [
  "∇⋅F = 0",
  "∫ e^(-x²) dx",
  "∂L/∂θ = 0",
  "A = UΣV^T",
  "∑ wᵢxᵢ + b",
  "P(A|B) = P(B|A)P(A)/P(B)",
  "∇f(x) = λ∇g(x)",
  "det(A - λI) = 0",
];

// Parametric Calabi-Yau inspired surface
function generateManifoldPoints(uSegments: number, vSegments: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  
  for (let i = 0; i <= uSegments; i++) {
    for (let j = 0; j <= vSegments; j++) {
      const u = (i / uSegments) * Math.PI * 2;
      const v = (j / vSegments) * Math.PI;
      
      // Calabi-Yau inspired parametric equations
      const r = 1.5 + 0.5 * Math.sin(3 * u) * Math.sin(2 * v);
      const x = r * Math.sin(v) * Math.cos(u);
      const y = r * Math.sin(v) * Math.sin(u) + 0.3 * Math.cos(5 * u);
      const z = r * Math.cos(v) + 0.3 * Math.sin(4 * v);
      
      points.push(new THREE.Vector3(x, y, z));
    }
  }
  
  return points;
}

// Neural network node positions on manifold surface
function getNeuralNodePositions(): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const count = 24;
  
  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 2;
    const v = ((i % 4) / 4) * Math.PI + Math.PI / 4;
    
    const r = 1.5 + 0.5 * Math.sin(3 * u) * Math.sin(2 * v);
    const x = r * Math.sin(v) * Math.cos(u);
    const y = r * Math.sin(v) * Math.sin(u) + 0.3 * Math.cos(5 * u);
    const z = r * Math.cos(v) + 0.3 * Math.sin(4 * v);
    
    positions.push(new THREE.Vector3(x * 1.05, y * 1.05, z * 1.05));
  }
  
  return positions;
}

// Manifold wireframe component
const ManifoldWireframe = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.LineSegments>(null);
  const time = useRef(0);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const uSegments = 32;
    const vSegments = 24;
    const positions: number[] = [];
    
    // Create wireframe lines
    for (let i = 0; i <= uSegments; i++) {
      for (let j = 0; j <= vSegments; j++) {
        const u = (i / uSegments) * Math.PI * 2;
        const v = (j / vSegments) * Math.PI;
        
        const r = 1.5 + 0.5 * Math.sin(3 * u) * Math.sin(2 * v);
        const x = r * Math.sin(v) * Math.cos(u);
        const y = r * Math.sin(v) * Math.sin(u) + 0.3 * Math.cos(5 * u);
        const z = r * Math.cos(v) + 0.3 * Math.sin(4 * v);
        
        // Add lines along u direction
        if (i < uSegments) {
          const nextU = ((i + 1) / uSegments) * Math.PI * 2;
          const nextR = 1.5 + 0.5 * Math.sin(3 * nextU) * Math.sin(2 * v);
          const nextX = nextR * Math.sin(v) * Math.cos(nextU);
          const nextY = nextR * Math.sin(v) * Math.sin(nextU) + 0.3 * Math.cos(5 * nextU);
          const nextZ = nextR * Math.cos(v) + 0.3 * Math.sin(4 * v);
          
          positions.push(x, y, z, nextX, nextY, nextZ);
        }
        
        // Add lines along v direction
        if (j < vSegments) {
          const nextV = ((j + 1) / vSegments) * Math.PI;
          const nextR = 1.5 + 0.5 * Math.sin(3 * u) * Math.sin(2 * nextV);
          const nextX = nextR * Math.sin(nextV) * Math.cos(u);
          const nextY = nextR * Math.sin(nextV) * Math.sin(u) + 0.3 * Math.cos(5 * u);
          const nextZ = nextR * Math.cos(nextV) + 0.3 * Math.sin(4 * nextV);
          
          positions.push(x, y, z, nextX, nextY, nextZ);
        }
      }
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      time.current += delta;
      const speed = isHovered ? 0.3 : 0.05;
      meshRef.current.rotation.y = time.current * speed;
      meshRef.current.rotation.x = Math.sin(time.current * 0.1) * 0.1;
    }
  });
  
  return (
    <lineSegments ref={meshRef} geometry={geometry}>
      <lineBasicMaterial 
        color={isHovered ? "#d4a574" : "#8b7355"} 
        transparent 
        opacity={isHovered ? 0.8 : 0.4}
        linewidth={1}
      />
    </lineSegments>
  );
};

// Neural network connections (separate component)
const NeuralConnections = ({ positions, isHovered }: { positions: THREE.Vector3[]; isHovered: boolean }) => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const linePositions: number[] = [];
    
    positions.forEach((pos, i) => {
      const connections = positions
        .map((p, j) => ({ pos: p, dist: pos.distanceTo(p), index: j }))
        .filter(p => p.index !== i && p.dist < 1.2)
        .slice(0, 3);
      
      connections.forEach(conn => {
        linePositions.push(pos.x, pos.y, pos.z);
        linePositions.push(conn.pos.x, conn.pos.y, conn.pos.z);
      });
    });
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    return geo;
  }, [positions]);
  
  useFrame((state, delta) => {
    if (linesRef.current) {
      const speed = isHovered ? 0.3 : 0.05;
      linesRef.current.rotation.y += delta * speed;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial 
        color={isHovered ? "#60a5fa" : "#3b82f6"} 
        transparent 
        opacity={isHovered ? 0.6 : 0.2}
      />
    </lineSegments>
  );
};

// Neural network nodes
const NeuralNodes = ({ isHovered }: { isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => getNeuralNodePositions(), []);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = isHovered ? 0.3 : 0.05;
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial 
            color={isHovered ? "#60a5fa" : "#3b82f6"}
            transparent
            opacity={isHovered ? 1 : 0.7}
          />
        </mesh>
      ))}
      
      {/* Neural connections as line segments */}
      <NeuralConnections positions={positions} isHovered={isHovered} />
    </group>
  );
};

// Floating equation component
const FloatingEquation = ({ 
  equation, 
  position, 
  isHovered 
}: { 
  equation: string; 
  position: [number, number, number]; 
  isHovered: boolean;
}) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <Html
          center
          style={{
            color: isHovered ? '#f5deb3' : '#8b7355',
            fontSize: '14px',
            fontFamily: 'serif',
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            opacity: isHovered ? 1 : 0.5,
            textShadow: isHovered ? '0 0 10px rgba(212, 165, 116, 0.5)' : 'none',
            transition: 'all 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          {equation}
        </Html>
      </group>
    </Float>
  );
};

// Data flow particles
const DataFlowParticles = ({ isHovered }: { isHovered: boolean }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.5 + Math.random() * 0.5;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);
  
  useFrame((state, delta) => {
    if (particlesRef.current) {
      const speed = isHovered ? 0.5 : 0.1;
      particlesRef.current.rotation.y += delta * speed;
      
      // Animate particles along the surface
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const x = posArray[idx];
        const y = posArray[idx + 1];
        const z = posArray[idx + 2];
        
        const angle = Math.atan2(y, x) + delta * (isHovered ? 2 : 0.3);
        const r = Math.sqrt(x * x + y * y);
        
        posArray[idx] = r * Math.cos(angle);
        posArray[idx + 1] = r * Math.sin(angle);
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={isHovered ? "#60a5fa" : "#3b82f6"}
        transparent
        opacity={isHovered ? 0.8 : 0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Main scene component
const NexusScene = ({ isHovered }: { isHovered: boolean }) => {
  const equationPositions: [number, number, number][] = useMemo(() => [
    [-2.5, 1.8, 0],
    [2.8, 1.5, -0.5],
    [-2.2, -1.2, 0.8],
    [2.5, -1.5, 0.3],
    [0, 2.5, -1],
    [-2.8, 0.3, 1],
    [2.2, 0.5, 1.2],
    [0.5, -2.3, -0.5],
  ], []);
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#d4a574" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#60a5fa" />
      
      <ManifoldWireframe isHovered={isHovered} />
      <NeuralNodes isHovered={isHovered} />
      <DataFlowParticles isHovered={isHovered} />
      
      {equations.map((eq, i) => (
        <FloatingEquation
          key={i}
          equation={eq}
          position={equationPositions[i]}
          isHovered={isHovered}
        />
      ))}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={!isHovered}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </>
  );
};

export const MathAINexus = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section id="skills" className="relative z-10 py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h2 className="section-heading mb-4">
            <span className="text-accent">The Math & AI Nexus</span>
          </h2>
          <p className="section-subheading mx-auto">
            Foundations of Intelligence — Where Mathematical Rigor Meets Neural Architecture
          </p>
        </motion.div>

        {/* 3D Visualization Card */}
        <motion.div
          className="glass-card glass-card-shimmer p-4 md:p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full transition-all duration-1000"
              style={{
                background: isHovered 
                  ? 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(212, 165, 116, 0.08) 50%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, rgba(212, 165, 116, 0.03) 50%, transparent 70%)',
              }}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-8 mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ 
                  background: 'linear-gradient(135deg, #d4a574 0%, #8b7355 100%)',
                  boxShadow: '0 0 12px rgba(212, 165, 116, 0.6)'
                }} 
              />
              <span className="text-sm text-muted-foreground">Mathematical Manifold</span>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ 
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  boxShadow: '0 0 12px rgba(96, 165, 250, 0.6)'
                }} 
              />
              <span className="text-sm text-muted-foreground">Neural Network</span>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="h-[450px] md:h-[550px] w-full relative">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              style={{ background: 'transparent' }}
            >
              <NexusScene isHovered={isHovered} />
            </Canvas>
          </div>

          {/* Interaction hint */}
          <motion.p 
            className="text-center text-muted-foreground/80 text-sm mt-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {isHovered 
              ? "✨ Energized — Watch the neural flows accelerate"
              : "Hover to energize the mathematical-neural synthesis"
            }
          </motion.p>
        </motion.div>

        {/* Key Concepts */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            {
              title: "Topological Foundations",
              description: "Manifold learning, differential geometry, and the mathematical structures underlying deep representations.",
              color: "text-accent"
            },
            {
              title: "Neural Architecture",
              description: "Deep neural networks mapped onto mathematical spaces, with nodes at geometric key points.",
              color: "text-primary"
            },
            {
              title: "Dynamic Synthesis",
              description: "The flow of information through networks, optimized by gradient-based methods on curved spaces.",
              color: "text-tertiary"
            }
          ].map((concept, i) => (
            <motion.div
              key={concept.title}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <h3 className={`text-lg font-semibold mb-3 ${concept.color}`}>{concept.title}</h3>
              <p className="text-sm text-muted-foreground">{concept.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
