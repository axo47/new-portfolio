import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "ascii" | "system";
  content: string;
  prompt?: string;
}

const QUICK_COMMANDS = ["ls", "fastfetch", "help", "clear"];

const FASTFETCH_ASCII = `
   █████╗ ██╗      ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
  ██╔══██╗██║      ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
  ███████║██║█████╗███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
  ██╔══██║██║╚════╝╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
  ██║  ██║██║      ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
  ╚═╝  ╚═╝╚═╝      ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
`;

const SYSTEM_SPECS = `
  ┌────────────────────────────────────────────────────┐
  │  OS       │  Poly-OS v8.0 (Neural Architecture)   │
  │  User     │  K. Ezzedine                          │
  │  Kernel   │  AI-Math-Engine (Hybrid Core)         │
  │  Uptime   │  99.9% (continuous operation)         │
  │  Shell    │  neural-sh 4.2.1                      │
  │  CPU      │  Neural Processor x86_64 (128 cores)  │
  │  GPU      │  NVIDIA A100 x8 (Tensor Accelerated)  │
  │  Memory   │  64TB Tensors / 512GB System          │
  │  Network  │  Distributed Mesh (10Gbps backbone)   │
  │  Status   │  ■ OPERATIONAL                        │
  └────────────────────────────────────────────────────┘
`;

const LS_OUTPUT = `
  total 6
  drwxr-xr-x  2 guest ai-system  4096 Jan  8 12:00 /about
  drwxr-xr-x  3 guest ai-system  4096 Jan  8 12:00 /experience
  drwxr-xr-x  4 guest ai-system  8192 Jan  8 12:00 /projects
  drwxr-xr-x  3 guest ai-system  4096 Jan  8 12:00 /skills
  -rw-r--r--  1 guest ai-system  2048 Jan  8 12:00 /contact
`;

const HELP_OUTPUT = `
  Available Commands:
  ─────────────────────────────────────────────
  fastfetch    Display system information
  ls           List portfolio sections
  help         Show this help message
  clear        Clear terminal
  whoami       Display current user
  date         Show current date/time
  cat [file]   Read file contents
  ─────────────────────────────────────────────
`;

const WHOAMI_OUTPUT = `  guest@ai-portfolio (visitor session)`;

const CAT_CONTACT = `
  ┌─────────────────────────────────────────┐
  │           CONTACT INFORMATION           │
  ├─────────────────────────────────────────┤
  │  Email    │  hello@ai-engineer.dev      │
  │  GitHub   │  github.com/ai-engineer     │
  │  LinkedIn │  linkedin.com/in/ai-eng     │
  │  Location │  Global / Remote            │
  └─────────────────────────────────────────┘
`;

export function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", content: "AI-SYSTEM TERMINAL v2.0.1" },
    { type: "system", content: "Type 'help' for available commands." },
    { type: "output", content: "" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(" ");
    const mainCmd = args[0];

    let output: TerminalLine[] = [];

    switch (mainCmd) {
      case "fastfetch":
        output = [
          { type: "ascii", content: FASTFETCH_ASCII },
          { type: "output", content: SYSTEM_SPECS },
        ];
        break;
      case "ls":
        output = [{ type: "output", content: LS_OUTPUT }];
        break;
      case "help":
        output = [{ type: "output", content: HELP_OUTPUT }];
        break;
      case "clear":
        setHistory([
          { type: "system", content: "AI-SYSTEM TERMINAL v2.0.1" },
          { type: "system", content: "Type 'help' for available commands." },
          { type: "output", content: "" },
        ]);
        return;
      case "whoami":
        output = [{ type: "output", content: WHOAMI_OUTPUT }];
        break;
      case "date":
        output = [
          {
            type: "output",
            content: `  ${new Date().toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}`,
          },
        ];
        break;
      case "cat":
        if (args[1] === "contact.txt") {
          output = [{ type: "output", content: CAT_CONTACT }];
        } else if (args[1]) {
          output = [
            { type: "output", content: `  cat: ${args[1]}: Permission denied or file not found` },
          ];
        } else {
          output = [{ type: "output", content: "  cat: missing operand" }];
        }
        break;
      case "":
        output = [];
        break;
      default:
        output = [
          {
            type: "output",
            content: `  Command not found: ${mainCmd}. Type 'help' for available commands.`,
          },
        ];
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", content: cmd, prompt: "guest@portfolio:~$ " },
      ...output,
    ]);

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-4xl w-full">
        {/* Terminal Window */}
        <motion.div
          className="blueprint-container relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={focusInput}
        >
          {/* Corner Markers */}
          <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono">
            +
          </span>
          <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono">
            +
          </span>

          {/* Terminal Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-secondary/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 border border-primary" />
              <div className="w-3 h-3 border border-primary" />
              <div className="w-3 h-3 border border-primary bg-primary" />
            </div>
            <div className="font-mono text-xs text-muted-foreground flex-1 text-center">
              [TERMINAL SESSION - SECURE] — PID: 1337
            </div>
            <div className="font-mono text-xs text-primary animate-pulse">●</div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="p-4 md:p-6 h-[350px] md:h-[450px] overflow-y-auto cursor-text terminal-body"
          >
            {/* History */}
            {history.map((line, index) => (
              <div key={index} className="font-mono text-sm leading-relaxed">
                {line.type === "system" && (
                  <div className="text-muted-foreground mb-1">
                    <span className="text-primary">[SYS]</span> {line.content}
                  </div>
                )}
                {line.type === "input" && (
                  <div className="text-foreground">
                    <span className="text-primary">guest</span>
                    <span className="text-muted-foreground">@</span>
                    <span className="text-accent">portfolio</span>
                    <span className="text-muted-foreground">:~$ </span>
                    <span>{line.content}</span>
                  </div>
                )}
                {line.type === "output" && (
                  <pre className="text-foreground whitespace-pre-wrap">
                    {line.content}
                  </pre>
                )}
                {line.type === "ascii" && (
                  <pre className="text-primary text-glow-strong text-xs whitespace-pre overflow-x-auto">
                    {line.content}
                  </pre>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="font-mono text-sm flex items-center">
              <span className="text-primary">guest</span>
              <span className="text-muted-foreground">@</span>
              <span className="text-accent">portfolio</span>
              <span className="text-muted-foreground">:~$ </span>
              <span className="text-foreground">{currentInput}</span>
              <span
                className={`text-primary ml-0.5 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              >
                █
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 w-0 h-0"
                autoFocus
              />
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2 border-t border-border bg-secondary/30 font-mono text-[10px] md:text-xs text-muted-foreground flex justify-between">
            <span className="hidden sm:inline">[CTRL+C: interrupt] [↑↓: history]</span>
            <span className="sm:hidden">[TAP BUTTONS BELOW]</span>
            <span>TTY: /dev/pts/0</span>
          </div>
        </motion.div>

        {/* Mobile Quick Command Bar */}
        <motion.div
          className="mt-4 flex flex-wrap gap-2 justify-center md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                processCommand(cmd);
                setCurrentInput("");
              }}
              className="px-3 py-2 border border-primary bg-primary/10 font-mono text-xs text-primary active:bg-primary active:text-primary-foreground transition-colors"
            >
              {cmd}
            </button>
          ))}
        </motion.div>

        {/* Hint - Desktop only */}
        <motion.div
          className="text-center mt-8 font-mono text-xs text-muted-foreground hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Try: <span className="text-primary">fastfetch</span>,{" "}
          <span className="text-primary">ls</span>,{" "}
          <span className="text-primary">help</span>,{" "}
          <span className="text-primary">cat contact.txt</span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center mt-6 md:mt-8 font-mono text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="mb-2">[SCROLL TO CONTINUE]</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            ▼
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
