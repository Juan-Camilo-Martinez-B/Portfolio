import React from 'react';
import { useContactData, usePersonalInfo } from '@/hooks/usePortfolioData';
import Button from '@/components/ui/Button';

const Contact: React.FC = () => {
  const contactData = useContactData();
  const personalInfo = usePersonalInfo();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-orange-500 font-audiowide">
        {contactData.title}
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-gray-300 font-orbitron leading-relaxed text-lg">
            {contactData.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-orange-500 font-audiowide">Email:</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-300 font-orbitron hover:text-orange-500 transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
            {personalInfo.phone && (
              <div className="flex items-center gap-3">
                <span className="text-orange-500 font-audiowide">Teléfono:</span>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-gray-300 font-orbitron hover:text-orange-500 transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-orange-500 font-audiowide">Ubicación:</span>
              <span className="text-gray-300 font-orbitron">
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-500 font-audiowide">
            Conecta conmigo
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => window.open(personalInfo.social.github, '_blank')}
              className="flex items-center justify-center gap-2"
            >
              <span>GitHub</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(personalInfo.social.linkedin, '_blank')}
              className="flex items-center justify-center gap-2"
            >
              <span>LinkedIn</span>
            </Button>
            {personalInfo.social.twitter && (
              <Button
                variant="outline"
                onClick={() => window.open(personalInfo.social.twitter, '_blank')}
                className="flex items-center justify-center gap-2"
              >
                <span>Twitter</span>
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
              className="flex items-center justify-center gap-2"
            >
              <span>Enviar Email</span>
            </Button>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 font-orbitron">
            {contactData.responseTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
