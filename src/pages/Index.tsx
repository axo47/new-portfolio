import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { LoadingScreen } from "@/components/LoadingScreen";
import { HeroSection } from "@/components/HeroSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum loading time for effect
    const timer = setTimeout(() => {
      // Loading screen handles its own completion
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Background */}
      <BackgroundGrid />

      {/* Main Content */}
      {!isLoading && (
        <>
          <HeroSection />
          <TechStackSection />
          <ProjectsSection />
          <ContactSection />
        </>
      )}
    </main>
  );
};

export default Index;
