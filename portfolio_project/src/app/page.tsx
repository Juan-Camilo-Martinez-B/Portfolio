// src/app/page.tsx
"use client";

import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import CursorEffect from "@/components/CursorEffect";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Sidebar from "@/components/Sidebar";
import Skills from "@/components/Skills";
import StormBackground from "@/components/StormBackground";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [active, setActive] = useState("hero");

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

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
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Contenedor principal con padding-bottom igual a la altura de la navbar */}
      <div className="relative z-10 flex justify-center items-start w-full h-full p-4 pb-[140px]">
        <div className="flex gap-6 w-full max-w-[1200px] h-full">
          {/* Sidebar */}
          <aside className="w-[320px] hidden md:block h-full">
            <div className="h-full bg-gray-800 border border-orange-500 rounded-xl shadow-lg p-6 overflow-hidden">
              <Sidebar active={active} />
            </div>
          </aside>

          {/* Recuadro principal */}
          <main className="flex-1 h-full">
            <div
              id="scroll-container"
              className="h-full bg-gray-800 border border-orange-500 rounded-xl shadow-lg flex flex-col overflow-y-auto no-scrollbar"
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
      </div>

      {/* Navbar fixed abajo */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-gray-800 border border-orange-500 rounded-xl px-4 py-3 shadow-lg">
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
          -ms-overflow-style: none; /* IE y Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
