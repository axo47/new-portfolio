import { motion } from "framer-motion";
import { Lightbulb, Target, Shield, Zap } from "lucide-react";

const principles = [
  {
    icon: Lightbulb,
    title: "Explainable AI",
    description: "Building transparent models where every decision can be traced back to its mathematical foundation.",
  },
  {
    icon: Target,
    title: "Mathematical Rigor",
    description: "Grounding all solutions in proven mathematical theory, ensuring reliability and correctness.",
  },
  {
    icon: Shield,
    title: "Robust Systems",
    description: "Designing algorithms that perform consistently across edge cases and adversarial conditions.",
  },
  {
    icon: Zap,
    title: "Efficient Optimization",
    description: "Leveraging advanced optimization techniques for scalable, production-ready solutions.",
  },
];

export const ApproachCard = () => {
  return (
    <section className="relative z-10 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading gradient-text mb-4">My Approach</h2>
          <p className="section-subheading mx-auto">
            Prioritizing mathematically sound algorithms over black-box solutions
          </p>
        </motion.div>

        {/* Bento Grid of Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              className="glass-card p-8 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <principle.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Card */}
        <motion.div
          className="glass-card p-8 md:p-12 mt-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <blockquote className="relative z-10">
            <p className="text-xl md:text-2xl text-foreground/90 italic max-w-3xl mx-auto leading-relaxed">
              "The elegance of mathematics provides the foundation for truly intelligent systems—
              <span className="text-primary"> understanding why</span> is just as important as 
              <span className="text-accent"> knowing how</span>."
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};
