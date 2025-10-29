"use client";

import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import CursorEffect from "@/components/CursorEffect";
import DynamicModal from "@/components/DynamicModal";
import Education from "@/components/Education";
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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isAboutModalShifted, setIsAboutModalShifted] = useState(false);
  const [isProjectModalShifted, setIsProjectModalShifted] = useState(false);

  // Debug solo en consola
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Active section:', activeSection);
    }
  }, [activeSection]);

  const handleOpenModal = () => {
    // En desktop, hacer toggle del modal
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop && isModalOpen) {
      // Si el modal ya está abierto en desktop, cerrarlo
      setIsModalOpen(false);
      return;
    }
    
    // Cerrar el modal de proyecto si está abierto
    if (selectedProjectId) {
      setSelectedProjectId(null);
      // Esperar a que termine la animación de cierre (500ms) antes de abrir el nuevo modal
      setTimeout(() => {
        setIsModalOpen(true);
      }, 500);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalContentShift = (shifted: boolean) => {
    setIsAboutModalShifted(shifted);
  };

  const handleProjectSelect = (project: Project) => {
    // En desktop, hacer toggle del modal si es el mismo proyecto
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop && selectedProjectId === project.id) {
      // Si el mismo proyecto ya está abierto en desktop, cerrarlo
      setSelectedProjectId(null);
      return;
    }
    
    // Cerrar el modal "Entra en mi mundo" si está abierto
    if (isModalOpen) {
      setIsModalOpen(false);
      // Esperar a que termine la animación de cierre (500ms) antes de abrir el nuevo modal
      setTimeout(() => {
        setSelectedProjectId(project.id);
      }, 500);
    } else {
      setSelectedProjectId(project.id);
    }
  };

  const handleCloseProjectModal = () => {
    setSelectedProjectId(null);
  };

  const handleProjectModalContentShift = (shifted: boolean) => {
    setIsProjectModalShifted(shifted);
  };

  // Calcular si el contenido debe estar desplazado (cualquiera de los dos modales abierto)
  const isContentShifted = isAboutModalShifted || isProjectModalShifted;

  return (
    <div className="fixed inset-0 bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden flex flex-col transition-colors duration-300">
      {/* Contenedor principal */}
      <div 
        className={`relative z-10 flex flex-col md:flex-row justify-center items-start w-full pt-2 sm:pt-12 pb-24 sm:pb-25 px-3 sm:px-4 gap-3 sm:gap-4 max-w-[1200px] mx-auto h-[calc(100vh-6rem)] sm:h-[85vh] transition-all duration-500 ease-in-out ${
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
              id="education"
              ref={setSectionRef("education")}
            >
              <Education />
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
      <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-[850px] lg:max-w-[1100px] px-3 sm:px-4">
        <Card className="py-2 sm:py-2 overflow-x-auto no-scrollbar">
          <Navbar />
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
        isOpen={selectedProjectId !== null}
        projectId={selectedProjectId}
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
