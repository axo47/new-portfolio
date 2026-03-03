import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TaskCard } from "./TaskCard";
import type { Task } from "@/hooks/useTaskStore";

interface TaskDrawerProps {
  open: boolean;
  onClose: () => void;
  tasks: Task[];
  completedTasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onTogglePriority: (id: string) => void;
}

export function TaskDrawer({ open, onClose, tasks, completedTasks, onToggle, onDelete, onEdit, onTogglePriority }: TaskDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">All Tasks</h2>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Secondary tasks */}
              {tasks.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Backlog</p>
                  <div className="space-y-2">
                    {tasks.map((t, i) => (
                      <TaskCard
                        key={t.id}
                        task={t}
                        index={i}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onTogglePriority={onTogglePriority}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed */}
              {completedTasks.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Completed</p>
                  <div className="space-y-2">
                    {completedTasks.map((t, i) => (
                      <TaskCard
                        key={t.id}
                        task={t}
                        index={i}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onTogglePriority={onTogglePriority}
                      />
                    ))}
                  </div>
                </div>
              )}

              {tasks.length === 0 && completedTasks.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-12">No tasks yet. Press ⌘K to add one.</p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
