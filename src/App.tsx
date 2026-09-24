import { useState } from 'react';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import TickerBand from './components/TickerBand';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import BeyondCodeSection from './components/BeyondCodeSection';
import ContactSection from './components/ContactSection';
import ResumeModal from './components/ResumeModal';
import Chatbot from './components/Chatbot';

const App = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const openResume = () => setResumeOpen(true);

  return (
    <>
      <Nav onOpenResume={openResume} />
      <main className="relative w-full" style={{ overflowX: 'clip', background: 'var(--bg)' }}>
        <HeroSection onOpenResume={openResume} />
        <TickerBand />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <BeyondCodeSection />
        <ContactSection />
      </main>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <Chatbot />
    </>
  );
};

export default App;
