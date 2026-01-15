import { motion } from "framer-motion";

export const DynamicLightOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Blue Orb - Top Right */}
      <motion.div
        className="light-orb light-orb-blue w-[600px] h-[600px]"
        style={{ top: '5%', right: '10%' }}
        animate={{
          x: [0, 50, -30, 20, 0],
          y: [0, -40, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Amber Orb - Bottom Left */}
      <motion.div
        className="light-orb light-orb-amber w-[500px] h-[500px]"
        style={{ bottom: '10%', left: '5%' }}
        animate={{
          x: [0, -40, 30, -20, 0],
          y: [0, 30, -40, 20, 0],
          scale: [1, 0.95, 1.08, 0.98, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smaller Blue Orb - Middle */}
      <motion.div
        className="light-orb light-orb-blue w-[350px] h-[350px] opacity-60"
        style={{ top: '40%', left: '40%' }}
        animate={{
          x: [0, 80, -60, 40, 0],
          y: [0, -60, 80, -30, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smaller Amber Orb - Top Left */}
      <motion.div
        className="light-orb light-orb-amber w-[300px] h-[300px] opacity-50"
        style={{ top: '20%', left: '15%' }}
        animate={{
          x: [0, 30, -50, 25, 0],
          y: [0, 50, -30, 40, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Extra Blue Orb - Bottom Right */}
      <motion.div
        className="light-orb light-orb-blue w-[400px] h-[400px] opacity-40"
        style={{ bottom: '20%', right: '20%' }}
        animate={{
          x: [0, -60, 40, -30, 0],
          y: [0, 40, -50, 30, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
