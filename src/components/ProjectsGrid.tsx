import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: "ai" | "math";
  status: "Deployed" | "Research" | "Development";
  formula?: string;
  formulaDescription?: string;
}

const projects: Project[] = [
  {
    id: "solver-detector",
    title: "Solver Detector",
    description: "Intelligent system for automatic detection and classification of mathematical solver algorithms using deep learning techniques.",
    tags: ["Computer Vision", "PyTorch", "CNN"],
    category: "ai",
    status: "Deployed",
    formula: "P(class|x) = softmax(Wh + b)",
    formulaDescription: "Multi-class classification via softmax",
  },
  {
    id: "latin-hypercube",
    title: "Latin Hypercube Optimization",
    description: "Advanced sampling methodology for efficient exploration of high-dimensional parameter spaces in stochastic optimization.",
    tags: ["Stochastic Methods", "Python", "NumPy"],
    category: "math",
    status: "Research",
    formula: "x_ij = (π_j(i) - U_ij) / n",
    formulaDescription: "LHS sampling with uniform distribution",
  },
  {
    id: "ultimate-tetris",
    title: "Ultimate Website (Tetris)",
    description: "Modern web application featuring an AI-powered Tetris game with reinforcement learning opponents and adaptive difficulty.",
    tags: ["React", "TypeScript", "RL"],
    category: "ai",
    status: "Deployed",
    formula: "Q(s,a) ← Q(s,a) + α[r + γmax Q(s',a')]",
    formulaDescription: "Q-learning update rule",
  },
  {
    id: "availability-checker",
    title: "Availability Checker",
    description: "Real-time scheduling optimization system using constraint satisfaction and graph algorithms for resource allocation.",
    tags: ["Algorithms", "NestJS", "Azure"],
    category: "math",
    status: "Deployed",
    formula: "min Σ c_ij x_ij | s.t. constraints",
    formulaDescription: "Linear programming formulation",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

export const ProjectsGrid = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="relative z-10 py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h2 className="section-heading gradient-text mb-4">Featured Projects</h2>
          <p className="section-subheading mx-auto">
            Elegant solutions at the intersection of mathematical rigor and intelligent systems
          </p>
        </motion.div>

        {/* Bento Grid with Stagger */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="glass-card glass-card-shimmer glass-card-hover p-7 md:p-9 group relative overflow-hidden"
              variants={cardVariants}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-7">
                <span className={`
                  px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm
                  ${project.status === "Deployed" 
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" 
                    : project.status === "Research"
                    ? "bg-accent/15 text-accent border border-accent/25"
                    : "bg-primary/15 text-primary border border-primary/25"
                  }
                `}>
                  {project.status}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <motion.button 
                    className="p-2.5 rounded-xl bg-muted/80 hover:bg-muted transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.button>
                  <motion.button 
                    className="p-2.5 rounded-xl bg-muted/80 hover:bg-muted transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 font-display">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-7 leading-relaxed">
                {project.description}
              </p>

              {/* Tags - Glass Pills */}
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={project.category === "ai" ? "tag-glass" : "tag-glass-copper"}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Formula Overlay on Hover */}
              <AnimatePresence>
                {hoveredProject === project.id && project.formula && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="font-mono text-sm text-primary font-medium">{project.formula}</p>
                        <p className="text-xs text-muted-foreground mt-1">{project.formulaDescription}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Indicator */}
              <motion.div 
                className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ x: 10 }}
                animate={{ x: hoveredProject === project.id ? 0 : 10 }}
              >
                <ArrowUpRight className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a 
            href="#" 
            className="btn-outline-glow inline-flex items-center gap-2.5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
