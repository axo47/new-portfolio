import { motion } from "framer-motion";

// Enhanced mathematical formulas - including research-specific ones
const formulas = [
  // Backpropagation Chain Rule
  "∂E/∂w = ∂E/∂y · ∂y/∂w",
  // Cross-Entropy Loss
  "L = -Σ yᵢlog(ŷᵢ)",
  // Gradient Descent
  "θ = θ - α∇L(θ)",
  // Latin Hypercube Sampling constraint
  "Xᵢⱼ ∈ [(j-1)/n, j/n]",
  // Sigmoid activation
  "σ(z) = 1/(1+e⁻ᶻ)",
  // Softmax
  "softmax(zᵢ) = eᶻⁱ/Σeᶻʲ",
  // Bayes theorem
  "P(θ|D) ∝ P(D|θ)P(θ)",
  // Information Entropy
  "H(X) = -Σ p(x)log₂ p(x)",
  // ReLU
  "ReLU(x) = max(0, x)",
  // Laplacian
  "∇²f = ∂²f/∂x² + ∂²f/∂y²",
  // Eigenvalue problem
  "det(A - λI) = 0",
  // Jacobian
  "J = ∂(y₁,y₂)/∂(x₁,x₂)",
  // Integral
  "∫∫∫ f(x,y,z) dV",
  // Neural network sum
  "Σ_{i=1}^{n} xᵢwᵢ + b",
  // Tanh
  "tanh(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ)",
];

// Dynamic annotations
const annotations = [
  { text: "Δx = 0.001", x: "2%", y: "20%" },
  { text: "σ(z) = 1/(1+e⁻ᶻ)", x: "85%", y: "15%" },
  { text: "θ_optimized = true", x: "3%", y: "75%" },
  { text: "η = 0.001", x: "90%", y: "60%" },
  { text: "batch_size = 32", x: "88%", y: "85%" },
  { text: "epoch: 1000", x: "5%", y: "45%" },
  { text: "loss: 0.0023", x: "92%", y: "35%" },
];

// Coordinates for floating formulas
const coordinates = [
  { x: "5%", y: "8%" },
  { x: "88%", y: "12%" },
  { x: "3%", y: "32%" },
  { x: "82%", y: "42%" },
  { x: "8%", y: "58%" },
  { x: "85%", y: "68%" },
  { x: "42%", y: "5%" },
  { x: "55%", y: "92%" },
  { x: "75%", y: "25%" },
  { x: "15%", y: "48%" },
  { x: "65%", y: "55%" },
  { x: "25%", y: "75%" },
  { x: "78%", y: "82%" },
  { x: "10%", y: "88%" },
  { x: "35%", y: "18%" },
];

const matrixEquation = `
┌         ┐   ┌     ┐   ┌     ┐
│ w₁₁ w₁₂ │   │ x₁  │   │ y₁  │
│ w₂₁ w₂₂ │ × │ x₂  │ = │ y₂  │
│ w₃₁ w₃₂ │   └     ┘   │ y₃  │
└         ┘             └     ┘
`;

export function MathematicalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Fine grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(hsl(120 100% 50% / 0.1) 1px, transparent 1px),
          linear-gradient(90deg, hsl(120 100% 50% / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "10px 10px"
      }} />

      {/* Main Coordinate Axes */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(120 100% 50%)" strokeWidth="0.5" strokeDasharray="10,20" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(120 100% 50%)" strokeWidth="0.5" strokeDasharray="10,20" />
        <text x="98%" y="49%" fill="hsl(120 100% 50%)" fontSize="10" fontFamily="JetBrains Mono" opacity="0.5">X</text>
        <text x="51%" y="3%" fill="hsl(120 100% 50%)" fontSize="10" fontFamily="JetBrains Mono" opacity="0.5">Y</text>
      </svg>

      {/* Blueprint Markers - Floating coordinate axes */}
      <svg className="absolute opacity-15" style={{ left: "2%", top: "10%", width: "60px", height: "60px" }} viewBox="0 0 60 60">
        <line x1="5" y1="55" x2="55" y2="55" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <line x1="5" y1="55" x2="5" y2="5" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <line x1="5" y1="5" x2="10" y2="10" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <line x1="55" y1="55" x2="50" y2="50" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <text x="52" y="52" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">X</text>
        <text x="8" y="12" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">Y</text>
        <text x="2" y="58" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono">0</text>
      </svg>

      {/* Measurement Arrow */}
      <svg className="absolute opacity-10" style={{ right: "5%", top: "5%", width: "80px", height: "30px" }} viewBox="0 0 80 30">
        <line x1="5" y1="15" x2="75" y2="15" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <line x1="5" y1="10" x2="5" y2="20" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <line x1="75" y1="10" x2="75" y2="20" stroke="hsl(120 100% 50%)" strokeWidth="1" />
        <text x="30" y="10" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">↔ 45.2°</text>
      </svg>

      {/* Floating Formulas */}
      {formulas.map((formula, index) => (
        <motion.div
          key={index}
          className="absolute font-mono text-[10px] md:text-xs select-none hidden md:block"
          style={{
            left: coordinates[index]?.x,
            top: coordinates[index]?.y,
            color: "hsl(120 100% 50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.03, 0.12, 0.03] }}
          transition={{
            duration: 8 + index * 0.7,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {formula}
        </motion.div>
      ))}

      {/* Dynamic Annotations */}
      {annotations.map((annotation, index) => (
        <motion.div
          key={`annotation-${index}`}
          className="absolute font-mono text-[8px] md:text-[10px] select-none hidden lg:block"
          style={{
            left: annotation.x,
            top: annotation.y,
            color: "hsl(120 100% 50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.8,
          }}
        >
          [{annotation.text}]
        </motion.div>
      ))}

      {/* Matrix Equation - Left side */}
      <motion.pre
        className="absolute font-mono text-[8px] select-none hidden lg:block"
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
        className="absolute opacity-10 hidden md:block"
        style={{ right: "3%", top: "12%", width: "180px", height: "140px" }}
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
        {/* Vertical lines */}
        {[...Array(10)].map((_, i) => (
          <line
            key={`col-${i}`}
            x1={20 + i * 18}
            y1={75}
            x2={20 + i * 18 + 15}
            y2={140}
            stroke="hsl(120 100% 50%)"
            strokeWidth="0.4"
          />
        ))}
        {/* Gradient descent path - animated ball */}
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
        <text x="55" y="155" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">
          Gradient Descent Valley
        </text>
      </svg>

      {/* Sigmoid/ReLU Plot - Left Middle */}
      <svg
        className="absolute opacity-10 hidden md:block"
        style={{ left: "2%", top: "50%", width: "140px", height: "110px" }}
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
        
        <text x="45" y="115" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">
          σ(x) / ReLU
        </text>
      </svg>

      {/* Neural Network Node Topology - Right Middle */}
      <svg
        className="absolute opacity-8 hidden lg:block"
        style={{ right: "2%", top: "42%", width: "160px", height: "200px" }}
        viewBox="0 0 180 220"
      >
        {/* Layer labels */}
        <text x="12" y="15" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">INPUT</text>
        <text x="67" y="15" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">HIDDEN</text>
        <text x="130" y="15" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">OUTPUT</text>

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
              opacity="0.3"
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
              opacity="0.3"
            />
          ))
        )}

        <text x="55" y="200" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono" opacity="0.5">
          Neural Network Topology
        </text>
      </svg>

      {/* Vehicular Network Nodes (LINCS Lab research) - Bottom Center */}
      <svg
        className="absolute opacity-8 hidden lg:block"
        style={{ left: "35%", bottom: "5%", width: "200px", height: "100px" }}
        viewBox="0 0 200 100"
      >
        {/* Road */}
        <line x1="10" y1="60" x2="190" y2="60" stroke="hsl(120 100% 50%)" strokeWidth="1" strokeDasharray="10,5" />
        
        {/* Vehicles as nodes */}
        {[30, 80, 130, 170].map((x, i) => (
          <g key={`vehicle-${i}`}>
            <motion.rect
              x={x - 10}
              y={52}
              width="20"
              height="10"
              fill="none"
              stroke="hsl(120 100% 50%)"
              strokeWidth="1"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
            {/* Antenna */}
            <line x1={x} y1={52} x2={x} y2={42} stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
            <circle cx={x} cy={40} r="3" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Communication links */}
        <path d="M 30 40 Q 55 20 80 40" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="0.5" strokeDasharray="2,2" />
        <path d="M 80 40 Q 105 20 130 40" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="0.5" strokeDasharray="2,2" />
        <path d="M 130 40 Q 150 25 170 40" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="0.5" strokeDasharray="2,2" />
        
        <text x="60" y="90" fill="hsl(120 100% 50%)" fontSize="7" fontFamily="JetBrains Mono">
          V2X Network Topology
        </text>
      </svg>

      {/* Latin Hypercube Grid - Bottom Left */}
      <svg
        className="absolute opacity-8 hidden md:block"
        style={{ left: "5%", bottom: "8%", width: "120px", height: "120px" }}
        viewBox="0 0 120 120"
      >
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`lh-${i}`}>
            <line x1={10 + i * 25} y1="10" x2={10 + i * 25} y2="110" stroke="hsl(120 100% 50%)" strokeWidth="0.3" />
            <line x1="10" y1={10 + i * 25} x2="110" y2={10 + i * 25} stroke="hsl(120 100% 50%)" strokeWidth="0.3" />
          </g>
        ))}
        
        {/* LHS sample points */}
        {[[22, 85], [47, 35], [72, 60], [97, 22]].map(([x, y], i) => (
          <motion.circle
            key={`lhs-${i}`}
            cx={x}
            cy={y}
            r="4"
            fill="hsl(120 100% 50%)"
            opacity="0.6"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
        
        <text x="15" y="118" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono">
          Latin Hypercube
        </text>
      </svg>

      {/* Gaussian Distribution - Bottom Right */}
      <svg
        className="absolute opacity-8 hidden md:block"
        style={{ right: "5%", bottom: "10%", width: "130px", height: "100px" }}
        viewBox="0 0 140 100"
      >
        {/* Axes */}
        <line x1="10" y1="80" x2="130" y2="80" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
        <line x1="70" y1="10" x2="70" y2="85" stroke="hsl(120 100% 50%)" strokeWidth="0.5" />
        
        {/* Gaussian curve */}
        <path
          d="M 15 80 Q 30 75 40 60 Q 50 35 70 20 Q 90 35 100 60 Q 110 75 125 80"
          fill="none"
          stroke="hsl(120 100% 50%)"
          strokeWidth="1"
        />
        
        {/* Labels */}
        <text x="125" y="85" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">x</text>
        <text x="72" y="18" fill="hsl(120 100% 50%)" fontSize="8" fontFamily="JetBrains Mono">p(x)</text>
        <text x="45" y="95" fill="hsl(120 100% 50%)" fontSize="6" fontFamily="JetBrains Mono">
          N(μ,σ²)
        </text>
      </svg>

      {/* Pulsing data nodes scattered */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-1.5 h-1.5 border border-primary hidden md:block"
          style={{
            left: `${15 + i * 10}%`,
            top: `${25 + (i % 4) * 18}%`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
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