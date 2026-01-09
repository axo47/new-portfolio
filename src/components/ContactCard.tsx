import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

export const ContactCard = () => {
  return (
    <section id="contact" className="relative z-10 py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass-card p-8 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Heading */}
            <motion.h2
              className="section-heading mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="gradient-text">Let's Connect</span>
            </motion.h2>
            
            <motion.p
              className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Interested in collaboration, research opportunities, or just want to discuss 
              the intersection of AI and Mathematics? I'd love to hear from you.
            </motion.p>

            {/* Contact Links */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a 
                href="mailto:kevin.dzzedine@email.com" 
                className="glass-card glass-card-hover px-6 py-4 flex items-center gap-3 group"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">Email</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              
              <a 
                href="https://linkedin.com/in/kevindzzedine" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover px-6 py-4 flex items-center gap-3 group"
              >
                <Linkedin className="w-5 h-5 text-primary" />
                <span className="text-sm">LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              
              <a 
                href="https://github.com/kevindzzedine" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover px-6 py-4 flex items-center gap-3 group"
              >
                <Github className="w-5 h-5 text-primary" />
                <span className="text-sm">GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a href="mailto:kevin.dzzedine@email.com" className="btn-premium inline-flex items-center gap-2">
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-12 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© 2024 Kevin Dzzedine. Designed with precision.</p>
        </motion.footer>
      </div>
    </section>
  );
};
