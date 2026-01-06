import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);

  const tasks = [
    "INITIALIZING SYSTEM...",
    "LOADING NEURAL MODULES...",
    "ESTABLISHING CONNECTIONS...",
    "CALIBRATING INTERFACES...",
    "SYSTEM READY",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const taskIndex = Math.min(
      Math.floor((progress / 100) * tasks.length),
      tasks.length - 1
    );
    setCurrentTask(taskIndex);
  }, [progress, tasks.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md px-8">
          {/* Terminal Header */}
          <div className="mb-6 font-mono text-xs text-muted-foreground">
            <span className="text-primary">root@portfolio</span>
            <span>:</span>
            <span className="text-accent">~</span>
            <span>$ ./init_system.sh</span>
          </div>

          {/* Current Task */}
          <div className="mb-4 font-mono text-sm text-primary text-glow">
            {">"} {tasks[currentTask]}
            <span className="animate-blink">█</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="terminal-progress">
              <motion.div
                className="terminal-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between font-mono text-xs text-muted-foreground">
            <span>[{">".repeat(Math.floor(progress / 5))}{"-".repeat(20 - Math.floor(progress / 5))}]</span>
            <span>{Math.floor(progress)}%</span>
          </div>

          {/* ASCII Art Footer */}
          <div className="mt-8 font-mono text-xs text-muted-foreground text-center opacity-50">
            <pre>{`
╔══════════════════════════════╗
║  PORTFOLIO SYSTEM v2.0.25    ║
║  [SECURE CONNECTION]         ║
╚══════════════════════════════╝
            `}</pre>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
