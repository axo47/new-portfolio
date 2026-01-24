import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

// Extended formula library with categories
const formulas = [
  // PROMINENT CENTERPIECE - Likelihood & MLE
  { text: "L(θ | X) = ∏ f(xᵢ | θ)", name: "Likelihood Function", category: "mle", layer: "mid", size: "xl" },
  { text: "ℓ(θ) = ∑ log f(xᵢ | θ)", name: "Log-Likelihood", category: "mle", layer: "mid", size: "lg" },
  { text: "θ̂ₘₗₑ = argmax ℓ(θ)", name: "Maximum Likelihood Estimation", category: "mle", layer: "mid", size: "xl" },
  
  // FOUNDATIONAL MATH & OPTIMIZATION - Warm Copper
  { text: "A = UΣVᵀ", name: "Singular Value Decomposition", category: "math", layer: "fore", size: "md" },
  { text: "Hᵢⱼ = ∂²f/∂xᵢ∂xⱼ", name: "Hessian Matrix", category: "math", layer: "back", size: "sm" },
  { text: "ℒ(x, λ) = f(x) + λg(x)", name: "Lagrange Multipliers", category: "math", layer: "mid", size: "md" },
  { text: "λᵢvᵢ = Avᵢ", name: "Eigenvector Equation", category: "math", layer: "fore", size: "sm" },
  { text: "P = A(AᵀA)⁻¹Aᵀ", name: "Projection Matrix", category: "math", layer: "back", size: "md" },
  { text: "∇f(x*) = 0", name: "Critical Point", category: "math", layer: "fore", size: "sm" },
  { text: "det(A - λI) = 0", name: "Characteristic Equation", category: "math", layer: "back", size: "sm" },
  
  // DEEP LEARNING & AI - Electric Blue
  { text: "Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V", name: "Self-Attention Mechanism", category: "ai", layer: "mid", size: "lg" },
  { text: "z = (x - μ)/√(σ² + ε)", name: "Layer Normalization", category: "ai", layer: "fore", size: "md" },
  { text: "sim(q,k) = q·k / ||q|| ||k||", name: "Cosine Similarity (RAG)", category: "ai", layer: "back", size: "sm" },
  { text: "KL(P || Q) = ∑P(x)log(P(x)/Q(x))", name: "KL Divergence", category: "ai", layer: "mid", size: "md" },
  { text: "Dropout(x) = x ⊙ m, m ~ Bernoulli(p)", name: "Dropout Regularization", category: "ai", layer: "fore", size: "sm" },
  { text: "∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂w", name: "Backpropagation", category: "ai", layer: "back", size: "md" },
  { text: "σ(x) = 1/(1 + e⁻ˣ)", name: "Sigmoid Activation", category: "ai", layer: "fore", size: "sm" },
  
  // STATISTICS, PHYSICS & COMPUTATION - Mixed
  { text: "f(x|μ,σ²) = (2πσ²)⁻½ exp(-(x-μ)²/2σ²)", name: "Gaussian Distribution", category: "stats", layer: "mid", size: "lg" },
  { text: "dXₜ = μ(Xₜ,t)dt + σ(Xₜ,t)dWₜ", name: "Stochastic Differential Equation", category: "stats", layer: "back", size: "md" },
  { text: "I = ∫ r² dm", name: "Moment of Inertia", category: "physics", layer: "back", size: "sm" },
  { text: "n₁ sin θ₁ = n₂ sin θ₂", name: "Snell's Law", category: "physics", layer: "fore", size: "sm" },
  { text: "O(n log n)", name: "Algorithmic Complexity", category: "compute", layer: "fore", size: "sm" },
  { text: "P(A|B) = P(B|A)P(A)/P(B)", name: "Bayes' Theorem", category: "stats", layer: "mid", size: "md" },
  { text: "∇·F = ρ/ε₀", name: "Gauss's Law", category: "physics", layer: "back", size: "sm" },
  { text: "E = mc²", name: "Mass-Energy Equivalence", category: "physics", layer: "fore", size: "sm" },
];

// Generate random positions for formulas
const generatePositions = () => {
  return formulas.map((formula, i) => {
    // Distribute across the full width/height with some structure
    const angle = (i / formulas.length) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 25 + Math.random() * 35;
    
    return {
      ...formula,
      x: 50 + Math.cos(angle) * radius * (0.8 + Math.random() * 0.4),
      y: 50 + Math.sin(angle) * radius * 0.6 * (0.8 + Math.random() * 0.4),
      baseX: 50 + Math.cos(angle) * radius * (0.8 + Math.random() * 0.4),
      baseY: 50 + Math.sin(angle) * radius * 0.6 * (0.8 + Math.random() * 0.4),
      driftSpeed: 0.0003 + Math.random() * 0.0005,
      driftPhase: Math.random() * Math.PI * 2,
      driftAmplitude: 1 + Math.random() * 2,
    };
  });
};

// Formula component with magnetic repulsion and hover state
const Formula = ({ 
  formula, 
  mouseX, 
  mouseY, 
  containerRef,
  hoveredFormula,
  setHoveredFormula
}: { 
  formula: ReturnType<typeof generatePositions>[0];
  mouseX: number;
  mouseY: number;
  containerRef: React.RefObject<HTMLDivElement>;
  hoveredFormula: string | null;
  setHoveredFormula: (name: string | null) => void;
}) => {
  const [position, setPosition] = useState({ x: formula.x, y: formula.y });
  const [time, setTime] = useState(0);
  
  // Animation loop for drifting
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setTime(t => t + 1);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  // Calculate position with drift and magnetic repulsion
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseXPercent = ((mouseX - rect.left) / rect.width) * 100;
    const mouseYPercent = ((mouseY - rect.top) / rect.height) * 100;
    
    // Drift calculation
    const driftX = Math.sin(time * formula.driftSpeed + formula.driftPhase) * formula.driftAmplitude;
    const driftY = Math.cos(time * formula.driftSpeed * 0.7 + formula.driftPhase) * formula.driftAmplitude * 0.5;
    
    // Magnetic repulsion
    const dx = formula.baseX + driftX - mouseXPercent;
    const dy = formula.baseY + driftY - mouseYPercent;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const repulsionStrength = 15;
    const repulsionRadius = 20;
    
    let repulsionX = 0;
    let repulsionY = 0;
    
    if (distance < repulsionRadius && distance > 0) {
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      repulsionX = (dx / distance) * force;
      repulsionY = (dy / distance) * force;
    }
    
    setPosition({
      x: formula.baseX + driftX + repulsionX,
      y: formula.baseY + driftY + repulsionY,
    });
  }, [mouseX, mouseY, time, formula, containerRef]);
  
  // Layer-based styles
  const layerStyles = {
    fore: { opacity: 0.9, blur: 0, scale: 1.1, speed: 1.3 },
    mid: { opacity: 0.75, blur: 0, scale: 1, speed: 1 },
    back: { opacity: 0.4, blur: 2, scale: 0.85, speed: 0.6 },
  };
  
  const sizeStyles = {
    xl: "text-xl md:text-2xl",
    lg: "text-lg md:text-xl",
    md: "text-base md:text-lg",
    sm: "text-sm md:text-base",
  };
  
  const categoryColors = {
    mle: "text-primary-glow",
    math: "text-accent",
    ai: "text-primary",
    stats: "text-tertiary",
    physics: "text-muted-foreground",
    compute: "text-primary/80",
  };
  
  const layer = layerStyles[formula.layer as keyof typeof layerStyles];
  const isHovered = hoveredFormula === formula.name;
  const isOtherHovered = hoveredFormula !== null && !isHovered;
  
  return (
    <motion.div
      className={`absolute cursor-default select-none font-mono whitespace-nowrap ${sizeStyles[formula.size as keyof typeof sizeStyles]}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        filter: `blur(${isHovered ? 0 : layer.blur}px)`,
        zIndex: formula.layer === 'fore' ? 30 : formula.layer === 'mid' ? 20 : 10,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isHovered ? 1 : isOtherHovered ? layer.opacity * 0.3 : layer.opacity,
        scale: isHovered ? layer.scale * 1.15 : layer.scale,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setHoveredFormula(formula.name)}
      onMouseLeave={() => setHoveredFormula(null)}
    >
      <span 
        className={`${categoryColors[formula.category as keyof typeof categoryColors]} transition-all duration-300 ${isHovered ? 'drop-shadow-[0_0_20px_currentColor]' : ''}`}
        style={{
          textShadow: isHovered 
            ? formula.category === 'ai' || formula.category === 'mle'
              ? '0 0 30px hsl(var(--primary)), 0 0 60px hsl(var(--primary) / 0.5)'
              : '0 0 30px hsl(var(--accent)), 0 0 60px hsl(var(--accent) / 0.5)'
            : 'none'
        }}
      >
        {formula.text}
      </span>
      
      {/* Tooltip on hover */}
      {isHovered && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded bg-card/90 backdrop-blur-sm border border-border/50"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
            {formula.name}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export const NexusOfReason = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredFormula, setHoveredFormula] = useState<string | null>(null);
  
  const positionedFormulas = useMemo(() => generatePositions(), []);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);
  
  return (
    <section id="skills" className="relative z-10 py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h2 className="section-heading mb-4">
            <span className="text-foreground">The </span>
            <span className="gradient-text">Nexus of Reason</span>
          </h2>
          <p className="section-subheading mx-auto">
            Foundations of Intelligence — The Mathematical Architecture Powering Modern AI
          </p>
        </motion.div>

        {/* Formula Cloud Container */}
        <motion.div
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[650px] lg:h-[700px] rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(220 20% 6%) 100%)',
          }}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Technical Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(hsl(220 10% 12% / 0.5) 1px, transparent 1px),
                linear-gradient(90deg, hsl(220 10% 12% / 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />
          
          {/* Central glow effect */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
            }}
          />
          
          {/* Copper accent glow */}
          <div 
            className="absolute top-1/3 left-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, hsl(var(--accent) / 0.06) 0%, transparent 70%)',
            }}
          />

          {/* Formulas */}
          {positionedFormulas.map((formula, i) => (
            <Formula
              key={i}
              formula={formula}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
              containerRef={containerRef}
              hoveredFormula={hoveredFormula}
              setHoveredFormula={setHoveredFormula}
            />
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-4 md:gap-8 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" style={{ boxShadow: '0 0 8px hsl(var(--accent))' }} />
              <span className="text-muted-foreground">Mathematical Foundations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: '0 0 8px hsl(var(--primary))' }} />
              <span className="text-muted-foreground">AI & Deep Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary" style={{ boxShadow: '0 0 8px hsl(var(--tertiary))' }} />
              <span className="text-muted-foreground">Statistics & Physics</span>
            </div>
          </div>
        </motion.div>

        {/* Interaction hint */}
        <motion.p 
          className="text-center text-muted-foreground/60 text-sm mt-6 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Move cursor to interact • Hover formulas for details
        </motion.p>
      </div>
    </section>
  );
};
