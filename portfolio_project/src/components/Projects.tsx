export default function Projects() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-orange-500 mb-4 font-audiowide">
        Proyectos
      </h2>
      <ul className="space-y-4 text-gray-300 font-orbitron">
        <li className="border border-orange-500 p-4 rounded">
          Proyecto 1 - Aplicación web con Next.js
        </li>
        <li className="border border-orange-500 p-4 rounded">
          Proyecto 2 - API con Node.js y Express
        </li>
        <li className="border border-orange-500 p-4 rounded">
          Proyecto 3 - Dashboard interactivo con React
        </li>
      </ul>
    </div>
  );
}
