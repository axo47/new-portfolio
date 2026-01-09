import { motion } from "framer-motion";
import { useState } from "react";

interface SkillNode {
  id: string;
  label: string;
  category: "math" | "ai" | "overlap";
  x: number;
  y: number;
  connections: string[];
}

const skillNodes: SkillNode[] = [
  // Core Nodes
  { id: "math", label: "Mathematics", category: "math", x: 25, y: 50, connections: ["linalg", "prob", "calc", "optim"] },
  { id: "ai", label: "Artificial Intelligence", category: "ai", x: 75, y: 50, connections: ["dl", "ml", "cv", "nlp"] },
  
  // Math Nodes
  { id: "linalg", label: "Linear Algebra", category: "math", x: 15, y: 25, connections: ["dl"] },
  { id: "prob", label: "Probability Theory", category: "math", x: 10, y: 55, connections: ["ml", "rl"] },
  { id: "calc", label: "Stochastic Calculus", category: "math", x: 15, y: 75, connections: ["rl"] },
  { id: "optim", label: "Optimization", category: "math", x: 30, y: 85, connections: ["dl", "ml"] },
  
  // AI Nodes
  { id: "dl", label: "Deep Learning", category: "ai", x: 85, y: 25, connections: [] },
  { id: "ml", label: "Machine Learning", category: "ai", x: 90, y: 55, connections: [] },
  { id: "cv", label: "Computer Vision", category: "ai", x: 85, y: 75, connections: [] },
  { id: "nlp", label: "NLP", category: "ai", x: 70, y: 85, connections: [] },
  
  // Overlap Nodes
  { id: "rl", label: "Reinforcement Learning", category: "overlap", x: 50, y: 30, connections: ["ai"] },
  { id: "xai", label: "Explainable AI", category: "overlap", x: 50, y: 70, connections: ["ai"] },
];

export const KnowledgeGraph = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const getNodeColor = (category: string, isActive: boolean) => {
    if (isActive) return "hsl(210, 100%, 60%)";
    switch (category) {
      case "math": return "hsl(25, 60%, 55%)";
      case "ai": return "hsl(210, 100%, 60%)";
      case "overlap": return "hsl(280, 60%, 55%)";
      default: return "hsl(210, 20%, 50%)";
    }
  };

  const isConnected = (nodeId: string) => {
    if (!activeNode) return false;
    const active = skillNodes.find(n => n.id === activeNode);
    return active?.connections.includes(nodeId) || 
           skillNodes.find(n => n.id === nodeId)?.connections.includes(activeNode);
  };

  return (
    <section id="skills" className="relative z-10 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading gradient-text mb-4">Knowledge Graph</h2>
          <p className="section-subheading mx-auto">
            Explore the interconnected domains where Mathematics and AI converge
          </p>
        </motion.div>

        {/* Graph Card */}
        <motion.div
          className="glass-card p-6 md:p-10 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Mathematics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Artificial Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(280, 60%, 55%)" }} />
              <span className="text-sm text-muted-foreground">Interdisciplinary</span>
            </div>
          </div>

          {/* Graph SVG */}
          <div className="relative aspect-[16/9] md:aspect-[2/1]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Connection Lines */}
              {skillNodes.map(node => 
                node.connections.map(targetId => {
                  const target = skillNodes.find(n => n.id === targetId);
                  if (!target) return null;
                  const isHighlighted = activeNode === node.id || activeNode === targetId;
                  return (
                    <motion.line
                      key={`${node.id}-${targetId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isHighlighted ? "hsl(210, 100%, 60%)" : "hsl(210, 20%, 30%)"}
                      strokeWidth={isHighlighted ? "0.4" : "0.2"}
                      strokeOpacity={isHighlighted ? 1 : 0.5}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  );
                })
              )}
            </svg>

            {/* Nodes */}
            {skillNodes.map((node, i) => {
              const isActive = activeNode === node.id;
              const connected = isConnected(node.id);
              const isCoreNode = node.id === "math" || node.id === "ai";
              
              return (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  {/* Node Circle */}
                  <motion.div
                    className={`
                      ${isCoreNode ? 'w-16 h-16 md:w-20 md:h-20' : 'w-10 h-10 md:w-14 md:h-14'} 
                      rounded-full flex items-center justify-center
                      transition-all duration-300
                    `}
                    style={{
                      background: `radial-gradient(circle, ${getNodeColor(node.category, isActive || connected)} 0%, transparent 70%)`,
                      boxShadow: isActive ? `0 0 30px ${getNodeColor(node.category, true)}` : 'none',
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div 
                      className={`
                        ${isCoreNode ? 'w-8 h-8 md:w-10 md:h-10' : 'w-5 h-5 md:w-7 md:h-7'}
                        rounded-full
                      `}
                      style={{ background: getNodeColor(node.category, isActive || connected) }}
                    />
                  </motion.div>
                  
                  {/* Label */}
                  <motion.div
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 mt-2
                      px-2 py-1 rounded-md text-center whitespace-nowrap
                      ${isCoreNode ? 'text-xs md:text-sm font-semibold' : 'text-[10px] md:text-xs'}
                      ${isActive ? 'bg-card text-foreground' : 'text-muted-foreground'}
                    `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive || isCoreNode ? 1 : 0.7 }}
                  >
                    {node.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Hint */}
          <p className="text-center text-muted-foreground text-sm mt-8">
            Hover over nodes to explore connections
          </p>
        </motion.div>
      </div>
    </section>
  );
};
