import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Trash2, Pencil, Star } from "lucide-react";
import type { Task } from "@/hooks/useTaskStore";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onTogglePriority: (id: string) => void;
  index: number;
  focusId?: string | null;
}

export function TaskCard({ task, onToggle, onDelete, onEdit, onTogglePriority, index, focusId }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const isFaded = focusId != null && focusId !== task.id;

  const handleSave = () => {
    const v = editValue.trim();
    if (v && v !== task.title) onEdit(task.id, v);
    setEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isFaded ? 0.15 : 1, y: 0, scale: isFaded ? 0.97 : 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      className="group relative glass-card px-5 py-4 flex items-center gap-4 transition-shadow hover:shadow-lg"
    >
      {/* Check circle */}
      <button
        onClick={() => onToggle(task.id)}
        className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
          task.completed
            ? "bg-primary border-primary"
            : "border-border hover:border-primary/50"
        }`}
      >
        {task.completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
      </button>

      {/* Title */}
      {editing ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          onBlur={handleSave}
          className="flex-1 bg-transparent text-foreground text-base outline-none border-b border-primary/30 pb-0.5"
        />
      ) : (
        <span
          className={`flex-1 text-base transition-all duration-300 ${
            task.completed ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {task.title}
        </span>
      )}

      {/* Actions — visible on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onTogglePriority(task.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            task.priority ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Star className="w-4 h-4" fill={task.priority ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => { setEditValue(task.title); setEditing(true); }}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
