import { motion } from "framer-motion";

interface TechModule {
  category: string;
  prefix: string;
  items: { name: string; label: string }[];
}

const techStack: TechModule[] = [
  {
    category: "ARTIFICIAL INTELLIGENCE",
    prefix: "MODULE",
    items: [
      { name: "PYTORCH", label: "Deep Learning" },
      { name: "TENSORFLOW", label: "ML Framework" },
      { name: "HUGGINGFACE", label: "Transformers" },
      { name: "LANGCHAIN", label: "LLM Orchestration" },
    ],
  },
  {
    category: "DEVOPS & INFRASTRUCTURE",
    prefix: "SYS",
    items: [
      { name: "DOCKER", label: "Containerization" },
      { name: "KUBERNETES", label: "Orchestration" },
      { name: "AWS", label: "Cloud Platform" },
      { name: "TERRAFORM", label: "IaC" },
    ],
  },
  {
    category: "WEB DEVELOPMENT",
    prefix: "INTERFACE",
    items: [
      { name: "REACT", label: "UI Framework" },
      { name: "TYPESCRIPT", label: "Type System" },
      { name: "NODE.JS", label: "Runtime" },
      { name: "POSTGRES", label: "Database" },
    ],
  },
];

// AI/Neural Network Icon
function AIIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      {/* Input nodes */}
      <circle cx="8" cy="12" r="3" />
      <circle cx="8" cy="24" r="3" />
      <circle cx="8" cy="36" r="3" />
      {/* Hidden layer */}
      <circle cx="24" cy="16" r="3" />
      <circle cx="24" cy="32" r="3" />
      {/* Output */}
      <circle cx="40" cy="24" r="3" />
      {/* Connections */}
      <line x1="11" y1="12" x2="21" y2="16" />
      <line x1="11" y1="24" x2="21" y2="16" />
      <line x1="11" y1="36" x2="21" y2="32" />
      <line x1="11" y1="24" x2="21" y2="32" />
      <line x1="27" y1="16" x2="37" y2="24" />
      <line x1="27" y1="32" x2="37" y2="24" />
    </svg>
  );
}

// DevOps/Flow Icon
function DevOpsIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      {/* Boxes */}
      <rect x="4" y="18" width="10" height="10" />
      <rect x="19" y="8" width="10" height="10" />
      <rect x="19" y="28" width="10" height="10" />
      <rect x="34" y="18" width="10" height="10" />
      {/* Arrows */}
      <line x1="14" y1="23" x2="19" y2="18" />
      <line x1="14" y1="23" x2="19" y2="33" />
      <line x1="29" y1="13" x2="34" y2="23" />
      <line x1="29" y1="33" x2="34" y2="23" />
      {/* Arrow heads */}
      <path d="M17 17 L19 18 L18 20" />
      <path d="M17 35 L19 33 L18 31" />
    </svg>
  );
}

// Web/Interface Icon
function WebIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      {/* Browser frame */}
      <rect x="4" y="8" width="40" height="32" />
      <line x1="4" y1="16" x2="44" y2="16" />
      {/* Browser dots */}
      <circle cx="10" cy="12" r="1.5" />
      <circle cx="16" cy="12" r="1.5" />
      <circle cx="22" cy="12" r="1.5" />
      {/* Code brackets */}
      <path d="M16 26 L12 30 L16 34" />
      <path d="M32 26 L36 30 L32 34" />
      <line x1="20" y1="36" x2="28" y2="24" />
    </svg>
  );
}

const categoryIcons: Record<string, () => JSX.Element> = {
  "ARTIFICIAL INTELLIGENCE": AIIcon,
  "DEVOPS & INFRASTRUCTURE": DevOpsIcon,
  "WEB DEVELOPMENT": WebIcon,
};

export function TechStackSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-xs text-muted-foreground mb-4">
            [----------------] SYSTEM MODULES [----------------]
          </div>
          <h2 className="font-mono text-2xl md:text-3xl text-primary text-glow">
            TECH STACK
          </h2>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techStack.map((category, catIndex) => {
            const IconComponent = categoryIcons[category.category];
            return (
              <motion.div
                key={category.category}
                className="blueprint-container p-6 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              >
                {/* Corner Markers */}
                <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
                <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono">+</span>

                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                  <div className="text-primary">
                    <IconComponent />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">
                      [{category.prefix}_CATEGORY]
                    </div>
                    <h3 className="font-mono text-sm text-primary text-glow">
                      {category.category}
                    </h3>
                  </div>
                </div>

                {/* Tech Items */}
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="selection-hover group flex items-center gap-3 p-3 border border-border hover:border-primary transition-colors cursor-default"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIndex * 0.15 + itemIndex * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-2 h-2 border border-primary node-pulse" />
                      <div className="flex-1">
                        <div className="font-mono text-xs text-primary">
                          [{category.prefix}: {item.name}]
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {item.label}
                        </div>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {">>"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
