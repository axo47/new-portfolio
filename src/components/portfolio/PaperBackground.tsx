import { useMemo, type CSSProperties } from "react";

/**
 * Background, all in faint ink-blue:
 *  - drifting math glyphs (PolyMath), including relational-algebra symbols for the database side
 */

const GLYPHS = ["∫", "∑", "π", "∞", "∂", "∇", "λ", "θ", "σ", "⋈", "∈", "∀", "∃", "≈", "√", "Δ", "φ", "ψ", "Ω", "ℝ", "∮", "±", "∏", "ε", "x", "y", "f", "ℤ"];

const FORMULAS = [
  { text: "σ_p(R) ⋈ S", x: "3%", y: "14%" },
  { text: "π_A(R ∪ S)", x: "84%", y: "10%" },
  { text: "Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V", x: "52%", y: "4%" },
  { text: "A = UΣVᵀ", x: "6%", y: "40%" },
  { text: "θ̂ = argmax ℓ(θ)", x: "86%", y: "34%" },
  { text: "O(n log n)", x: "4%", y: "64%" },
  { text: "P(A|B) = P(B|A)P(A)/P(B)", x: "70%", y: "58%" },
  { text: "∇f(x*) = 0", x: "88%", y: "78%" },
  { text: "KL(P‖Q) = ΣP(x)log(P(x)/Q(x))", x: "8%", y: "88%" },
  { text: "R ⋈ S = σ_{R.a=S.a}(R × S)", x: "56%", y: "92%" },
];

export const PaperBackground = () => {
  const glyphs = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        symbol: GLYPHS[i % GLYPHS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 18 + Math.random() * 46,
        opacity: 0.05 + Math.random() * 0.05,
        duration: 26 + Math.random() * 26,
        delay: -Math.random() * 30,
        dx: 30 + Math.random() * 70,
        dy: 20 + Math.random() * 50,
        rot: 8 + Math.random() * 24,
      })),
    [],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-primary">
      {/* Formulas from the Nexus of Reason, with relational algebra for the database side */}
      <div className="hidden md:block">
        {FORMULAS.map((f, i) => (
          <span
            key={i}
            className="font-mono-math absolute select-none whitespace-nowrap text-[12px]"
            style={
              {
                left: f.x,
                top: f.y,
                opacity: 0.2,
                "--dx": "26px",
                "--dy": "18px",
                "--rot": "0deg",
                animation: `math-float ${34 + i * 3}s ease-in-out ${-i * 5}s infinite alternate`,
              } as CSSProperties
            }
          >
            {f.text}
          </span>
        ))}
      </div>

      {/* Drifting glyphs */}
      {glyphs.map((g) => (
        <span
          key={g.id}
          className="font-academic absolute select-none"
          style={
            {
              left: `${g.x}%`,
              top: `${g.y}%`,
              fontSize: `${g.size}px`,
              opacity: g.opacity,
              "--dx": `${g.dx}px`,
              "--dy": `${g.dy}px`,
              "--rot": `${g.rot}deg`,
              animation: `math-float ${g.duration}s ease-in-out ${g.delay}s infinite alternate`,
            } as CSSProperties
          }
        >
          {g.symbol}
        </span>
      ))}
    </div>
  );
};
