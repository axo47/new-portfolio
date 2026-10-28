import { PaperBackground } from "@/components/portfolio/PaperBackground";
import { TopBar } from "@/components/portfolio/TopBar";
import { SectionNav } from "@/components/portfolio/SectionNav";
import { Hero } from "@/components/portfolio/Hero";
import { Intersection } from "@/components/portfolio/Intersection";
import { Research } from "@/components/portfolio/Research";
import { Experience } from "@/components/portfolio/Experience";
import { Skills } from "@/components/portfolio/Skills";
import { Education } from "@/components/portfolio/Education";
import { Awards } from "@/components/portfolio/Awards";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => (
  <main className="relative min-h-screen overflow-x-clip bg-background">
    <PaperBackground />
    <TopBar />
    <SectionNav />
    <div className="relative z-10">
      <Hero />
      <Intersection />
      <Education />
      <Research />
      <Experience />
      <Skills />
      <Awards />
      <Contact />
    </div>
  </main>
);

export default Index;
