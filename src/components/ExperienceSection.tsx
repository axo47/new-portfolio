import { motion } from "framer-motion";
import { Building2, GraduationCap, Microscope, TrendingUp } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  organization: string;
  type: "work" | "research" | "education";
  period: string;
  description: string;
  tags: string[];
  impact?: string;
}

const experiences: Experience[] = [
  {
    id: "lincs",
    title: "Research Assistant",
    organization: "LINCS LAB",
    type: "research",
    period: "2024 - Present",
    description: "Edge-LLM Optimization & Agentic AI research. Developing efficient deployment strategies for large language models on edge devices.",
    tags: ["LLM", "Edge Computing", "Optimization"],
    impact: "40% faster LLM inference",
  },
  {
    id: "axians",
    title: "Junior Developer",
    organization: "Axians Canada",
    type: "work",
    period: "2023 - 2024",
    description: "Full-stack development with NestJS and Azure cloud services. Building scalable enterprise solutions.",
    tags: ["NestJS", "Azure", "TypeScript"],
    impact: "3 enterprise apps shipped",
  },
  {
    id: "chum",
    title: "AI Research Intern",
    organization: "CHUM Research Centre",
    type: "research",
    period: "2023",
    description: "Applied AI for breast cancer prediction using medical imaging. Developed CNN-based diagnostic models.",
    tags: ["Medical AI", "Computer Vision", "PyTorch"],
    impact: "92% prediction accuracy",
  },
  {
    id: "gdg",
    title: "VP Projects",
    organization: "Google Developer Group",
    type: "work",
    period: "2022 - 2023",
    description: "Led technical workshops and hackathons. Organized community events for 500+ developers.",
    tags: ["Leadership", "Community", "Events"],
    impact: "500+ developers engaged",
  },
  {
    id: "propolys",
    title: "Entrepreneur",
    organization: "Propolys Medtech",
    type: "work",
    period: "2022",
    description: "Founded medtech startup in entrepreneurship program. Developed prototype for patient monitoring system.",
    tags: ["Startup", "Healthcare", "IoT"],
    impact: "Seed funding secured",
  },
  {
    id: "ta",
    title: "Teaching Assistant",
    organization: "LOG2420 - UI/UX",
    type: "education",
    period: "2023",
    description: "Assisted in teaching user interface design principles. Graded assignments and held office hours.",
    tags: ["Teaching", "UI/UX", "Web Dev"],
    impact: "120 students mentored",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "work": return Building2;
    case "research": return Microscope;
    case "education": return GraduationCap;
    default: return Building2;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative z-10 py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h2 className="section-heading gradient-text mb-4">Experience</h2>
          <p className="section-subheading mx-auto">
            A journey through research, industry, and innovation
          </p>
        </motion.div>

        {/* Timeline Grid with Stagger */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp) => {
            const Icon = getIcon(exp.type);
            return (
              <motion.div
                key={exp.id}
                className="glass-card glass-card-shimmer glass-card-hover p-6 group relative"
                variants={cardVariants}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110
                    ${exp.type === "research" 
                      ? "bg-accent/15 text-accent" 
                      : exp.type === "education"
                      ? "bg-tertiary/15 text-tertiary"
                      : "bg-primary/15 text-primary"
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium bg-muted/50 px-2.5 py-1 rounded-lg">
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 font-medium">
                  {exp.organization}
                </p>
                <p className="text-sm text-muted-foreground/80 mb-5 leading-relaxed">
                  {exp.description}
                </p>

                {/* Impact Badge */}
                {exp.impact && (
                  <div className="impact-badge mb-4">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{exp.impact}</span>
                  </div>
                )}

                {/* Tags - Glass Pills */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span 
                      key={tag}
                      className="tag-glass text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
