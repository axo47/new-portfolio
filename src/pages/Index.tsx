import { MathManifoldBackground } from "@/components/MathManifoldBackground";
import { Navigation } from "@/components/Navigation";
import { HeroCard } from "@/components/HeroCard";
import { MathAINexus } from "@/components/MathAINexus";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ApproachCard } from "@/components/ApproachCard";
import { ContactCard } from "@/components/ContactCard";
import { DynamicLightOrbs } from "@/components/DynamicLightOrbs";
import { NoiseOverlay } from "@/components/NoiseOverlay";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background Layers */}
      <MathManifoldBackground />
      <DynamicLightOrbs />
      <NoiseOverlay />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <HeroCard />
      <MathAINexus />
      <ExperienceSection />
      <ProjectsGrid />
      <ApproachCard />
      <ContactCard />
    </main>
  );
};

export default Index;
