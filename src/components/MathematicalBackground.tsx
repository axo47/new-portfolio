import { motion } from "framer-motion";

// Enhanced mathematical formulas
const formulas = [
  "∇L(θ) = ∂L/∂θ",
  "∫∫∫ f(x,y,z) dV",
  "Σ_{i=1}^{n} xᵢwᵢ + b",
  "∂E/∂w = ∂E/∂y · ∂y/∂w",
  "P(θ|D) ∝ P(D|θ)P(θ)",
  "H(X) = -Σ p(x)log₂ p(x)",
  "σ(z) = 1/(1+e^{-z})",
  "ReLU(x) = max(0, x)",
  "softmax(zᵢ) = e^{zᵢ}/Σe^{zⱼ}",
  "∇²f = ∂²f/∂x² + ∂²f/∂y²",
  "det(A - λI) = 0",
  "||∇f||² = (∂f/∂x)² + (∂f/∂y)²",
  "J = ∂(y₁,y₂)/∂(x₁,x₂)",
  "∮ F · dr = 0",
  "tanh(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ)",
];

const matrixEquation = `
┌         ┐   ┌     ┐   ┌     ┐
│ w₁₁ w₁₂ │   │ x₁  │   │ y₁  │
│ w₂₁ w₂₂ │ × │ x₂  │ = │ y₂  │
│ w₃₁ w₃₂ │   └     ┘   │ y₃  │
└         ┘             └     ┘
`;

const coordinates = [
  { x: "5%", y: "8%" },
  { x: "92%", y: "12%" },
  { x: "3%", y: "35%" },
  { x: "88%", y: "42%" },
  { x: "8%", y: "62%" },
  { x: "85%", y: "70%" },
  { x: "45%", y: "5%" },
  { x: "55%", y: "95%" },
  { x: "78%", y: "28%" },
  { x: "18%", y: "48%" },
  { x: "68%", y: "58%" },
  { x: "28%", y: "78%" },
  { x: "82%", y: "88%" },
  { x: "12%", y: "92%" },
  { x: "38%", y: "22%" },
];

export function MathematicalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Additional fine grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(hsl(120 100% 50% / 0.1) 1px, transparent 1px),
          linear-gradient(90deg, hsl(120 100% 50% / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "10px 10px"
      }} />

      {/* Main Coordinate Axes */}
      <svg className="absolute inset-0 w-full h-full opacity-8">
        {/* Main axes */}
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(120 100% 50%)" strokeWidth="0.5" strokeDasharray="10,20" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(120 100% 50%)" strokeWidth="0.5" strokeDasharray="10,20" />
        
        {/* Axis labels */}
        <text x="98%" y="49%" fill="hsl(120 100% 50%)" fontSize="12" fontFamily="JetBrains Mono" opacity="0.3">x</text>
        <text x="51%" y="3%" fill="hsl(120 100% 50%)" fontSize="12" fontFamily="JetBrains Mono" opacity="0.3">y</text>
      </svg>

      {/* Floating Formulas */}
      {formulas.map((formula, index) => (
        <motion.div
          key={index}
          className="absolute font-mono text-xs select-none"
          style={{
            left: coordinates[index]?.x,
            top: coordinates[index]?.y,
            color: "hsl(120 100% 50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.03, 0.15, 0.03] }}
          transition={{
            duration: 8 + index * 0.7,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {formula}
        </motion.div>
      ))}

      {/* Matrix Equation - Left side */}
      <motion.pre
        className="absolute font-mono text-xs select-none"
        style={{
          left: "2%",
          top: "15%",
          color: "hsl(120 100% 50%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.02, 0.08, 0.02] }}
        transition={{ duration: 12, repeat: Infinity }}
      >
        {matrixEquation}
      </motion.pre>

      {/* 3D Gradient Descent Landscape - Top Right */}
      <svg
        className="absolute opacity-8"
        style={{ right: "3%", top: "8%", width: "200px", height: "160px" }}
        viewBox="0 0 200 160"
      >
        {/* 3D surface wireframe */}
        {[...Array(8)].map((_, i) => (
          <path
            key={`row-${i}`}
            d={`M ${10 + i * 10} ${80 + i * 8} 
                Q ${60 + i * 5} ${40 + i * 10 + Math.sin(i) * 20} ${100} ${50 + i * 8}
                Q ${140 - i * 5} ${30 + i * 10 + Math.cos(i) * 15} ${190 - i * 10} ${80 + i * 8}`}
            fill="none"
            stroke="hsl(120 100% 50%)"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <line
            key={`col-${i}`}
            x1={20 + i * 18}
            y1={75}
            x2={20 + i * 18 + 15}
            y2={140}
            stroke="hsl(120 100% 50%)"
            strokeWidth="0.5"
          />
        ))}
        {/* Gradient descent path */}
        <motion.circle
          cx="100"
          cy="85"
          r="3"
          fill="hsl(120 100% 50%)"
          animate={{
            cx: [100, 85, 95, 90],
            cy: [85, 95, 100, 105],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <text x="70" y="155" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">
          Loss Landscape
        </text>
      </svg>

      {/* Sigmoid/ReLU Plot - Left Middle */}
      <svg
        className="absolute opacity-8"
        style={{ left: "2%", top: "55%", width: "150px", height: "120px" }}
        viewBox="0 0 150 120"
      >
        {/* Axes */}
        <line x1="20" y1="60" x2="140" y2="60" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
        <line x1="75" y1="10" x2="75" y2="110" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
        
        {/* Sigmoid curve */}
        <path
          d="M 25 100 Q 45 100 55 95 Q 65 85 75 60 Q 85 35 95 25 Q 105 20 130 20"
          fill="none"
          stroke="hsl(120 100% 50%)"
          strokeWidth="1"
        />
        
        {/* ReLU (dashed) */}
        <path
          d="M 25 60 L 75 60 L 130 20"
          fill="none"
          stroke="hsl(180 100% 50%)"
          strokeWidth="0.5"
          strokeDasharray="3,3"
        />
        
        <text x="50" y="115" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">
          σ(x) / ReLU
        </text>
      </svg>

      {/* Neural Network Schematic - Right Middle */}
      <svg
        className="absolute opacity-6"
        style={{ right: "2%", top: "45%", width: "180px", height: "220px" }}
        viewBox="0 0 180 220"
      >
        {/* Layer labels */}
        <text x="15" y="15" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">
          INPUT
        </text>
        <text x="70" y="15" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">
          HIDDEN
        </text>
        <text x="135" y="15" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">
          OUTPUT
        </text>

        {/* Input layer nodes */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`in-${i}`}
            cx="25"
            cy={35 + i * 45}
            r="8"
            fill="none"
            stroke="hsl(120 100% 50%)"
            strokeWidth="1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}

        {/* Hidden layer nodes */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={`hid-${i}`}
            cx="90"
            cy={30 + i * 38}
            r="8"
            fill="none"
            stroke="hsl(120 100% 50%)"
            strokeWidth="1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
          />
        ))}

        {/* Output layer nodes */}
        {[0, 1].map((i) => (
          <motion.circle
            key={`out-${i}`}
            cx="155"
            cy={75 + i * 70}
            r="8"
            fill="none"
            stroke="hsl(120 100% 50%)"
            strokeWidth="1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}

        {/* Connections - Input to Hidden */}
        {[0, 1, 2, 3].map((i) =>
          [0, 1, 2, 3, 4].map((j) => (
            <line
              key={`conn1-${i}-${j}`}
              x1="33"
              y1={35 + i * 45}
              x2="82"
              y2={30 + j * 38}
              stroke="hsl(120 100% 50%)"
              strokeWidth="0.3"
              opacity="0.4"
            />
          ))
        )}

        {/* Connections - Hidden to Output */}
        {[0, 1, 2, 3, 4].map((i) =>
          [0, 1].map((j) => (
            <line
              key={`conn2-${i}-${j}`}
              x1="98"
              y1={30 + i * 38}
              x2="147"
              y2={75 + j * 70}
              stroke="hsl(120 100% 50%)"
              strokeWidth="0.3"
              opacity="0.4"
            />
          ))
        )}

        {/* Weight labels */}
        <text x="55" y="90" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono" opacity="0.5">
          w₁
        </text>
        <text x="120" y="100" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono" opacity="0.5">
          w₂
        </text>
      </svg>

      {/* Cartesian Grid with Function - Bottom Left */}
      <svg
        className="absolute opacity-6"
        style={{ left: "5%", bottom: "5%", width: "140px", height: "140px" }}
        viewBox="0 0 140 140"
      >
        {/* Grid */}
        {[...Array(7)].map((_, i) => (
          <g key={i}>
            <line x1={20 + i * 20} y1="10" x2={20 + i * 20} y2="130" stroke="hsl(120 100% 50%)" strokeWidth="0.2" />
            <line x1="10" y1={20 + i * 20} x2="130" y2={20 + i * 20} stroke="hsl(120 100% 50%)" strokeWidth="0.2" />
          </g>
        ))}
        
        {/* Axes */}
        <line x1="10" y1="70" x2="130" y2="70" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
        <line x1="70" y1="10" x2="70" y2="130" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
        
        {/* Gaussian curve */}
        <path
          d="M 20 110 Q 35 100 45 70 Q 55 30 70 25 Q 85 30 95 70 Q 105 100 120 110"
          fill="none"
          stroke="hsl(120 100% 50%)"
          strokeWidth="1"
        />
        
        {/* Labels */}
        <text x="125" y="75" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">x</text>
        <text x="73" y="18" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">y</text>
        <text x="40" y="135" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono">
          N(μ,σ²)
        </text>
      </svg>

      {/* Data Flow Diagram - Bottom Right */}
      <svg
        className="absolute opacity-5"
        style={{ right: "5%", bottom: "8%", width: "160px", height: "100px" }}
        viewBox="0 0 160 100"
      >
        {/* Boxes */}
        <rect x="5" y="35" width="30" height="30" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <rect x="65" y="35" width="30" height="30" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <rect x="125" y="35" width="30" height="30" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        
        {/* Arrows */}
        <line x1="35" y1="50" x2="60" y2="50" stroke="hsl(120 100% 50%)" strokeWidth="1" markerEnd="url(#arrow)" />
        <line x1="95" y1="50" x2="120" y2="50" stroke="hsl(120 100% 50%)" strokeWidth="1" markerEnd="url(#arrow)" />
        
        {/* Labels */}
        <text x="10" y="55" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono">X</text>
        <text x="75" y="55" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono">f</text>
        <text x="135" y="55" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono">Y</text>
        <text x="60" y="90" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">Pipeline</text>
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="hsl(120 100% 50%)" />
          </marker>
        </defs>
      </svg>

      {/* Pulsing data nodes scattered */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-1.5 h-1.5 border border-primary"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 25}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
