'use client';
import React from 'react';
import Lottie from 'lottie-react';
import avatarAnimation from '../../public/animations/avatar.json';

interface AnimatedAvatarProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ 
  size = 'medium',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-40 h-40',
    large: 'w-60 h-60',
    xlarge: 'w-80 h-80'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Anillo de resplandor animado */}
      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
      
      {/* Borde circular con gradiente */}
      <div className="absolute inset-0 rounded-full border-2 border-orange-500 shadow-glow" />
      
      {/* Avatar Lottie */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm">
        <Lottie 
          animationData={avatarAnimation}
          loop={true}
          autoplay={true}
          style={{ 
            width: '100%', 
            height: '100%',
          }}
          className="transform scale-110"
        />
      </div>
    </div>
  );
};

export default AnimatedAvatar;

