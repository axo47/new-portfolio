import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronRight } from "lucide-react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { CommandBar } from "@/components/auraflow/CommandBar";
import { TaskCard } from "@/components/auraflow/TaskCard";
import { ProgressOrb } from "@/components/auraflow/ProgressOrb";
import { TaskDrawer } from "@/components/auraflow/TaskDrawer";

const Index = () => {
  const store = useTaskStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);

  const handleToggleFocus = () => {
    if (focusMode) {
      setFocusMode(false);
      setFocusId(null);
    } else {
      setFocusMode(true);
      // Focus on the first priority task
      if (store.priorityTasks.length > 0) {
        setFocusId(store.priorityTasks[0].id);
      }
    }
  };

  const handleTaskClick = (id: string) => {
    if (focusMode) {
      setFocusId(id);
    }
  };

  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: "radial-gradient(circle, hsl(239 84% 67% / 0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(239 84% 67% / 0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Main layout */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-32">
        {/* Header */}
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-foreground">AuraFlow</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mt-8 leading-tight">
            {greeting}.
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {store.totalActive === 0
              ? "All clear. Enjoy the calm."
              : `You have ${store.totalActive} task${store.totalActive !== 1 ? "s" : ""} to flow through.`}
          </p>

          {/* Focus mode indicator */}
          <AnimatePresence>
            {focusMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Focus Mode — click a task to lock in
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Progress + Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Priority Canvas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Today's Focus
              </h2>
              <span className="text-xs text-muted-foreground">
                {store.priorityTasks.length} task{store.priorityTasks.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {store.priorityTasks.map((task, i) => (
                  <div key={task.id} onClick={() => handleTaskClick(task.id)} className="cursor-pointer">
                    <TaskCard
                      task={task}
                      index={i}
                      focusId={focusMode ? focusId : null}
                      onToggle={store.toggleTask}
                      onDelete={store.deleteTask}
                      onEdit={store.editTask}
                      onTogglePriority={store.togglePriority}
                    />
                  </div>
                ))}
              </AnimatePresence>

              {store.priorityTasks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="text-muted-foreground text-sm">No priority tasks.</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-xs font-mono">⌘K</kbd> and prefix with <kbd className="px-1.5 py-0.5 rounded bg-secondary text-xs font-mono">!</kbd> to add one.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Drawer trigger */}
            <motion.button
              onClick={() => setDrawerOpen(true)}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              whileHover={{ x: 4 }}
            >
              <span>{store.secondaryTasks.length + store.completedTasks.length} more tasks</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </motion.section>

          {/* Progress Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center md:pt-8"
          >
            <ProgressOrb
              progress={store.progress}
              completed={store.completedCount}
              total={store.tasks.length}
            />
          </motion.div>
        </div>
      </div>

      {/* Command Bar */}
      <CommandBar
        onAddTask={store.addTask}
        onToggleDrawer={() => setDrawerOpen((o) => !o)}
        onToggleFocus={handleToggleFocus}
      />

      {/* Task Drawer */}
      <TaskDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        tasks={store.secondaryTasks}
        completedTasks={store.completedTasks}
        onToggle={store.toggleTask}
        onDelete={store.deleteTask}
        onEdit={store.editTask}
        onTogglePriority={store.togglePriority}
      />
    </div>
  );
};

export default Index;
