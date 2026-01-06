import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "AI & Mathematics Specialist";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* Terminal Window */}
        <motion.div
          className="blueprint-container p-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Corner Markers */}
          <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
          <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono">+</span>

          {/* Terminal Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <div className="font-mono text-xs text-muted-foreground">
              [TERMINAL SESSION - SECURE]
            </div>
            <div className="flex-1" />
            <div className="font-mono text-xs text-muted-foreground">
              PID: 1337
            </div>
          </div>

          {/* Command Line Prompt */}
          <div className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-primary">guest@portfolio</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~/identity</span>
            <span className="text-foreground">$ cat profile.txt</span>
          </div>

          {/* ASCII Art Name */}
          <motion.pre
            className="font-mono text-primary text-glow-strong text-xs sm:text-sm md:text-base leading-tight mb-8 overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
{`
 ██████╗  █████╗ ████████╗ █████╗ 
 ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
 ██║  ██║███████║   ██║   ███████║
 ██║  ██║██╔══██║   ██║   ██╔══██║
 ██████╔╝██║  ██║   ██║   ██║  ██║
 ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
`}
          </motion.pre>

          {/* Typing Animation */}
          <div className="font-mono text-lg md:text-xl text-foreground mb-6">
            <span className="text-muted-foreground">{"> "}</span>
            <span className="text-glow">{displayedText}</span>
            <span className={`text-primary ${showCursor ? "opacity-100" : "opacity-0"}`}>█</span>
          </div>

          {/* Status Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
            <div>
              <span className="text-primary">[STATUS]</span> ONLINE
            </div>
            <div>
              <span className="text-primary">[LOCATION]</span> GLOBAL
            </div>
            <div>
              <span className="text-primary">[AVAILABILITY]</span> OPEN
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center mt-12 font-mono text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="mb-2">[SCROLL TO CONTINUE]</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ▼
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
