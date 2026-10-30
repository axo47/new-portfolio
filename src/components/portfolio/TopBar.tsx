import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

/** Fixed top-right, on every screen: the language switch. */
export const TopBar = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="font-mono-math fixed right-3 top-3 z-50 text-base sm:right-4 sm:top-4 md:right-6 md:top-6">
      <div role="group" aria-label="Language" className="flex rounded-sm border border-border bg-background/80 backdrop-blur-sm">
        {(["fr", "en"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={cn(
              "px-2.5 py-1.5 uppercase transition-colors",
              lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
};
