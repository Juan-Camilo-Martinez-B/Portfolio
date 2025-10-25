"use client";

import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import CursorEffect from "@/components/CursorEffect";
import DynamicModal from "@/components/DynamicModal";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import Projects from "@/components/Projects";
import Sidebar from "@/components/Sidebar";
import Skills from "@/components/Skills";
import Lightning from "@/components/StormBackground";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { useResponsiveIntersectionObserver } from "@/hooks/useResponsiveIntersectionObserver";
import React, { useState } from "react";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  technologies: Array<{ name: string; icon: string }>;
  githubUrl?: string;
  liveUrl?: string;
}

export default function Home() {
  const { activeSection, setActiveSection, setSectionRef } = useResponsiveIntersectionObserver();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAboutModalShifted, setIsAboutModalShifted] = useState(false);
  const [isProjectModalShifted, setIsProjectModalShifted] = useState(false);

  // Debug solo en consola
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Active section:', activeSection);
    }
  }, [activeSection]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalContentShift = (shifted: boolean) => {
    setIsAboutModalShifted(shifted);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
  };

  const handleProjectModalContentShift = (shifted: boolean) => {
    setIsProjectModalShifted(shifted);
  };

  // Calcular si el contenido debe estar desplazado (cualquiera de los dos modales abierto)
  const isContentShifted = isAboutModalShifted || isProjectModalShifted;

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden flex flex-col">
      {/* Contenedor principal */}
      <div 
        className={`relative z-10 flex flex-col md:flex-row justify-center items-start w-full pt-2 sm:pt-12 pb-20 sm:pb-25 px-3 sm:px-4 gap-3 sm:gap-4 max-w-[1200px] mx-auto h-[calc(100vh-5rem)] sm:h-[85vh] transition-all duration-500 ease-in-out ${
          isContentShifted ? 'lg:transform lg:-translate-x-40' : ''
        }`}
      >
        {/* Sidebar */}
        <aside className="w-full md:w-[320px] h-[100px] sm:h-[120px] md:h-full flex-shrink-0">
          <Card className="h-full p-2 sm:p-3 overflow-auto md:overflow-hidden">
            <Sidebar active={activeSection} />
          </Card>
        </aside>

        {/* Recuadro principal */}
        <main className="flex-1 h-full min-h-0 flex-grow">
          <Card
            id="scroll-container"
            className="h-full flex flex-col overflow-y-scroll no-scrollbar scroll-smooth"
          >
            <Section
              id="hero"
              ref={setSectionRef("hero")}
            >
              <Hero />
            </Section>

            <Section
              id="about"
              ref={setSectionRef("about")}
            >
              <AboutMe onOpenModal={handleOpenModal} />
            </Section>

            <Section
              id="projects"
              ref={setSectionRef("projects")}
            >
              <Projects onProjectSelect={handleProjectSelect} />
            </Section>

            <Section
              id="skills"
              ref={setSectionRef("skills")}
            >
              <Skills />
            </Section>

            <Section
              id="contact"
              ref={setSectionRef("contact")}
              className="border-b-0"
            >
              <Contact />
            </Section>
          </Card>
        </main>
      </div>

      {/* Navbar */}
      <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-[850px] px-3 sm:px-4">
        <Card className="py-2 sm:py-2 overflow-x-auto no-scrollbar">
          <Navbar active={activeSection} setActive={setActiveSection} />
        </Card>
      </div>

      {/* Efecto del cursor */}
      <CursorEffect />
      {/* Fondo animado - Fixed */}
      <div className="fixed inset-0 z-0">
        <Lightning/>
      </div>
      
      {/* Modal dinámico - renderizado fuera del contenedor principal */}
      <DynamicModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onContentShift={handleModalContentShift}
      />

      {/* Modal de detalles de proyecto - renderizado fuera del contenedor principal */}
      <ProjectDetailsModal
        isOpen={selectedProject !== null}
        project={selectedProject}
        onClose={handleCloseProjectModal}
        onContentShift={handleProjectModalContentShift}
      />
      
      {/* ocultar scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
    </div>
  );
}
