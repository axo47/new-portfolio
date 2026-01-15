import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

export const HeroCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0.3]);

  return (
    <motion.section
      ref={ref}
      className="relative z-10 min-h-[95vh] flex items-center justify-center px-4 md:px-8 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 3D Mathematical Shape - Morphing on Scroll */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity }}
      >
        <motion.div
          className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
          style={{
            rotateY,
            rotateX,
            scale,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Mobius-inspired wireframe rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: i % 2 === 0 ? 'hsl(210 100% 60% / 0.15)' : 'hsl(28 65% 58% / 0.12)',
                transform: `rotateX(${60 + i * 12}deg) rotateY(${i * 25}deg) rotateZ(${i * 15}deg)`,
                width: `${100 - i * 12}%`,
                height: `${100 - i * 12}%`,
                margin: 'auto',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              animate={{
                rotateZ: [i * 15, i * 15 + 360],
              }}
              transition={{
                duration: 60 + i * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Central glowing core */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(210 100% 70%) 0%, hsl(280 65% 55%) 50%, transparent 100%)',
              boxShadow: '0 0 60px hsl(210 100% 60% / 0.4), 0 0 120px hsl(280 65% 55% / 0.2)',
            }}
          />
        </motion.div>
      </motion.div>

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          className="glass-card glass-card-shimmer p-10 md:p-20 relative overflow-hidden"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Decorative gradient blurs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/25 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-tertiary/15 to-transparent rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10">
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card border border-primary/20 mb-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Available for Research & Collaboration</span>
            </motion.div>

            {/* Name - Architectural Typography */}
            <motion.h1
              className="text-architectural mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <span className="block text-5xl md:text-7xl lg:text-[6.5rem] gradient-text leading-[0.9]">
                KEVIN
              </span>
              <span className="block text-5xl md:text-7xl lg:text-[6.5rem] text-foreground leading-[0.9] mt-2">
                DZZEDINE
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl leading-relaxed mb-12 font-light"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Architecting <span className="text-primary font-medium">Intelligent Systems</span> upon 
              <br className="hidden md:block" /> Rigorous <span className="text-accent font-medium">Mathematical Foundations</span>
            </motion.p>

            {/* Role Tags - Glass Pill Style */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span className="tag-glass">Machine Learning</span>
              <span className="tag-glass">Deep Learning</span>
              <span className="tag-glass-copper">Applied Mathematics</span>
              <span className="tag-glass-copper">Optimization</span>
            </motion.div>

            {/* CTA Buttons - Magnetic Feel */}
            <motion.div
              className="flex flex-wrap gap-5"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.a 
                href="#projects" 
                className="btn-magnetic inline-flex items-center gap-2.5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn-outline-glow inline-flex items-center gap-2.5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
