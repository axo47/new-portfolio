import { motion } from "framer-motion";

interface TechItem {
  name: string;
  label: string;
  icon: () => JSX.Element;
}

interface TechModule {
  category: string;
  prefix: string;
  items: TechItem[];
}

// Wireframe Icons - Minimalist technical schematics
function PyTorchIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="16" cy="10" r="4" />
      <circle cx="8" cy="22" r="3" />
      <circle cx="24" cy="22" r="3" />
      <line x1="13" y1="12" x2="10" y2="20" />
      <line x1="19" y1="12" x2="22" y2="20" />
      <line x1="11" y1="22" x2="21" y2="22" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TensorFlowIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" />
      <line x1="16" y1="4" x2="16" y2="28" />
      <line x1="4" y1="10" x2="28" y2="10" />
      <line x1="4" y1="22" x2="28" y2="22" />
    </svg>
  );
}

function HuggingFaceIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="16" cy="16" r="10" />
      <circle cx="12" cy="14" r="2" />
      <circle cx="20" cy="14" r="2" />
      <path d="M11 20 Q16 24 21 20" />
      <line x1="8" y1="8" x2="5" y2="5" />
      <line x1="24" y1="8" x2="27" y2="5" />
    </svg>
  );
}

function LangChainIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="4" y="12" width="8" height="8" />
      <rect x="20" y="12" width="8" height="8" />
      <line x1="12" y1="16" x2="20" y2="16" />
      <circle cx="16" cy="16" r="2" />
      <line x1="8" y1="8" x2="8" y2="12" />
      <line x1="24" y1="8" x2="24" y2="12" />
      <line x1="8" y1="20" x2="8" y2="24" />
      <line x1="24" y1="20" x2="24" y2="24" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="4" y="14" width="24" height="12" />
      <rect x="6" y="16" width="4" height="4" />
      <rect x="12" y="16" width="4" height="4" />
      <rect x="18" y="16" width="4" height="4" />
      <rect x="12" y="10" width="4" height="4" />
      <path d="M28 18 Q30 16 28 14" />
    </svg>
  );
}

function KubernetesIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="4" />
      <line x1="16" y1="6" x2="16" y2="12" />
      <line x1="16" y1="20" x2="16" y2="26" />
      <line x1="6" y1="16" x2="12" y2="16" />
      <line x1="20" y1="16" x2="26" y2="16" />
      <line x1="9" y1="9" x2="13" y2="13" />
      <line x1="19" y1="19" x2="23" y2="23" />
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M4 20 L16 8 L28 20" />
      <path d="M8 18 L16 12 L24 18" />
      <line x1="4" y1="24" x2="28" y2="24" />
      <circle cx="10" cy="24" r="1.5" />
      <circle cx="16" cy="24" r="1.5" />
      <circle cx="22" cy="24" r="1.5" />
    </svg>
  );
}

function TerraformIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="4" y="8" width="8" height="8" />
      <rect x="14" y="8" width="8" height="8" />
      <rect x="14" y="18" width="8" height="8" />
      <line x1="12" y1="12" x2="14" y2="12" />
      <line x1="18" y1="16" x2="18" y2="18" />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="16" cy="16" r="3" />
      <ellipse cx="16" cy="16" rx="12" ry="5" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(120 16 16)" />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="4" y="4" width="24" height="24" />
      <text x="8" y="22" fontSize="12" fontFamily="JetBrains Mono" fill="currentColor" stroke="none">TS</text>
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" />
      <circle cx="16" cy="16" r="4" />
      <line x1="16" y1="4" x2="16" y2="12" />
      <line x1="16" y1="20" x2="16" y2="28" />
    </svg>
  );
}

function PostgresIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
      <ellipse cx="16" cy="8" rx="10" ry="4" />
      <path d="M6 8 L6 24 Q6 28 16 28 Q26 28 26 24 L26 8" />
      <ellipse cx="16" cy="16" rx="10" ry="4" />
      <line x1="6" y1="16" x2="6" y2="24" />
      <line x1="26" y1="16" x2="26" y2="24" />
    </svg>
  );
}

const techStack: TechModule[] = [
  {
    category: "ARTIFICIAL INTELLIGENCE",
    prefix: "MODULE",
    items: [
      { name: "PYTORCH", label: "Deep Learning", icon: PyTorchIcon },
      { name: "TENSORFLOW", label: "ML Framework", icon: TensorFlowIcon },
      { name: "HUGGINGFACE", label: "Transformers", icon: HuggingFaceIcon },
      { name: "LANGCHAIN", label: "LLM Orchestration", icon: LangChainIcon },
    ],
  },
  {
    category: "DEVOPS & INFRASTRUCTURE",
    prefix: "SYS",
    items: [
      { name: "DOCKER", label: "Containerization", icon: DockerIcon },
      { name: "KUBERNETES", label: "Orchestration", icon: KubernetesIcon },
      { name: "AWS", label: "Cloud Platform", icon: AWSIcon },
      { name: "TERRAFORM", label: "IaC", icon: TerraformIcon },
    ],
  },
  {
    category: "WEB DEVELOPMENT",
    prefix: "INTERFACE",
    items: [
      { name: "REACT", label: "UI Framework", icon: ReactIcon },
      { name: "TYPESCRIPT", label: "Type System", icon: TypeScriptIcon },
      { name: "NODE.JS", label: "Runtime", icon: NodeIcon },
      { name: "POSTGRES", label: "Database", icon: PostgresIcon },
    ],
  },
];

// Category Icons
function AIIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="8" cy="10" r="3" />
      <circle cx="8" cy="20" r="3" />
      <circle cx="8" cy="30" r="3" />
      <circle cx="20" cy="14" r="3" />
      <circle cx="20" cy="26" r="3" />
      <circle cx="32" cy="20" r="3" />
      <line x1="11" y1="10" x2="17" y2="14" />
      <line x1="11" y1="20" x2="17" y2="14" />
      <line x1="11" y1="20" x2="17" y2="26" />
      <line x1="11" y1="30" x2="17" y2="26" />
      <line x1="23" y1="14" x2="29" y2="20" />
      <line x1="23" y1="26" x2="29" y2="20" />
    </svg>
  );
}

function DevOpsIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="4" y="14" width="10" height="10" />
      <rect x="15" y="4" width="10" height="10" />
      <rect x="15" y="26" width="10" height="10" />
      <rect x="26" y="14" width="10" height="10" />
      <line x1="14" y1="19" x2="15" y2="14" />
      <line x1="14" y1="19" x2="15" y2="31" />
      <line x1="25" y1="9" x2="26" y2="19" />
      <line x1="25" y1="31" x2="26" y2="19" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="4" y="6" width="32" height="26" />
      <line x1="4" y1="12" x2="36" y2="12" />
      <circle cx="8" cy="9" r="1" />
      <circle cx="12" cy="9" r="1" />
      <circle cx="16" cy="9" r="1" />
      <path d="M12 22 L8 26 L12 30" />
      <path d="M28 22 L32 26 L28 30" />
      <line x1="18" y1="32" x2="22" y2="20" />
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
                  {category.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        className="selection-hover group flex items-center gap-4 p-3 border border-border hover:border-primary transition-all cursor-default hover:bg-primary/5"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: catIndex * 0.15 + itemIndex * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        {/* Wireframe Icon */}
                        <div className="wireframe-icon w-10 h-10 p-1 text-primary group-hover:text-glow">
                          <ItemIcon />
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-mono text-xs text-primary group-hover:text-glow">
                            [{category.prefix}: {item.name}]
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {item.label}
                          </div>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="w-1.5 h-1.5 bg-primary"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: itemIndex * 0.3 }}
                          />
                          <div className="font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            LOADED
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
