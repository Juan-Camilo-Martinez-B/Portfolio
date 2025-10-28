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
    medium: 'w-35 h-35',
    large: 'w-55 h-55',
    xlarge: 'w-75 h-75'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Anillo de resplandor animado */}
      <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-orange-500/20 blur-xl animate-pulse" />
      
      {/* Borde circular con gradiente - Más grueso y notorio */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-500 dark:border-orange-500 shadow-glow" />
      
      {/* Avatar Lottie - Con padding interno para que no cubra el borde */}
      <div className="absolute inset-[2px] rounded-full overflow-hidden bg-gray-500/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors duration-300">
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

