import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroCard = () => {
  return (
    <motion.section
      className="relative z-10 min-h-[90vh] flex items-center justify-center px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl w-full">
        <motion.div
          className="glass-card p-8 md:p-16 relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Available for Research & Collaboration</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="gradient-text">KEVIN</span>
              <br />
              <span className="text-foreground">DZZEDINE</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Architecting <span className="text-primary">Intelligent Systems</span> upon 
              <br className="hidden md:block" /> Rigorous <span className="text-accent">Mathematical Foundations</span>
            </motion.p>

            {/* Role Tags */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="tag">Machine Learning</span>
              <span className="tag">Deep Learning</span>
              <span className="tag-copper">Applied Mathematics</span>
              <span className="tag-copper">Optimization</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a href="#projects" className="btn-premium inline-flex items-center gap-2">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-outline inline-flex items-center gap-2">
                Get in Touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
