"use client";

interface NavbarProps {
  active: string;
  setActive: (id: string) => void;
}

export default function Navbar({ active, setActive }: NavbarProps) {
  const handleClick = (id: string) => {
    setActive(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "Sobre mí" },
    { id: "projects", label: "Proyectos" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contacto" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2 font-audiowide text-sm sm:text-base">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors duration-200 cursor-pointer
            ${
              active === item.id
                ? "bg-orange-500 text-white"
                : "bg-black border border-orange-500 text-white hover:bg-orange-600"
            }`}
        >
          {item.label}
        </button>
      ))}

      {/* Botones extra */}
      <button className="bg-black border border-orange-500 px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer">
        EN/ES
      </button>
      <button className="bg-black border border-orange-500 px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer">
        ☀️/🌙
      </button>
    </nav>
  );
}
