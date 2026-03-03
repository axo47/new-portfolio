import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Command } from "lucide-react";

interface CommandBarProps {
  onAddTask: (title: string, priority: boolean) => void;
  onToggleDrawer: () => void;
  onToggleFocus: () => void;
}

export function CommandBar({ onAddTask, onToggleDrawer, onToggleFocus }: CommandBarProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = () => {
    const val = input.trim();
    if (!val) return;

    if (val.startsWith("/drawer")) {
      onToggleDrawer();
    } else if (val.startsWith("/focus")) {
      onToggleFocus();
    } else if (val.startsWith("!")) {
      onAddTask(val.slice(1).trim(), true);
    } else {
      onAddTask(val, false);
    }
    setInput("");
    setOpen(false);
  };

  return (
    <>
      {/* Trigger pill */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-card flex items-center gap-3 px-5 py-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Command className="w-3.5 h-3.5" />
          <span>K</span>
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Add a task or type a command…
        </span>
        <Plus className="w-4 h-4 text-muted-foreground" />
      </motion.button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-foreground/5 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-[30%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg px-4"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="glass-card shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder='Type a task, or "!" for priority…'
                    className="flex-1 bg-transparent text-foreground text-base outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div className="px-5 py-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground font-mono text-[10px]">!</kbd>
                    priority
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground font-mono text-[10px]">/drawer</kbd>
                    toggle drawer
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground font-mono text-[10px]">/focus</kbd>
                    focus mode
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
