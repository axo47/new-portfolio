import { motion } from "framer-motion";
import { Building2, GraduationCap, Microscope } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  organization: string;
  type: "work" | "research" | "education";
  period: string;
  description: string;
  tags: string[];
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
  },
  {
    id: "axians",
    title: "Junior Developer",
    organization: "Axians Canada",
    type: "work",
    period: "2023 - 2024",
    description: "Full-stack development with NestJS and Azure cloud services. Building scalable enterprise solutions.",
    tags: ["NestJS", "Azure", "TypeScript"],
  },
  {
    id: "chum",
    title: "AI Research Intern",
    organization: "CHUM Research Centre",
    type: "research",
    period: "2023",
    description: "Applied AI for breast cancer prediction using medical imaging. Developed CNN-based diagnostic models.",
    tags: ["Medical AI", "Computer Vision", "PyTorch"],
  },
  {
    id: "gdg",
    title: "VP Projects",
    organization: "Google Developer Group",
    type: "work",
    period: "2022 - 2023",
    description: "Led technical workshops and hackathons. Organized community events for 500+ developers.",
    tags: ["Leadership", "Community", "Events"],
  },
  {
    id: "propolys",
    title: "Entrepreneur",
    organization: "Propolys Medtech",
    type: "work",
    period: "2022",
    description: "Founded medtech startup in entrepreneurship program. Developed prototype for patient monitoring system.",
    tags: ["Startup", "Healthcare", "IoT"],
  },
  {
    id: "ta",
    title: "Teaching Assistant",
    organization: "LOG2420 - UI/UX",
    type: "education",
    period: "2023",
    description: "Assisted in teaching user interface design principles. Graded assignments and held office hours.",
    tags: ["Teaching", "UI/UX", "Web Dev"],
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

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative z-10 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading gradient-text mb-4">Experience</h2>
          <p className="section-subheading mx-auto">
            A journey through research, industry, and innovation
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => {
            const Icon = getIcon(exp.type);
            return (
              <motion.div
                key={exp.id}
                className="glass-card glass-card-hover p-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${exp.type === "research" 
                      ? "bg-accent/20 text-accent" 
                      : exp.type === "education"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-primary/20 text-primary"
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {exp.organization}
                </p>
                <p className="text-sm text-muted-foreground/80 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 rounded-md text-[10px] font-medium bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
