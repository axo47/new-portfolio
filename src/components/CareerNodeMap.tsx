import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CareerNode {
  id: string;
  label: string;
  title: string;
  description: string;
  period: string;
  skills: string[];
  x: number;
  y: number;
}

const CAREER_NODES: CareerNode[] = [
  {
    id: "propolys",
    label: "PROPOLYS",
    title: "PROPOLYS MEDTECH",
    description: "Entrepreneurship program focused on medical technology innovation and startup development.",
    period: "2023",
    skills: ["Business Strategy", "MedTech", "Innovation"],
    x: 15,
    y: 25,
  },
  {
    id: "log2420",
    label: "LOG2420",
    title: "LOG2420 TA",
    description: "Teaching Assistant for UI/UX Design course. Mentored students in user-centered design principles.",
    period: "2023-2024",
    skills: ["UI/UX", "Teaching", "Figma"],
    x: 35,
    y: 55,
  },
  {
    id: "gdg",
    label: "GDG",
    title: "GDG VP-PROJECT",
    description: "Vice President of Projects at Google Developer Group. Led technical workshops and community events.",
    period: "2023-2024",
    skills: ["Leadership", "Workshops", "Community"],
    x: 55,
    y: 20,
  },
  {
    id: "lincs",
    label: "LINCS",
    title: "LINCS LAB",
    description: "Research on Edge-LLM Optimization and Agentic AI systems. Working on distributed AI inference.",
    period: "2024-Present",
    skills: ["LLM", "Edge Computing", "Agentic AI"],
    x: 75,
    y: 50,
  },
  {
    id: "axians",
    label: "AXIANS",
    title: "AXIANS CANADA",
    description: "Junior Developer building enterprise solutions with NestJS and Azure cloud infrastructure.",
    period: "2024",
    skills: ["NestJS", "Azure", "TypeScript"],
    x: 45,
    y: 75,
  },
  {
    id: "chum",
    label: "CHUM",
    title: "CHUM RESEARCH",
    description: "AI research for breast cancer prediction using machine learning and medical imaging analysis.",
    period: "2024-Present",
    skills: ["PyTorch", "Medical AI", "Research"],
    x: 85,
    y: 80,
  },
];

// Define connections between nodes
const CONNECTIONS = [
  ["propolys", "log2420"],
  ["log2420", "gdg"],
  ["gdg", "lincs"],
  ["log2420", "axians"],
  ["axians", "chum"],
  ["lincs", "chum"],
  ["propolys", "gdg"],
];

export function CareerNodeMap() {
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getNodePosition = (node: CareerNode) => ({
    left: `${node.x}%`,
    top: `${node.y}%`,
  });

  const getLineCoordinates = (fromId: string, toId: string) => {
    const from = CAREER_NODES.find((n) => n.id === fromId);
    const to = CAREER_NODES.find((n) => n.id === toId);
    if (!from || !to) return null;
    return {
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
    };
  };

  return (
    <section className="relative py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-xs text-muted-foreground mb-2">
            [SECTION: CAREER_TRAJECTORY]
          </div>
          <h2 className="font-mono text-2xl md:text-3xl text-primary text-glow mb-4">
            EXPERIENCE NODE MAP
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-2xl mx-auto">
            Interactive knowledge graph of career milestones. Click nodes to expand details.
          </p>
        </motion.div>

        {/* Node Map Container */}
        <motion.div
          ref={containerRef}
          className="blueprint-container relative h-[400px] md:h-[500px] overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Corner Markers */}
          <span className="absolute -top-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
          <span className="absolute -top-2 -right-1 text-xs text-muted-foreground font-mono">+</span>
          <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
          <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono">+</span>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {CONNECTIONS.map(([fromId, toId], index) => {
              const coords = getLineCoordinates(fromId, toId);
              if (!coords) return null;
              const isHighlighted =
                hoveredNode === fromId ||
                hoveredNode === toId ||
                selectedNode?.id === fromId ||
                selectedNode?.id === toId;
              return (
                <motion.line
                  key={index}
                  x1={`${coords.x1}%`}
                  y1={`${coords.y1}%`}
                  x2={`${coords.x2}%`}
                  y2={`${coords.y2}%`}
                  stroke="currentColor"
                  strokeWidth={isHighlighted ? 2 : 1}
                  className={`${
                    isHighlighted ? "text-primary" : "text-border"
                  } transition-colors duration-300`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              );
            })}

            {/* Data flow particles on connections */}
            {CONNECTIONS.map(([fromId, toId], index) => {
              const coords = getLineCoordinates(fromId, toId);
              if (!coords) return null;
              return (
                <motion.circle
                  key={`particle-${index}`}
                  r="3"
                  fill="currentColor"
                  className="text-primary"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    cx: [`${coords.x1}%`, `${coords.x2}%`],
                    cy: [`${coords.y1}%`, `${coords.y2}%`],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {CAREER_NODES.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={getNodePosition(node)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
            >
              {/* Node Circle */}
              <motion.div
                className={`relative w-12 h-12 md:w-16 md:h-16 border-2 flex items-center justify-center transition-all duration-300 ${
                  selectedNode?.id === node.id || hoveredNode === node.id
                    ? "border-primary bg-primary/20 shadow-glow"
                    : "border-border bg-background/80 hover:border-primary/50"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Inner dot */}
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
                    selectedNode?.id === node.id || hoveredNode === node.id
                      ? "bg-primary"
                      : "bg-border"
                  }`}
                />
                
                {/* Corner brackets */}
                <span className="absolute -top-1 -left-1 text-[8px] text-primary font-mono">[</span>
                <span className="absolute -top-1 -right-1 text-[8px] text-primary font-mono">]</span>
                <span className="absolute -bottom-1 -left-1 text-[8px] text-primary font-mono">[</span>
                <span className="absolute -bottom-1 -right-1 text-[8px] text-primary font-mono">]</span>
              </motion.div>

              {/* Node Label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-2 font-mono text-[10px] md:text-xs whitespace-nowrap transition-colors duration-300 ${
                  selectedNode?.id === node.id || hoveredNode === node.id
                    ? "text-primary text-glow"
                    : "text-muted-foreground"
                }`}
              >
                [{node.label}]
              </div>
            </motion.div>
          ))}

          {/* Selected Node Data Window */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 blueprint-container p-4 bg-background/95 backdrop-blur-sm z-10"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 20 }}
              >
                {/* Window Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                  <span className="font-mono text-xs text-primary text-glow">
                    [DATA_WINDOW]
                  </span>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    [×]
                  </button>
                </div>

                {/* Node Content */}
                <div className="space-y-3">
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground">NODE_ID:</div>
                    <div className="font-mono text-sm text-primary">{selectedNode.title}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground">PERIOD:</div>
                    <div className="font-mono text-xs text-foreground">{selectedNode.period}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground">DESCRIPTION:</div>
                    <div className="font-mono text-xs text-foreground leading-relaxed">
                      {selectedNode.description}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground mb-1">SKILLS:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 border border-primary/50 font-mono text-[10px] text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Window Footer */}
                <div className="mt-3 pt-2 border-t border-border font-mono text-[10px] text-muted-foreground flex justify-between">
                  <span>[STATUS: ACTIVE]</span>
                  <span>[VER: 1.0]</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-primary bg-primary/20" />
              <span>ACTIVE NODE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-primary" />
              <span>CONNECTION</span>
            </div>
          </div>

          {/* Coordinates */}
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground">
            NODES: {CAREER_NODES.length} | LINKS: {CONNECTIONS.length}
          </div>
        </motion.div>

        {/* Mobile Instruction */}
        <motion.div
          className="text-center mt-6 font-mono text-xs text-muted-foreground md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Tap nodes to view career details
        </motion.div>
      </div>
    </section>
  );
}
