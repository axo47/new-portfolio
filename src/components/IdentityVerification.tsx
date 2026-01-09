import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET_NAME = "KEVIN EZZEDINE";
const SHA256_LENGTH = 64;
const CHARS = "0123456789abcdef";

// Generate random hex character
function randomHex() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

// Fingerprint wireframe SVG
function FingerprintIcon() {
  return (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.8">
      {/* Fingerprint lines */}
      <path d="M40 10 Q20 20 20 45 Q20 70 40 75" />
      <path d="M40 10 Q60 20 60 45 Q60 70 40 75" />
      <path d="M40 18 Q25 25 25 45 Q25 65 40 70" />
      <path d="M40 18 Q55 25 55 45 Q55 65 40 70" />
      <path d="M40 26 Q30 32 30 45 Q30 58 40 63" />
      <path d="M40 26 Q50 32 50 45 Q50 58 40 63" />
      <path d="M40 34 Q35 38 35 45 Q35 52 40 56" />
      <path d="M40 34 Q45 38 45 45 Q45 52 40 56" />
      {/* Center whorl */}
      <circle cx="40" cy="45" r="4" />
      {/* Scan line animation */}
      <motion.line
        x1="15"
        x2="65"
        y1="10"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        animate={{ y1: [10, 70, 10], y2: [10, 70, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

// Retina scan wireframe
function RetinaScanIcon() {
  return (
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.8">
      {/* Outer eye shape */}
      <path d="M5 40 Q40 10 75 40 Q40 70 5 40" />
      {/* Iris rings */}
      <circle cx="40" cy="40" r="18" />
      <circle cx="40" cy="40" r="12" />
      <circle cx="40" cy="40" r="6" />
      <circle cx="40" cy="40" r="3" fill="currentColor" />
      {/* Radial lines */}
      {[0, 30, 60, 90, 120, 150].map((angle, i) => (
        <line
          key={i}
          x1={40 + Math.cos((angle * Math.PI) / 180) * 12}
          y1={40 + Math.sin((angle * Math.PI) / 180) * 12}
          x2={40 + Math.cos((angle * Math.PI) / 180) * 18}
          y2={40 + Math.sin((angle * Math.PI) / 180) * 18}
        />
      ))}
      {/* Corner brackets */}
      <path d="M8 20 L8 8 L20 8" fill="none" />
      <path d="M60 8 L72 8 L72 20" fill="none" />
      <path d="M72 60 L72 72 L60 72" fill="none" />
      <path d="M20 72 L8 72 L8 60" fill="none" />
    </svg>
  );
}

export function IdentityVerification() {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [phase, setPhase] = useState<"hash" | "decrypting" | "complete">("hash");

  useEffect(() => {
    // Initialize with random hash
    const initialHash = Array(SHA256_LENGTH).fill(0).map(() => randomHex());
    setDisplayText(initialHash);

    // Start decryption after a delay
    const startTimer = setTimeout(() => {
      setPhase("decrypting");
      setIsDecrypting(true);
    }, 1500);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (phase !== "decrypting") return;

    // Target text padded/formatted to fit
    const targetText = `[NAME: ${TARGET_NAME}]`.padEnd(SHA256_LENGTH, " ").split("");
    let currentIndex = 0;

    const decryptInterval = setInterval(() => {
      if (currentIndex >= SHA256_LENGTH) {
        clearInterval(decryptInterval);
        setPhase("complete");
        setIsDecrypting(false);
        return;
      }

      setDisplayText((prev) => {
        const newText = [...prev];
        // Scramble remaining characters
        for (let i = currentIndex; i < SHA256_LENGTH; i++) {
          if (Math.random() > 0.7) {
            newText[i] = randomHex();
          }
        }
        // Lock in current character
        newText[currentIndex] = targetText[currentIndex];
        return newText;
      });

      currentIndex++;
    }, 50);

    return () => clearInterval(decryptInterval);
  }, [phase]);

  return (
    <section className="relative py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="blueprint-container p-4 md:p-8 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Corner Markers */}
          <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
          <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono">+</span>

          {/* Module Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-border">
            <div className="font-mono text-xs text-muted-foreground">
              [IDENTITY_VERIFICATION] — SECURE MODULE
            </div>
            <motion.div
              className="font-mono text-xs text-primary"
              animate={{ opacity: isDecrypting ? [0.5, 1, 0.5] : 1 }}
              transition={{ duration: 0.5, repeat: isDecrypting ? Infinity : 0 }}
            >
              ● {phase === "complete" ? "VERIFIED" : "PROCESSING"}
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Biometric Icon */}
            <div className="text-primary flex-shrink-0">
              <motion.div
                animate={{ opacity: phase === "complete" ? 1 : [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: phase === "complete" ? 0 : Infinity }}
                className="hidden md:block"
              >
                <FingerprintIcon />
              </motion.div>
              <motion.div
                className="md:hidden"
                animate={{ opacity: phase === "complete" ? 1 : [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: phase === "complete" ? 0 : Infinity }}
              >
                <RetinaScanIcon />
              </motion.div>
            </div>

            {/* Hash/Name Display */}
            <div className="flex-1 w-full overflow-hidden">
              {/* SHA-256 Hash Line */}
              <div className="font-mono text-[10px] md:text-xs text-muted-foreground mb-2">
                SHA-256 HASH:
              </div>
              <div className="font-mono text-xs md:text-sm lg:text-base text-primary text-glow break-all leading-relaxed">
                {displayText.map((char, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      opacity: phase === "decrypting" && index >= displayText.findIndex(c => c === "[") 
                        ? [0.3, 1, 0.3] 
                        : 1
                    }}
                    transition={{ 
                      duration: 0.1, 
                      repeat: phase === "decrypting" ? Infinity : 0 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Status Line */}
              <motion.div
                className="mt-4 md:mt-6 font-mono text-xs md:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "complete" ? 1 : 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-muted-foreground">ROLE: </span>
                <span className="text-primary text-glow">AI & MATHEMATICS SPECIALIST</span>
                <span className="text-muted-foreground"> // CLEARANCE: </span>
                <span className="text-accent">LEVEL_01</span>
              </motion.div>
            </div>

            {/* Secondary Icon (desktop) */}
            <div className="text-primary flex-shrink-0 hidden lg:block">
              <motion.div
                animate={{ opacity: phase === "complete" ? 1 : [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: phase === "complete" ? 0 : Infinity }}
              >
                <RetinaScanIcon />
              </motion.div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-border flex flex-wrap justify-between gap-2 font-mono text-[10px] md:text-xs text-muted-foreground">
            <span>[PROTOCOL: RSA-4096]</span>
            <span>[ENTROPY: 256-BIT]</span>
            <span className="hidden sm:inline">[AUTH: BIOMETRIC+TOKEN]</span>
            <span>{phase === "complete" ? "[STATUS: AUTHENTICATED]" : "[STATUS: VERIFYING...]"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}