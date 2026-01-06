import { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  type: string;
  classification: string;
  version: string;
  description: string;
  specs: {
    stack: string[];
    metrics: string;
    status: string;
    lastUpdated: string;
  };
  dimensions: { width: number; height: number };
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    title: "Neural Architecture Search Engine",
    type: "AI/ML SYSTEM",
    classification: "CONFIDENTIAL",
    version: "v2.4.1",
    description: "Automated neural network architecture optimization using evolutionary algorithms and reinforcement learning. Achieved 40% reduction in model design time.",
    specs: {
      stack: ["Python", "PyTorch", "Ray"],
      metrics: "10M+ architectures evaluated",
      status: "DEPLOYED",
      lastUpdated: "2024-12-15",
    },
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: "PRJ-002",
    title: "Distributed Training Pipeline",
    type: "INFRASTRUCTURE",
    classification: "INTERNAL",
    version: "v3.1.0",
    description: "Scalable ML training infrastructure supporting multi-GPU and multi-node training with automatic checkpointing and fault tolerance.",
    specs: {
      stack: ["Kubernetes", "NVIDIA NCCL", "S3"],
      metrics: "100+ GPU clusters",
      status: "PRODUCTION",
      lastUpdated: "2024-11-28",
    },
    dimensions: { width: 1600, height: 900 },
  },
  {
    id: "PRJ-003",
    title: "Real-time Anomaly Detection",
    type: "ANALYTICS PLATFORM",
    classification: "RESTRICTED",
    version: "v1.8.3",
    description: "Stream processing system for detecting anomalies in high-frequency trading data using transformer-based models.",
    specs: {
      stack: ["Kafka", "Flink", "TensorRT"],
      metrics: "<10ms latency",
      status: "ACTIVE",
      lastUpdated: "2025-01-02",
    },
    dimensions: { width: 1440, height: 810 },
  },
  {
    id: "PRJ-004",
    title: "Conversational AI Framework",
    type: "NLP SYSTEM",
    classification: "PUBLIC",
    version: "v4.0.0",
    description: "Enterprise-grade conversational AI platform with multi-turn dialogue management and context-aware response generation.",
    specs: {
      stack: ["LangChain", "OpenAI", "Redis"],
      metrics: "1M+ conversations/day",
      status: "SCALING",
      lastUpdated: "2025-01-05",
    },
    dimensions: { width: 1280, height: 720 },
  },
];

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-xs text-muted-foreground mb-4">
            [----------------] PROJECT DATABASE [----------------]
          </div>
          <h2 className="font-mono text-2xl md:text-3xl text-primary text-glow">
            TECHNICAL DATA SHEETS
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="data-sheet p-0 relative group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Corner Markers */}
              <span className="absolute -top-2 -left-1 text-xs text-muted-foreground font-mono z-10">+</span>
              <span className="absolute -top-2 -right-1 text-xs text-muted-foreground font-mono z-10">+</span>
              <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono z-10">+</span>
              <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono z-10">+</span>

              {/* Document Header Strip */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="font-mono text-xs text-primary">{project.id}</div>
                  <div className="w-px h-3 bg-border" />
                  <div className="font-mono text-xs text-muted-foreground">{project.classification}</div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">{project.version}</div>
              </div>

              {/* Main Content */}
              <div className="p-6">
                {/* Dimension Labels (show on hover) */}
                <motion.div 
                  className="absolute top-10 left-2 font-mono text-xs text-primary/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                >
                  [0,0]
                </motion.div>
                <motion.div 
                  className="absolute top-10 right-2 font-mono text-xs text-primary/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                >
                  [{project.dimensions.width}px]
                </motion.div>
                <motion.div 
                  className="absolute bottom-2 left-2 font-mono text-xs text-primary/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                >
                  [{project.dimensions.height}px]
                </motion.div>
                <motion.div 
                  className="absolute bottom-2 right-2 font-mono text-xs text-primary/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                >
                  [{project.dimensions.width}×{project.dimensions.height}]
                </motion.div>

                {/* Project Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-border border-dashed">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">
                      [TYPE: {project.type}]
                    </div>
                    <h3 className="font-mono text-lg text-primary text-glow">
                      {project.title}
                    </h3>
                  </div>
                  <div className={`font-mono text-xs px-2 py-1 border ${
                    project.specs.status === "DEPLOYED" || project.specs.status === "PRODUCTION"
                      ? "border-primary text-primary bg-primary/10"
                      : "border-muted-foreground text-muted-foreground"
                  }`}>
                    ● {project.specs.status}
                  </div>
                </div>

                {/* Description */}
                <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 font-mono text-xs mb-4">
                  <div>
                    <div className="text-muted-foreground mb-1">[STACK]</div>
                    <div className="text-foreground">
                      {project.specs.stack.join(" / ")}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">[METRICS]</div>
                    <div className="text-foreground">{project.specs.metrics}</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div className="font-mono text-xs text-muted-foreground">
                    LAST_MODIFIED: {project.specs.lastUpdated}
                  </div>
                  <motion.div 
                    className="font-mono text-xs text-primary cursor-pointer hover:text-glow"
                    whileHover={{ x: 4 }}
                  >
                    [VIEW DETAILS] →
                  </motion.div>
                </div>
              </div>

              {/* Selection Indicator / Glow Border */}
              <motion.div
                className="absolute inset-0 border-2 border-primary pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ boxShadow: hoveredId === project.id ? "0 0 30px hsl(120 100% 50% / 0.4), inset 0 0 20px hsl(120 100% 50% / 0.1)" : "none" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
