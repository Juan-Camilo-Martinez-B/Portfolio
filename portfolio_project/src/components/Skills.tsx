export default function Skills() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-orange-500 mb-4 font-audiowide">
        Skills
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-300 font-orbitron">
        <span className="border border-orange-500 p-2 rounded">Next.js</span>
        <span className="border border-orange-500 p-2 rounded">React</span>
        <span className="border border-orange-500 p-2 rounded">Node.js</span>
        <span className="border border-orange-500 p-2 rounded">TailwindCSS</span>
        <span className="border border-orange-500 p-2 rounded">TypeScript</span>
        <span className="border border-orange-500 p-2 rounded">Git/GitHub</span>
      </div>
    </div>
  );
}
