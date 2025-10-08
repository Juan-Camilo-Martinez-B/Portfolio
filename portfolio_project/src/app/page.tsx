"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CursorEffect from "@/components/CursorEffect";
import StormBackground from "@/components/StormBackground";

export default function Home() {
  const [active, setActive] = useState("hero");

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: document.getElementById("scroll-container"),
        threshold: 0.6,
      }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-start w-full pt-20 pb-25 px-4 gap-4 max-w-[1200px] mx-auto h-[85vh]">
        {/* Sidebar */}
        <aside className="w-full md:w-[320px] h-[140px] md:h-full">
          <div className="h-full bg-gray-800 border border-orange-500 rounded-xl shadow-lg p-3 overflow-auto md:overflow-hidden">
            <Sidebar active={active} />
          </div>
        </aside>

        {/* Recuadro principal */}
        <main className="flex-1 h-full">
          <div
            id="scroll-container"
            className="h-full bg-gray-800 border border-orange-500 rounded-xl shadow-lg flex flex-col overflow-y-scroll no-scrollbar scroll-smooth"
          >
            <section
              id="hero"
              ref={(el) => {
                sectionsRef.current["hero"] = el;
              }}
              className="p-8 border-b border-orange-500"
            >
              <Hero />
            </section>

            <section
              id="about"
              ref={(el) => {
                sectionsRef.current["about"] = el;
              }}
              className="p-8 border-b border-orange-500"
            >
              <AboutMe />
            </section>

            <section
              id="projects"
              ref={(el) => {
                sectionsRef.current["projects"] = el;
              }}
              className="p-8 border-b border-orange-500"
            >
              <Projects />
            </section>

            <section
              id="skills"
              ref={(el) => {
                sectionsRef.current["skills"] = el;
              }}
              className="p-8 border-b border-orange-500"
            >
              <Skills />
            </section>

            <section
              id="contact"
              ref={(el) => {
                sectionsRef.current["contact"] = el;
              }}
              className="p-8"
            >
              <Contact />
            </section>
          </div>
        </main>
      </div>

      {/* Navbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-[850px]  px-4">
        <div className="bg-gray-800 border border-orange-500 rounded-xl py-2 sm:py-2 shadow-lg overflow-x-auto no-scrollbar">
          <Navbar active={active} setActive={setActive} />
        </div>
      </div>

      {/* Efecto del cursor */}
      <CursorEffect />
      {/* Fondo animado */}
      <StormBackground />

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
