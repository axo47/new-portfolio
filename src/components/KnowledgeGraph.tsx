import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";

interface SkillNode {
  id: string;
  label: string;
  category: "math" | "ai" | "overlap";
  connections: string[];
}

const skillNodesData: SkillNode[] = [
  // Core Nodes
  { id: "math", label: "Mathematics", category: "math", connections: ["linalg", "prob", "calc", "optim"] },
  { id: "ai", label: "Artificial Intelligence", category: "ai", connections: ["dl", "ml", "cv", "nlp"] },
  
  // Math Nodes
  { id: "linalg", label: "Linear Algebra", category: "math", connections: ["dl"] },
  { id: "prob", label: "Probability Theory", category: "math", connections: ["ml", "rl"] },
  { id: "calc", label: "Stochastic Calculus", category: "math", connections: ["rl"] },
  { id: "optim", label: "Optimization", category: "math", connections: ["dl", "ml"] },
  
  // AI Nodes
  { id: "dl", label: "Deep Learning", category: "ai", connections: [] },
  { id: "ml", label: "Machine Learning", category: "ai", connections: [] },
  { id: "cv", label: "Computer Vision", category: "ai", connections: [] },
  { id: "nlp", label: "NLP", category: "ai", connections: [] },
  
  // Overlap Nodes
  { id: "rl", label: "Reinforcement Learning", category: "overlap", connections: ["ai"] },
  { id: "xai", label: "Explainable AI", category: "overlap", connections: ["ai"] },
];

// Force-directed layout positions (pre-calculated for elegance)
const nodePositions: Record<string, { x: number; y: number }> = {
  math: { x: 18, y: 50 },
  ai: { x: 82, y: 50 },
  linalg: { x: 12, y: 22 },
  prob: { x: 8, y: 50 },
  calc: { x: 12, y: 78 },
  optim: { x: 28, y: 82 },
  dl: { x: 88, y: 22 },
  ml: { x: 92, y: 50 },
  cv: { x: 88, y: 78 },
  nlp: { x: 72, y: 85 },
  rl: { x: 50, y: 28 },
  xai: { x: 50, y: 72 },
};

const getNodeColor = (category: string) => {
  switch (category) {
    case "math": return { main: "hsl(28, 65%, 58%)", glow: "hsl(28, 65%, 58%)" };
    case "ai": return { main: "hsl(210, 100%, 60%)", glow: "hsl(210, 100%, 60%)" };
    case "overlap": return { main: "hsl(280, 65%, 55%)", glow: "hsl(280, 65%, 55%)" };
    default: return { main: "hsl(210, 20%, 50%)", glow: "hsl(210, 20%, 50%)" };
  }
};

export const KnowledgeGraph = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAllConnections = useCallback((nodeId: string): Set<string> => {
    const connections = new Set<string>();
    const node = skillNodesData.find(n => n.id === nodeId);
    if (!node) return connections;
    
    // Add direct connections
    node.connections.forEach(c => connections.add(c));
    
    // Add nodes that connect TO this node
    skillNodesData.forEach(n => {
      if (n.connections.includes(nodeId)) {
        connections.add(n.id);
      }
    });
    
    return connections;
  }, []);

  const isConnectedToActive = useCallback((nodeId: string): boolean => {
    if (!activeNode) return false;
    if (nodeId === activeNode) return true;
    return getAllConnections(activeNode).has(nodeId);
  }, [activeNode, getAllConnections]);

  const isLineActive = useCallback((fromId: string, toId: string): boolean => {
    if (!activeNode) return false;
    return (fromId === activeNode || toId === activeNode) && 
           (getAllConnections(activeNode).has(fromId) || getAllConnections(activeNode).has(toId) || fromId === activeNode || toId === activeNode);
  }, [activeNode, getAllConnections]);

  // Generate all connection lines
  const connectionLines = useMemo(() => {
    const lines: Array<{ from: string; to: string; x1: number; y1: number; x2: number; y2: number }> = [];
    skillNodesData.forEach(node => {
      node.connections.forEach(targetId => {
        const fromPos = nodePositions[node.id];
        const toPos = nodePositions[targetId];
        if (fromPos && toPos) {
          lines.push({
            from: node.id,
            to: targetId,
            x1: fromPos.x,
            y1: fromPos.y,
            x2: toPos.x,
            y2: toPos.y,
          });
        }
      });
    });
    return lines;
  }, []);

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
          <h2 className="section-heading gradient-text mb-4">Dynamic Constellation</h2>
          <p className="section-subheading mx-auto">
            Explore the interconnected domains where Mathematics and AI converge
          </p>
        </motion.div>

        {/* Graph Card */}
        <motion.div
          className="glass-card glass-card-shimmer p-6 md:p-10 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { color: "bg-accent", label: "Mathematics" },
              { color: "bg-primary", label: "Artificial Intelligence" },
              { color: "bg-tertiary", label: "Interdisciplinary" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${item.color}`} 
                     style={{ boxShadow: `0 0 12px currentColor` }} />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Graph Container */}
          <div className="relative aspect-[16/10] md:aspect-[2/1] select-none">
            {/* SVG for connection lines */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(28, 65%, 58%)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="hsl(280, 65%, 55%)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(210, 100%, 60%)" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Connection Lines */}
              {connectionLines.map(({ from, to, x1, y1, x2, y2 }, i) => {
                const isActive = isLineActive(from, to);
                return (
                  <motion.line
                    key={`${from}-${to}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isActive ? "url(#lineGradientActive)" : "hsl(210, 20%, 25%)"}
                    strokeWidth={isActive ? 0.6 : 0.25}
                    strokeOpacity={activeNode ? (isActive ? 1 : 0.15) : 0.4}
                    filter={isActive ? "url(#glow)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: mounted ? 1 : 0, 
                      opacity: activeNode ? (isActive ? 1 : 0.15) : 0.4 
                    }}
                    transition={{ 
                      pathLength: { duration: 1.5, delay: i * 0.05 },
                      opacity: { duration: 0.3 }
                    }}
                    className={!isActive && !activeNode ? "animate-pulse-thread" : ""}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {skillNodesData.map((node, i) => {
              const pos = nodePositions[node.id];
              const color = getNodeColor(node.category);
              const isCore = node.id === "math" || node.id === "ai";
              const isActive = activeNode === node.id;
              const isConnected = isConnectedToActive(node.id);
              const shouldHighlight = isActive || (activeNode && isConnected);
              const shouldDim = activeNode && !isConnected && !isActive;
              
              return (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: mounted ? 1 : 0, 
                    opacity: shouldDim ? 0.3 : 1 
                  }}
                  transition={{ 
                    scale: { delay: i * 0.05 + 0.5, duration: 0.5, type: "spring", stiffness: 200 },
                    opacity: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: isCore ? 70 : 50,
                      height: isCore ? 70 : 50,
                      left: '50%',
                      top: '50%',
                      x: '-50%',
                      y: '-50%',
                      background: `radial-gradient(circle, ${color.glow}40 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Inner Glowing Core */}
                  <motion.div
                    className={`relative rounded-full ${
                      node.category === 'math' ? 'node-glow-copper' :
                      node.category === 'ai' ? 'node-glow-blue' : 'node-glow-purple'
                    }`}
                    style={{
                      width: isCore ? 24 : 14,
                      height: isCore ? 24 : 14,
                      background: `radial-gradient(circle, ${color.main} 0%, ${color.main}90 50%, ${color.main}40 100%)`,
                    }}
                    animate={{
                      scale: isActive ? 1.4 : shouldHighlight ? 1.15 : 1,
                      boxShadow: isActive 
                        ? `0 0 20px ${color.glow}, 0 0 40px ${color.glow}80, 0 0 60px ${color.glow}40`
                        : shouldHighlight
                        ? `0 0 15px ${color.glow}80, 0 0 30px ${color.glow}40`
                        : `0 0 10px ${color.glow}60, 0 0 20px ${color.glow}30`,
                    }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  />

                  {/* Label */}
                  <motion.div
                    className={`
                      absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg
                      ${isCore ? 'top-full mt-3 text-xs md:text-sm font-semibold' : 'top-full mt-2 text-[10px] md:text-xs'}
                      transition-all duration-300
                    `}
                    style={{
                      background: isActive ? 'hsl(222 24% 16% / 0.95)' : 'transparent',
                      color: shouldHighlight ? 'hsl(210 20% 95%)' : 'hsl(210 12% 55%)',
                      fontWeight: isActive ? 600 : isCore ? 500 : 400,
                    }}
                    animate={{
                      opacity: shouldDim ? 0.3 : (isActive || isCore ? 1 : 0.8),
                      y: isActive ? 2 : 0,
                    }}
                  >
                    {node.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Hint */}
          <motion.p 
            className="text-center text-muted-foreground text-sm mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Hover over nodes to explore connections
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
