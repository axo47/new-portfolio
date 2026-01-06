import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-xs text-muted-foreground mb-4">
            [----------------] ESTABLISH CONNECTION [----------------]
          </div>
          <h2 className="font-mono text-2xl md:text-3xl text-primary text-glow">
            CONTACT INTERFACE
          </h2>
        </motion.div>

        {/* Contact Terminal */}
        <motion.div
          className="blueprint-container p-8 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Corner Markers */}
          <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono">+</span>
          <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono">+</span>

          {/* Terminal Prompt */}
          <div className="font-mono text-sm text-muted-foreground mb-6">
            <span className="text-primary">guest@portfolio</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">~/contact</span>
            <span className="text-foreground">$ ls -la channels/</span>
          </div>

          {/* Contact Links */}
          <div className="space-y-4">
            {[
              { label: "EMAIL", value: "hello@example.com", prefix: "drwxr-xr-x" },
              { label: "GITHUB", value: "github.com/username", prefix: "-rw-r--r--" },
              { label: "LINKEDIN", value: "linkedin.com/in/username", prefix: "-rw-r--r--" },
              { label: "TWITTER", value: "@username", prefix: "-rw-r--r--" },
            ].map((contact, index) => (
              <motion.div
                key={contact.label}
                className="selection-hover group flex items-center gap-4 p-3 border border-border hover:border-primary transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                  {contact.prefix}
                </span>
                <span className="font-mono text-xs text-primary">
                  [{contact.label}]
                </span>
                <span className="font-mono text-sm text-foreground group-hover:text-glow transition-all">
                  {contact.value}
                </span>
                <span className="ml-auto font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {"->"}
                </span>
              </motion.div>
            ))}
          </div>

          {/* ASCII Separator */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="font-mono text-xs text-muted-foreground text-center">
              [EOF] --- CONNECTION PROTOCOLS AVAILABLE --- [EOF]
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="font-mono text-xs text-muted-foreground">
            <pre className="inline-block text-left">
{`╔════════════════════════════════════════╗
║  SYSTEM: PORTFOLIO v2.0.25             ║
║  STATUS: OPERATIONAL                   ║
║  © 2025 ALL RIGHTS RESERVED            ║
╚════════════════════════════════════════╝`}
            </pre>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
