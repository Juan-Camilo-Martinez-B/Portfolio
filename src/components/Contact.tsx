'use client';
import Button from '@/components/ui/Button';
import { useContactData, usePersonalInfo } from '@/hooks/usePortfolioData';
import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import { ReactCountryFlag } from 'react-country-flag';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact: React.FC = () => {
  const contactData = useContactData();
  const personalInfo = usePersonalInfo();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Configurar EmailJS con las variables de entorno
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      console.log('🔍 Debug - Credenciales:');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Public Key:', publicKey ? publicKey.substring(0, 5) + '...' : 'undefined');

      // Validar que las variables de entorno existan
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS credentials are not configured');
      }

      // Inicializar EmailJS con la public key
      emailjs.init(publicKey);

      // Preparar los parámetros del template
      const templateParams = {
        name: formData.name,
        email: formData.email,
        project_type: formData.projectType,
        message: formData.message,
      };

      console.log('📧 Enviando email con params:', templateParams);

      // Enviar el email
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('✅ Email enviado exitosamente:', response);

      // Éxito
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: ''
      });

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error: unknown) {
      const emailError = error as { message?: string; text?: string; status?: number };
      console.error('❌ Error al enviar el email:', error);
      console.error('Error completo:', JSON.stringify(error, null, 2));
      console.error('Error message:', emailError?.message);
      console.error('Error text:', emailError?.text);
      console.error('Error status:', emailError?.status);
      setSubmitStatus('error');

      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mobile y Desktop Layout - Ambos en columna */}
      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        
        {/* Información de contacto */}
        <div className="bg-black border-2 border-orange-500 rounded-xl p-6">
          <h2 className="text-xl font-orbitron text-center mb-6 bg-orange-500 text-black py-2 rounded-lg">
            {contactData.contactInfo.title}
          </h2>

          <div className="space-y-4">
            {/* Ubicación */}
            <div className="bg-gray-700 rounded-lg px-4 py-3 flex items-center gap-3">
              <ReactCountryFlag 
                countryCode="CO" 
                svg 
                style={{
                  fontSize: '2em',
                  lineHeight: '2em',
                }}
              />
              <p className="text-white font-audiowide text-sm">
                {contactData.contactInfo.location.value}
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-700 rounded-lg px-4 py-3">
              <p className="text-white font-audiowide text-sm">
                {contactData.contactInfo.email.value}
              </p>
            </div>

            {/* Disponibilidad */}
            <div className="bg-gray-700 rounded-lg px-4 py-3">
              <p className="text-white font-audiowide text-sm">
                {contactData.contactInfo.availability.value}
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
                <FaInstagram className="text-white text-xl" />
              </a>

              {/* Facebook */}
              <a
                href={personalInfo.social.facebook || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FaFacebook className="text-white text-xl" />
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-700 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FaLinkedin className="text-white text-xl" />
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 border-2 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <FaGithub className="text-white text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-black border-2 border-orange-500 rounded-xl p-6">
          <h2 className="text-xl font-orbitron text-center mb-6 bg-orange-500 text-black py-2 rounded-lg">
            {contactData.form.title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tu nombre y Email en fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-audiowide text-sm mb-2">
                  {contactData.form.fields[0].label}
                </label>
                <input
                  type={contactData.form.fields[0].type}
                  name={contactData.form.fields[0].name}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-audiowide text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required={contactData.form.fields[0].required}
                />
              </div>

              <div>
                <label className="block text-white font-audiowide text-sm mb-2">
                  {contactData.form.fields[1].label}
                </label>
                <input
                  type={contactData.form.fields[1].type}
                  name={contactData.form.fields[1].name}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-audiowide text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required={contactData.form.fields[1].required}
                />
              </div>
            </div>

            {/* Tipo de proyecto */}
            <div>
              <label className="block text-white font-audiowide text-sm mb-2">
                {contactData.form.fields[2].label}
              </label>
              <input
                type={contactData.form.fields[2].type}
                name={contactData.form.fields[2].name}
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-audiowide text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required={contactData.form.fields[2].required}
              />
            </div>

            {/* Cuéntame más */}
            <div>
              <label className="block text-white font-audiowide text-sm mb-2">
                {contactData.form.fields[3].label}
              </label>
              <textarea
                name={contactData.form.fields[3].name}
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-audiowide text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                required={contactData.form.fields[3].required}
              />
            </div>

            {/* Botón enviar */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="px-8 py-3 font-orbitron"
                disabled={isSubmitting}
              >
                {isSubmitting ? contactData.form.submitButton.loadingText : contactData.form.submitButton.text}
              </Button>
            </div>

            {/* Mensajes de feedback */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-500/20 border-2 border-green-500 rounded-lg">
                <p className="text-green-400 font-audiowide text-sm text-center">
                  {contactData.form.messages.success}
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg">
                <p className="text-red-400 font-audiowide text-sm text-center">
                  {contactData.form.messages.error}
                </p>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
