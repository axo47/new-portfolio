import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  label: string;
  sublabel: string;
  collected: boolean;
}

interface Player {
  x: number;
  y: number;
  velocityY: number;
  isJumping: boolean;
  facingRight: boolean;
}

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;
const PLAYER_SIZE = 24;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

const INITIAL_PLATFORMS: Platform[] = [
  { id: "ground", x: 0, y: 360, width: 800, label: "START", sublabel: "Begin Journey", collected: true },
  { id: "propolys", x: 50, y: 280, width: 140, label: "PROPOLYS MEDTECH", sublabel: "Software Engineer", collected: false },
  { id: "log2420", x: 220, y: 220, width: 120, label: "LOG2420 TA", sublabel: "Teaching Assistant", collected: false },
  { id: "gdg", x: 380, y: 170, width: 140, label: "GDG VP-PROJECT", sublabel: "Vice President", collected: false },
  { id: "lincs", x: 540, y: 120, width: 120, label: "LINCS LAB", sublabel: "Research Intern", collected: false },
  { id: "axians", x: 350, y: 70, width: 130, label: "AXIANS CANADA", sublabel: "Cloud Engineer", collected: false },
  { id: "chum", x: 520, y: 30, width: 140, label: "CHUM RESEARCH", sublabel: "AI Researcher", collected: false },
];

// 8-bit style player sprite
function PlayerSprite({ facingRight }: { facingRight: boolean }) {
  return (
    <svg 
      width={PLAYER_SIZE} 
      height={PLAYER_SIZE} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor"
      style={{ transform: facingRight ? "scaleX(1)" : "scaleX(-1)" }}
    >
      {/* Head */}
      <rect x="8" y="2" width="8" height="8" fill="currentColor" />
      {/* Body */}
      <rect x="6" y="10" width="12" height="8" fill="currentColor" />
      {/* Legs */}
      <rect x="6" y="18" width="4" height="4" fill="currentColor" />
      <rect x="14" y="18" width="4" height="4" fill="currentColor" />
      {/* Arms */}
      <rect x="2" y="12" width="4" height="4" fill="currentColor" />
      <rect x="18" y="12" width="4" height="4" fill="currentColor" />
      {/* Eye */}
      <rect x={facingRight ? "12" : "10"} y="4" width="2" height="2" fill="hsl(0 0% 2%)" />
    </svg>
  );
}

// Data node collectible
function DataNode({ collected }: { collected: boolean }) {
  return (
    <motion.div
      className="absolute -top-6 left-1/2 -translate-x-1/2"
      animate={collected ? { scale: 0, opacity: 0 } : { y: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: collected ? 0 : Infinity }}
    >
      <div className={`w-4 h-4 border-2 border-primary ${collected ? "bg-transparent" : "bg-primary/30"}`}>
        <div className="absolute inset-0.5 border border-primary/50" />
      </div>
    </motion.div>
  );
}

export function GameResume() {
  const [player, setPlayer] = useState<Player>({
    x: 100,
    y: 320,
    velocityY: 0,
    isJumping: false,
    facingRight: true,
  });
  const [platforms, setPlatforms] = useState<Platform[]>(INITIAL_PLATFORMS);
  const [keys, setKeys] = useState({ left: false, right: false, up: false });
  const [collectedInfo, setCollectedInfo] = useState<Platform | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") setKeys((k) => ({ ...k, left: true }));
      if (e.key === "ArrowRight" || e.key === "d") setKeys((k) => ({ ...k, right: true }));
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
        e.preventDefault();
        setKeys((k) => ({ ...k, up: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") setKeys((k) => ({ ...k, left: false }));
      if (e.key === "ArrowRight" || e.key === "d") setKeys((k) => ({ ...k, right: false }));
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") setKeys((k) => ({ ...k, up: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    setPlayer((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      let newVelocityY = prev.velocityY + GRAVITY;
      let isJumping = prev.isJumping;
      let facingRight = prev.facingRight;

      // Horizontal movement
      if (keys.left) {
        newX = Math.max(0, prev.x - MOVE_SPEED);
        facingRight = false;
      }
      if (keys.right) {
        newX = Math.min(GAME_WIDTH - PLAYER_SIZE, prev.x + MOVE_SPEED);
        facingRight = true;
      }

      // Apply gravity
      newY = prev.y + newVelocityY;

      // Platform collision
      let onPlatform = false;
      platforms.forEach((platform) => {
        const playerBottom = newY + PLAYER_SIZE;
        const playerRight = newX + PLAYER_SIZE;
        const playerLeft = newX;
        
        // Check if player is on platform
        if (
          playerBottom >= platform.y &&
          playerBottom <= platform.y + 20 &&
          playerRight > platform.x &&
          playerLeft < platform.x + platform.width &&
          newVelocityY >= 0
        ) {
          newY = platform.y - PLAYER_SIZE;
          newVelocityY = 0;
          isJumping = false;
          onPlatform = true;

          // Collect data node
          if (!platform.collected && platform.id !== "ground") {
            setPlatforms((p) =>
              p.map((plat) =>
                plat.id === platform.id ? { ...plat, collected: true } : plat
              )
            );
            setCollectedInfo(platform);
            setTimeout(() => setCollectedInfo(null), 3000);
          }
        }
      });

      // Jump
      if (keys.up && !isJumping && onPlatform) {
        newVelocityY = JUMP_FORCE;
        isJumping = true;
      }

      // Floor boundary
      if (newY > GAME_HEIGHT - PLAYER_SIZE) {
        newY = GAME_HEIGHT - PLAYER_SIZE;
        newVelocityY = 0;
        isJumping = false;
      }

      return { x: newX, y: newY, velocityY: newVelocityY, isJumping, facingRight };
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [keys, platforms]);

  useEffect(() => {
    if (gameStarted) {
      animationRef.current = requestAnimationFrame(gameLoop);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [gameStarted, gameLoop]);

  // Mobile controls
  const handleMobileControl = (direction: "left" | "right" | "jump", pressed: boolean) => {
    if (direction === "left") setKeys((k) => ({ ...k, left: pressed }));
    if (direction === "right") setKeys((k) => ({ ...k, right: pressed }));
    if (direction === "jump" && pressed) setKeys((k) => ({ ...k, up: true }));
    if (direction === "jump" && !pressed) setKeys((k) => ({ ...k, up: false }));
  };

  const collectedCount = platforms.filter((p) => p.collected && p.id !== "ground").length;

  return (
    <section className="relative py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-xs text-muted-foreground mb-4">
            [----------------] EXPERIENCE MODULE [----------------]
          </div>
          <h2 className="font-mono text-xl md:text-2xl lg:text-3xl text-primary text-glow">
            THE GAMIFIED RESUME
          </h2>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            Collect data nodes to reveal career milestones
          </p>
        </motion.div>

        {/* Game Container */}
        <motion.div
          ref={gameRef}
          className="blueprint-container relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Corner Markers */}
          <span className="absolute -bottom-2 -left-1 text-xs text-muted-foreground font-mono z-10">+</span>
          <span className="absolute -bottom-2 -right-1 text-xs text-muted-foreground font-mono z-10">+</span>

          {/* Game Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-border bg-secondary/30">
            <div className="font-mono text-xs text-muted-foreground">
              [2D_PLATFORMER] — CAREER.EXE
            </div>
            <div className="font-mono text-xs text-primary">
              NODES: {collectedCount}/{platforms.length - 1}
            </div>
          </div>

          {/* Game Area */}
          <div 
            className="relative bg-background overflow-x-auto"
            style={{ height: GAME_HEIGHT }}
            onClick={() => !gameStarted && setGameStarted(true)}
            tabIndex={0}
          >
            {/* Start Screen */}
            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20">
                <motion.div
                  className="text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="font-mono text-lg text-primary text-glow mb-4">
                    [ CLICK TO START ]
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    Desktop: Arrow Keys / WASD
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    Mobile: Use D-Pad Below
                  </div>
                </motion.div>
              </div>
            )}

            {/* Game world - scrollable */}
            <div 
              className="relative"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT, minWidth: "100%" }}
            >
              {/* Platforms */}
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="absolute"
                  style={{
                    left: platform.x,
                    top: platform.y,
                    width: platform.width,
                    height: 16,
                  }}
                >
                  {/* Platform surface */}
                  <div className="w-full h-full border border-primary bg-primary/10 relative">
                    {/* Platform label */}
                    {platform.id !== "ground" && (
                      <>
                        <DataNode collected={platform.collected} />
                        <div className="absolute -bottom-6 left-0 right-0 text-center font-mono text-[8px] md:text-[10px] text-muted-foreground whitespace-nowrap overflow-hidden">
                          {platform.label}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Player */}
              <motion.div
                className="absolute text-primary z-10"
                style={{
                  left: player.x,
                  top: player.y,
                  width: PLAYER_SIZE,
                  height: PLAYER_SIZE,
                }}
                animate={{ y: player.isJumping ? -2 : 0 }}
              >
                <PlayerSprite facingRight={player.facingRight} />
              </motion.div>
            </div>

            {/* Collected Info Popup */}
            {collectedInfo && (
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="blueprint-container p-4 bg-background/95">
                  <div className="font-mono text-xs text-primary text-glow mb-1">
                    [DATA NODE COLLECTED]
                  </div>
                  <div className="font-mono text-sm text-foreground">
                    {collectedInfo.label}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {collectedInfo.sublabel}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Game Controls Info */}
          <div className="px-4 py-2 border-t border-border bg-secondary/30 font-mono text-[10px] md:text-xs text-muted-foreground flex justify-between">
            <span>[←/→: MOVE] [↑/SPACE: JUMP]</span>
            <span>FPS: 60</span>
          </div>
        </motion.div>

        {/* Mobile D-Pad Controls */}
        <div className="mt-6 flex justify-center md:hidden">
          <div className="grid grid-cols-3 gap-2">
            <div />
            <button
              className="w-14 h-14 border border-primary bg-primary/10 flex items-center justify-center text-primary active:bg-primary active:text-primary-foreground transition-colors"
              onTouchStart={() => handleMobileControl("jump", true)}
              onTouchEnd={() => handleMobileControl("jump", false)}
            >
              ▲
            </button>
            <div />
            <button
              className="w-14 h-14 border border-primary bg-primary/10 flex items-center justify-center text-primary active:bg-primary active:text-primary-foreground transition-colors"
              onTouchStart={() => handleMobileControl("left", true)}
              onTouchEnd={() => handleMobileControl("left", false)}
            >
              ◀
            </button>
            <div className="w-14 h-14 border border-border flex items-center justify-center font-mono text-xs text-muted-foreground">
              D-PAD
            </div>
            <button
              className="w-14 h-14 border border-primary bg-primary/10 flex items-center justify-center text-primary active:bg-primary active:text-primary-foreground transition-colors"
              onTouchStart={() => handleMobileControl("right", true)}
              onTouchEnd={() => handleMobileControl("right", false)}
            >
              ▶
            </button>
          </div>
        </div>

        {/* Collected Milestones List */}
        {collectedCount > 0 && (
          <motion.div
            className="mt-8 blueprint-container p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="font-mono text-xs text-muted-foreground mb-4">
              [COLLECTED DATA NODES]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {platforms
                .filter((p) => p.collected && p.id !== "ground")
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-3 border border-primary/50 bg-primary/5"
                  >
                    <div className="font-mono text-xs text-primary">{p.label}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {p.sublabel}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}