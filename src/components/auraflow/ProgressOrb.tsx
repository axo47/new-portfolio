import { motion } from "framer-motion";

interface ProgressOrbProps {
  progress: number; // 0 to 1
  completed: number;
  total: number;
}

export function ProgressOrb({ progress, completed, total }: ProgressOrbProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const percentage = Math.round(progress * 100);

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-full animate-orb-pulse"
          style={{
            background: `radial-gradient(circle, hsl(239 84% 67% / ${0.08 + progress * 0.15}) 0%, transparent 70%)`,
          }}
        />

        {/* SVG ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="4"
          />
          <motion.circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ filter: "drop-shadow(0 0 8px hsl(239 84% 67% / 0.4))" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground tracking-tight">{percentage}%</span>
          <span className="text-xs text-muted-foreground mt-0.5">
            {completed}/{total} done
          </span>
        </div>
      </div>
    </motion.div>
  );
}
