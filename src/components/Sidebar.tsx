interface SidebarProps {
  active: string;
}

export default function Sidebar({ active }: SidebarProps) {
  const texts: Record<string, string> = {
    hero: "Transformo la incertidumbre en soluciones creativas y funcionales.",
    about: "Disfruto vivir experiencias que me den otras perspectivas de mis metas",
    projects:
      "Desarrollo iniciativas más simples para problemas reales. Creo alternativas de uso para experiencias de la vida cotidiana, basándome en métodos ya realizados para ofrecer otras opciones a los usuarios.",
    skills: "Siempre aprendiendo, siempre mejorando",
    contact:
      "No dudes en hablarme, tu proyecto puede ser mi próxima obsesión. Recuerda que las buenas ideas empiezan con un mensaje.",
  };

  return (
    <div className="h-full p-4 sm:p-6 text-center">
      {/* Versión móvil: imagen a la derecha, texto a la izquierda */}
      <div className="flex flex-row items-center gap-4 sm:hidden h-full">
        {/* Texto */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-300 font-orbitron text-sm leading-relaxed text-left">
            {texts[active]}
          </p>
        </div>

        {/* Línea separadora vertical */}
        <div className="w-[2px] h-[80%] bg-orange-500" />

        {/* Imagen */}
        <div className="w-20 h-20 rounded-full bg-gray-600" />
      </div>

      {/* Versión escritorio: imagen arriba, texto abajo */}
      <div className="hidden sm:flex flex-col items-center h-full text-center">
        {/* Imagen */}
        <div className="w-40 h-40 rounded-full bg-gray-600 mb-6" />

        {/* Línea separadora horizontal */}
        <div className="w-full h-[2px] bg-orange-500 mb-6 mt-6" />

        {/* Texto */}
        <div className="flex-1 flex items-center">
          <p className="text-gray-300 font-orbitron text-base leading-relaxed">
            {texts[active]}
          </p>
        </div>
      </div>
    </div>
  );
}
