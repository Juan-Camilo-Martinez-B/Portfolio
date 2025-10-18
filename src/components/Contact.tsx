export default function Contact() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-orange-500 mb-4 font-audiowide">
        Contacto
      </h2>
      <p className="text-gray-300 mb-4 font-orbitron">
        Puedes escribirme a: <span className="text-orange-500">correo@ejemplo.com</span>
      </p>
      <div className="flex gap-4">
        <a
          href="https://github.com/"
          className="border border-orange-500 px-4 py-2 rounded hover:bg-orange-500 font-audiowide"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/"
          className="border border-orange-500 px-4 py-2 rounded hover:bg-orange-500 font-audiowide"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
