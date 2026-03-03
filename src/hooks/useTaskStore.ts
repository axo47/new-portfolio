import { useState, useCallback } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: boolean;
  createdAt: number;
}

const STORAGE_KEY = "auraflow-tasks";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultTasks();
  } catch {
    return getDefaultTasks();
  }
}

function getDefaultTasks(): Task[] {
  return [
    { id: "1", title: "Review quarterly OKRs", completed: false, priority: true, createdAt: Date.now() - 3000 },
    { id: "2", title: "Deep work: finalize pitch deck", completed: false, priority: true, createdAt: Date.now() - 2000 },
    { id: "3", title: "Prepare standup notes", completed: false, priority: true, createdAt: Date.now() - 1000 },
    { id: "4", title: "Reply to design feedback", completed: false, priority: false, createdAt: Date.now() - 500 },
    { id: "5", title: "Update project timeline", completed: false, priority: false, createdAt: Date.now() - 400 },
    { id: "6", title: "Read research paper on diffusion models", completed: false, priority: false, createdAt: Date.now() - 300 },
  ];
}

function persist(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  const update = useCallback((fn: (prev: Task[]) => Task[]) => {
    setTasks((prev) => {
      const next = fn(prev);
      persist(next);
      return next;
    });
  }, []);

  const addTask = useCallback((title: string, priority: boolean = false) => {
    update((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, completed: false, priority, createdAt: Date.now() },
    ]);
  }, [update]);

  const toggleTask = useCallback((id: string) => {
    update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [update]);

  const deleteTask = useCallback((id: string) => {
    update((prev) => prev.filter((t) => t.id !== id));
  }, [update]);

  const editTask = useCallback((id: string, title: string) => {
    update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
  }, [update]);

  const togglePriority = useCallback((id: string) => {
    update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority: !t.priority } : t))
    );
  }, [update]);

  const priorityTasks = tasks.filter((t) => t.priority && !t.completed);
  const secondaryTasks = tasks.filter((t) => !t.priority && !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const totalActive = tasks.filter((t) => !t.completed).length;
  const completedCount = completedTasks.length;
  const progress = tasks.length === 0 ? 0 : completedCount / tasks.length;

  return {
    tasks,
    priorityTasks,
    secondaryTasks,
    completedTasks,
    totalActive,
    completedCount,
    progress,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    togglePriority,
  };
}
