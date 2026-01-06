import { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  specs: {
    stack: string[];
    metrics: string;
    status: string;
  };
  dimensions: { width: number; height: number };
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    title: "Neural Architecture Search Engine",
    type: "AI/ML SYSTEM",
    description: "Automated neural network architecture optimization using evolutionary algorithms and reinforcement learning. Achieved 40% reduction in model design time.",
    specs: {
      stack: ["Python", "PyTorch", "Ray"],
      metrics: "10M+ architectures evaluated",
      status: "DEPLOYED",
    },
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: "PRJ-002",
    title: "Distributed Training Pipeline",
    type: "INFRASTRUCTURE",
    description: "Scalable ML training infrastructure supporting multi-GPU and multi-node training with automatic checkpointing and fault tolerance.",
    specs: {
      stack: ["Kubernetes", "NVIDIA NCCL", "S3"],
      metrics: "100+ GPU clusters",
      status: "PRODUCTION",
    },
    dimensions: { width: 1600, height: 900 },
  },
  {
    id: "PRJ-003",
    title: "Real-time Anomaly Detection",
    type: "ANALYTICS PLATFORM",
    description: "Stream processing system for detecting anomalies in high-frequency trading data using transformer-based models.",
    specs: {
      stack: ["Kafka", "Flink", "TensorRT"],
      metrics: "<10ms latency",
      status: "ACTIVE",
    },
    dimensions: { width: 1440, height: 810 },
  },
  {
    id: "PRJ-004",
    title: "Conversational AI Framework",
    type: "NLP SYSTEM",
    description: "Enterprise-grade conversational AI platform with multi-turn dialogue management and context-aware response generation.",
    specs: {
      stack: ["LangChain", "OpenAI", "Redis"],
      metrics: "1M+ conversations/day",
      status: "SCALING",
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
              className="data-sheet p-6 relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Corner Markers */}
              <span className="absolute -top-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
              <span className="absolute -top-2 -right-1 text-xs text-muted-foreground font-mono">+</span>
              <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
              <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono">+</span>

              {/* Dimension Labels (show on hover) */}
              <div className="dimensions absolute top-1 left-1 font-mono">
                0, 0
              </div>
              <div className="dimensions absolute top-1 right-1 font-mono">
                {project.dimensions.width}px
              </div>
              <div className="dimensions absolute bottom-1 left-1 font-mono">
                {project.dimensions.height}px
              </div>
              <div className="dimensions absolute bottom-1 right-1 font-mono">
                {project.dimensions.width}x{project.dimensions.height}
              </div>

              {/* Project Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-border">
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">
                    [{project.id}] {project.type}
                  </div>
                  <h3 className="font-mono text-lg text-primary text-glow">
                    {project.title}
                  </h3>
                </div>
                <div className={`font-mono text-xs px-2 py-1 border ${
                  project.specs.status === "DEPLOYED" || project.specs.status === "PRODUCTION"
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
                }`}>
                  {project.specs.status}
                </div>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
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

              {/* Selection Indicator */}
              <motion.div
                className="absolute inset-0 border-2 border-primary pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ boxShadow: hoveredId === project.id ? "0 0 20px hsl(120 100% 50% / 0.3)" : "none" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
