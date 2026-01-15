import { motion } from "framer-motion";
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

// Better spaced positions - organized in clear zones
const nodePositions: Record<string, { x: number; y: number }> = {
  // Left side - Math cluster
  math: { x: 22, y: 50 },
  linalg: { x: 8, y: 20 },
  prob: { x: 8, y: 45 },
  calc: { x: 8, y: 70 },
  optim: { x: 22, y: 85 },
  
  // Right side - AI cluster
  ai: { x: 78, y: 50 },
  dl: { x: 92, y: 20 },
  ml: { x: 92, y: 45 },
  cv: { x: 92, y: 70 },
  nlp: { x: 78, y: 85 },
  
  // Center - Overlap/Bridge nodes
  rl: { x: 50, y: 30 },
  xai: { x: 50, y: 70 },
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
          className="glass-card glass-card-shimmer p-6 md:p-10 relative overflow-hidden"
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
          <div className="relative h-[400px] md:h-[500px] select-none">
            {/* SVG for connection lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(28, 65%, 58%)" stopOpacity="1" />
                  <stop offset="50%" stopColor="hsl(280, 65%, 55%)" stopOpacity="1" />
                  <stop offset="100%" stopColor="hsl(210, 100%, 60%)" stopOpacity="1" />
                </linearGradient>
                <filter id="glowLine" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
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
                    stroke={isActive ? "url(#lineGradientActive)" : "hsl(210, 20%, 35%)"}
                    strokeWidth={isActive ? 0.5 : 0.2}
                    strokeOpacity={activeNode ? (isActive ? 1 : 0.2) : 0.5}
                    filter={isActive ? "url(#glowLine)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: mounted ? 1 : 0, 
                      opacity: activeNode ? (isActive ? 1 : 0.2) : 0.5 
                    }}
                    transition={{ 
                      pathLength: { duration: 1.5, delay: i * 0.05 },
                      opacity: { duration: 0.3 }
                    }}
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
                  className="absolute cursor-pointer z-10"
                  style={{ 
                    left: `${pos.x}%`, 
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: mounted ? 1 : 0, 
                    opacity: shouldDim ? 0.35 : 1 
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
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: isCore ? 80 : 60,
                      height: isCore ? 80 : 60,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: `radial-gradient(circle, ${color.glow}30 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: isActive ? 1.5 : 1,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Inner Glowing Core */}
                  <motion.div
                    className="relative rounded-full mx-auto"
                    style={{
                      width: isCore ? 20 : 12,
                      height: isCore ? 20 : 12,
                      background: `radial-gradient(circle, ${color.main} 0%, ${color.main}90 50%, ${color.main}40 100%)`,
                      boxShadow: `0 0 12px ${color.glow}80, 0 0 24px ${color.glow}40`,
                    }}
                    animate={{
                      scale: isActive ? 1.5 : shouldHighlight ? 1.2 : 1,
                      boxShadow: isActive 
                        ? `0 0 20px ${color.glow}, 0 0 40px ${color.glow}80, 0 0 60px ${color.glow}40`
                        : shouldHighlight
                        ? `0 0 15px ${color.glow}80, 0 0 30px ${color.glow}40`
                        : `0 0 12px ${color.glow}80, 0 0 24px ${color.glow}40`,
                    }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  />

                  {/* Label */}
                  <motion.div
                    className={`
                      absolute left-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-center
                      ${isCore ? 'top-full mt-4 text-sm font-semibold' : 'top-full mt-3 text-xs font-medium'}
                    `}
                    style={{
                      transform: 'translateX(-50%)',
                      background: isActive ? 'hsl(222 24% 12% / 0.95)' : 'hsl(222 24% 10% / 0.8)',
                      border: isActive ? '1px solid hsl(210 20% 30%)' : '1px solid transparent',
                      color: shouldHighlight ? 'hsl(0 0% 100%)' : shouldDim ? 'hsl(210 12% 45%)' : 'hsl(210 12% 75%)',
                    }}
                    animate={{
                      opacity: shouldDim ? 0.4 : 1,
                      y: isActive ? 4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {node.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Hint */}
          <motion.p 
            className="text-center text-muted-foreground/80 text-sm mt-8"
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
