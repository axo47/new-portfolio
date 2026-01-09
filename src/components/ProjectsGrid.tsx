import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: "ai" | "math";
  status: "Deployed" | "Research" | "Development";
  image?: string;
}

const projects: Project[] = [
  {
    id: "solver-detector",
    title: "Solver Detector",
    description: "Intelligent system for automatic detection and classification of mathematical solver algorithms using deep learning techniques.",
    tags: ["Computer Vision", "PyTorch", "CNN"],
    category: "ai",
    status: "Deployed",
  },
  {
    id: "latin-hypercube",
    title: "Latin Hypercube Optimization",
    description: "Advanced sampling methodology for efficient exploration of high-dimensional parameter spaces in stochastic optimization.",
    tags: ["Stochastic Methods", "Python", "NumPy"],
    category: "math",
    status: "Research",
  },
  {
    id: "ultimate-tetris",
    title: "Ultimate Website (Tetris)",
    description: "Modern web application featuring an AI-powered Tetris game with reinforcement learning opponents and adaptive difficulty.",
    tags: ["React", "TypeScript", "RL"],
    category: "ai",
    status: "Deployed",
  },
  {
    id: "availability-checker",
    title: "Availability Checker",
    description: "Real-time scheduling optimization system using constraint satisfaction and graph algorithms for resource allocation.",
    tags: ["Algorithms", "NestJS", "Azure"],
    category: "math",
    status: "Deployed",
  },
];

export const ProjectsGrid = () => {
  return (
    <section id="projects" className="relative z-10 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading gradient-text mb-4">Featured Projects</h2>
          <p className="section-subheading mx-auto">
            Elegant solutions at the intersection of mathematical rigor and intelligent systems
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="glass-card glass-card-hover p-6 md:p-8 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${project.status === "Deployed" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : project.status === "Research"
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "bg-primary/20 text-primary border border-primary/30"
                  }
                `}>
                  {project.status}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                    <Github className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={project.category === "ai" ? "tag" : "tag-copper"}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="w-6 h-6 text-primary" />
              </div>

              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="#" className="btn-outline inline-flex items-center gap-2">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
