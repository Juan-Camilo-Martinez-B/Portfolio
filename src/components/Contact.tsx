'use client';
import Button from '@/components/ui/Button';
import { useContactData, usePersonalInfo } from '@/hooks/usePortfolioData';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const contactData = useContactData();
  const personalInfo = usePersonalInfo();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Form submitted:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Mobile y Desktop Layout - Ambos en columna */}
      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        
        {/* Información de contacto */}
        <div className="bg-black border-2 border-orange-500 rounded-xl p-6">
          <h2 className="text-xl font-audiowide text-center mb-6 bg-orange-500 text-black py-2 rounded-lg">
            Información de contacto
          </h2>

          <div className="space-y-4">
            {/* Ubicación */}
            <div className="bg-gray-700 rounded-lg px-4 py-3">
              <p className="text-white font-orbitron text-sm">
                Ubicación
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-700 rounded-lg px-4 py-3">
              <p className="text-white font-orbitron text-sm">
                Email
              </p>
            </div>

            {/* Disponibilidad */}
            <div className="bg-gray-700 rounded-lg px-4 py-3">
              <p className="text-white font-orbitron text-sm">
                Disponibilidad
              </p>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href={personalInfo.social.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-white text-xl">📷</span>
              </a>

              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-white text-xl">f</span>
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-700 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-white text-xl">in</span>
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-white text-xl">⚫</span>
              </a>

              {/* Otra red (Triangle) */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-orange-500 text-xl">▲</span>
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-black border-2 border-orange-500 rounded-xl p-6">
          <h2 className="text-xl font-audiowide text-center mb-6 bg-orange-500 text-black py-2 rounded-lg">
            Contáctame
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tu nombre y Email en fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-orbitron text-sm mb-2">
                  Tu nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-orbitron text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-orbitron text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-orbitron text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Tipo de proyecto */}
            <div>
              <label className="block text-white font-orbitron text-sm mb-2">
                Tipo de proyecto
              </label>
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-orbitron text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Cuéntame más */}
            <div>
              <label className="block text-white font-orbitron text-sm mb-2">
                Cuéntame más
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-orbitron text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                required
              />
            </div>

            {/* Botón enviar */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="px-8 py-3 font-audiowide"
              >
                Envía propuesta
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
