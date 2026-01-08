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
    title: "Solver Detector",
    type: "AI/ML SYSTEM",
    classification: "PUBLIC",
    version: "v1.2.0",
    description: "AI-powered system for detecting and classifying mathematical problem solvers. Utilizes deep learning for pattern recognition and optimization algorithm identification.",
    specs: {
      stack: ["Python", "PyTorch", "OpenCV"],
      metrics: "95% accuracy",
      status: "DEPLOYED",
      lastUpdated: "2025-01-05",
    },
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: "PRJ-002",
    title: "Latin Hypercube Optimization",
    type: "RESEARCH",
    classification: "ACADEMIC",
    version: "v2.0.0",
    description: "Advanced sampling optimization using Latin Hypercube methods for high-dimensional parameter spaces. Reduces computational cost while maintaining statistical coverage.",
    specs: {
      stack: ["Python", "NumPy", "SciPy"],
      metrics: "40% efficiency gain",
      status: "PRODUCTION",
      lastUpdated: "2025-01-03",
    },
    dimensions: { width: 1600, height: 900 },
  },
  {
    id: "PRJ-003",
    title: "Ultimate Website (Tetris)",
    type: "WEB APPLICATION",
    classification: "PUBLIC",
    version: "v3.1.0",
    description: "A fully-featured Tetris implementation with modern web technologies. Includes leaderboards, multiplayer mode, and customizable themes.",
    specs: {
      stack: ["React", "TypeScript", "Canvas"],
      metrics: "60 FPS gameplay",
      status: "ACTIVE",
      lastUpdated: "2025-01-02",
    },
    dimensions: { width: 1440, height: 810 },
  },
  {
    id: "PRJ-004",
    title: "Availability Checker",
    type: "AUTOMATION TOOL",
    classification: "INTERNAL",
    version: "v1.5.0",
    description: "Automated system for monitoring and checking service availability across distributed infrastructure. Real-time alerts and status dashboards.",
    specs: {
      stack: ["Node.js", "Docker", "Redis"],
      metrics: "<100ms response",
      status: "DEPLOYED",
      lastUpdated: "2025-01-01",
    },
    dimensions: { width: 1280, height: 720 },
  },
];

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-12 md:py-24 px-4 md:px-6">
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
