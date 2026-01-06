import { motion } from "framer-motion";

const formulas = [
  "∇²ψ = ∂²ψ/∂x²",
  "∫∫ f(x,y) dA",
  "Σ aₙxⁿ",
  "∂L/∂θ = 0",
  "P(A|B) = P(B|A)P(A)/P(B)",
  "∇ · E = ρ/ε₀",
  "H(X) = -Σ p(x)log p(x)",
  "∂u/∂t = α∇²u",
  "det(A - λI) = 0",
  "∮ F · dr = 0",
];

const coordinates = [
  { x: "10%", y: "15%" },
  { x: "85%", y: "20%" },
  { x: "5%", y: "45%" },
  { x: "90%", y: "55%" },
  { x: "15%", y: "75%" },
  { x: "80%", y: "85%" },
  { x: "50%", y: "10%" },
  { x: "45%", y: "90%" },
  { x: "70%", y: "40%" },
  { x: "25%", y: "60%" },
];

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Coordinate Axes */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {/* Vertical axis indicators */}
        <line x1="50" y1="0" x2="50" y2="100%" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <line x1="0" y1="50" x2="100%" y2="50" stroke="hsl(120 100% 50%)" strokeWidth="1" strokeDasharray="5,10" />
        
        {/* Axis markers */}
        {[...Array(20)].map((_, i) => (
          <g key={i}>
            <line 
              x1={i * 5 + "%"} 
              y1="48" 
              x2={i * 5 + "%"} 
              y2="52" 
              stroke="hsl(120 100% 50%)" 
              strokeWidth="1" 
            />
          </g>
        ))}
      </svg>

      {/* Floating Formulas */}
      {formulas.map((formula, index) => (
        <motion.div
          key={index}
          className="absolute font-mono text-xs text-muted-foreground floating-formula select-none"
          style={{
            left: coordinates[index]?.x,
            top: coordinates[index]?.y,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.8,
          }}
        >
          {formula}
        </motion.div>
      ))}

      {/* Neural Network Schematic */}
      <svg 
        className="absolute opacity-5" 
        style={{ right: "5%", top: "30%", width: "150px", height: "200px" }}
      >
        {/* Input layer */}
        {[0, 1, 2].map((i) => (
          <circle key={`in-${i}`} cx="20" cy={40 + i * 60} r="8" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        ))}
        {/* Hidden layer */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={`hid-${i}`} cx="75" cy={25 + i * 50} r="8" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        ))}
        {/* Output layer */}
        {[0, 1].map((i) => (
          <circle key={`out-${i}`} cx="130" cy={60 + i * 80} r="8" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        ))}
        {/* Connections */}
        {[0, 1, 2].map((i) => 
          [0, 1, 2, 3].map((j) => (
            <line 
              key={`conn1-${i}-${j}`}
              x1="28" y1={40 + i * 60} 
              x2="67" y2={25 + j * 50} 
              stroke="hsl(120 100% 50%)" 
              strokeWidth="0.5" 
            />
          ))
        )}
        {[0, 1, 2, 3].map((i) => 
          [0, 1].map((j) => (
            <line 
              key={`conn2-${i}-${j}`}
              x1="83" y1={25 + i * 50} 
              x2="122" y2={60 + j * 80} 
              stroke="hsl(120 100% 50%)" 
              strokeWidth="0.5" 
            />
          ))
        )}
      </svg>

      {/* Cartesian Grid Overlay */}
      <div 
        className="absolute opacity-5"
        style={{ left: "3%", bottom: "10%", width: "120px", height: "120px" }}
      >
        <svg className="w-full h-full">
          <line x1="0" y1="60" x2="120" y2="60" stroke="hsl(120 100% 50%)" strokeWidth="1" />
          <line x1="60" y1="0" x2="60" y2="120" stroke="hsl(120 100% 50%)" strokeWidth="1" />
          <text x="115" y="55" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">x</text>
          <text x="65" y="10" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">y</text>
          {/* Grid lines */}
          {[-2, -1, 1, 2].map((i) => (
            <g key={i}>
              <line x1={60 + i * 20} y1="55" x2={60 + i * 20} y2="65" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
              <line x1="55" y1={60 + i * 20} x2="65" y2={60 + i * 20} stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
