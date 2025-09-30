interface SidebarProps {
  active: string;
}

export default function Sidebar({ active }: SidebarProps) {
  const texts: Record<string, string> = {
    hero: "Transformo la incertidumbre en soluciones creativas y funcionales.",
    about: "Disfruto vivir experiencias que me den otras perspectivas de mis metas",
    projects:
      "Desarrollo iniciativas más simples para problemas reales. creo alternativas de uso para experiencias de la vida cotidiana, basandome en métodos ya realizados para ofrecer otras opciones a los usuarios.",
    skills: "Siempre aprendiendo, siempre mejorando",
    contact:
      "No dudes en hablarme, tu proyecto puede ser mi próxima obsesión, recuerda que las buenas ideas empiezan con un mensaje",
  };

  return (
    <div className="flex flex-col items-center h-full p-6 text-center">
      {/* Imagen */}
      <div className="w-40 h-40 rounded-full bg-gray-600 mb-6"></div>

      {/* Línea separadora */}
      <div className="w-full h-[2px] bg-orange-500 mb-6 mt-6"></div>

      {/* Texto dinámico*/}
      <div className="flex-1 flex items-center">
        <p className="text-gray-300 font-orbitron">{texts[active]}</p>
      </div>
    </div>
  );
}
