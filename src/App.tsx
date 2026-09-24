import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import BeyondCodeSection from './components/BeyondCodeSection';
import ContactSection from './components/ContactSection';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <main
      className="relative w-full"
      style={{ overflowX: 'clip', background: 'var(--bg)' }}
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <BeyondCodeSection />
      <ContactSection />
      <Chatbot />
    </main>
  );
};

export default App;
