import { MathManifoldBackground } from "@/components/MathManifoldBackground";
import { Navigation } from "@/components/Navigation";
import { HeroCard } from "@/components/HeroCard";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ApproachCard } from "@/components/ApproachCard";
import { ContactCard } from "@/components/ContactCard";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background */}
      <MathManifoldBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <HeroCard />
      <KnowledgeGraph />
      <ExperienceSection />
      <ProjectsGrid />
      <ApproachCard />
      <ContactCard />
    </main>
  );
};

export default Index;
