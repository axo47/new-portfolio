import { motion } from "framer-motion";

// 3D Wireframe manifold with neural network-like nodes
export const MathManifoldBackground = () => {
  // Generate points for a Lorenz-like attractor in 2D projection
  const generateManifoldPoints = () => {
    const points: { x: number; y: number; z: number }[] = [];
    let x = 0.1, y = 0, z = 0;
    const sigma = 10, rho = 28, beta = 8/3;
    const dt = 0.005;
    
    for (let i = 0; i < 200; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      x += dx;
      y += dy;
      z += dz;
      points.push({ x: x * 8, y: y * 8, z: z * 4 });
    }
    return points;
  };

  const manifoldPoints = generateManifoldPoints();

  // Node positions for the neural network overlay
  const nodes = [
    { x: 15, y: 20, delay: 0 },
    { x: 25, y: 35, delay: 0.5 },
    { x: 40, y: 15, delay: 1 },
    { x: 55, y: 45, delay: 1.5 },
    { x: 70, y: 25, delay: 2 },
    { x: 85, y: 40, delay: 2.5 },
    { x: 30, y: 60, delay: 0.3 },
    { x: 50, y: 70, delay: 0.8 },
    { x: 65, y: 55, delay: 1.3 },
    { x: 80, y: 75, delay: 1.8 },
    { x: 20, y: 80, delay: 2.3 },
    { x: 45, y: 85, delay: 2.8 },
  ];

  // Connections between nodes
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [0, 6], [6, 7], [7, 8], [8, 9], [9, 5],
    [1, 7], [2, 8], [3, 9],
    [6, 10], [7, 11], [10, 11],
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Radial Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* 3D Manifold SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="-200 -150 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="manifoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(210, 100%, 60%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(210, 100%, 70%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(25, 60%, 55%)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="animate-slow-rotate"
          style={{ transformOrigin: 'center' }}
        >
          {/* Draw the manifold path */}
          <motion.path
            d={`M ${manifoldPoints.map(p => `${p.x},${p.y - p.z * 0.5}`).join(' L ')}`}
            fill="none"
            stroke="url(#manifoldGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </motion.g>
      </svg>

      {/* Neural Network Nodes and Connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(210, 100%, 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(210, 100%, 60%)" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection Lines */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="hsl(210, 100%, 60%)"
            strokeWidth="0.1"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="1.5"
              fill="url(#nodeGlow)"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 0.5, delay: node.delay }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="0.4"
              fill="hsl(210, 100%, 70%)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 3, 
                delay: node.delay,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Floating Mathematical Symbols */}
      <div className="absolute inset-0">
        {['∂', '∫', '∇', 'Σ', 'π', '∞', 'θ', 'λ'].map((symbol, i) => (
          <motion.span
            key={i}
            className="absolute text-primary/10 text-4xl md:text-6xl font-light select-none"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.05, 0.15, 0.05],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity,
              delay: i * 0.5 
            }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
