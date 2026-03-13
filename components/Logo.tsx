import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Map pin background */}
        <path
          d="M50 10C36.2 10 25 21.2 25 35C25 52.5 50 75 50 75C50 75 75 52.5 75 35C75 21.2 63.8 10 50 10Z"
          fill="#FFD93D"
          stroke="#1A1A1A"
          strokeWidth="2"
        />
        
        {/* Butterfly wings */}
        <g transform="translate(50, 35) scale(0.35)">
          {/* Left upper wing */}
          <ellipse
            cx="-20"
            cy="-10"
            rx="18"
            ry="25"
            fill="#FFEB99"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Right upper wing */}
          <ellipse
            cx="20"
            cy="-10"
            rx="18"
            ry="25"
            fill="#FFEB99"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Left lower wing */}
          <ellipse
            cx="-15"
            cy="15"
            rx="12"
            ry="18"
            fill="#FFF8DC"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Right lower wing */}
          <ellipse
            cx="15"
            cy="15"
            rx="12"
            ry="18"
            fill="#FFF8DC"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Body */}
          <ellipse
            cx="0"
            cy="0"
            rx="4"
            ry="20"
            fill="#1A1A1A"
          />
          {/* Antennae */}
          <path
            d="M 0,-20 Q -5,-28 -8,-32"
            stroke="#1A1A1A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 0,-20 Q 5,-28 8,-32"
            stroke="#1A1A1A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Antenna tips */}
          <circle cx="-8" cy="-32" r="2" fill="#1A1A1A" />
          <circle cx="8" cy="-32" r="2" fill="#1A1A1A" />
        </g>
        
        {/* Center dot */}
        <circle cx="50" cy="35" r="3" fill="#1A1A1A" />
      </svg>
    </div>
  );
};

interface LogoWithTextProps {
  className?: string;
}

export const LogoWithText: React.FC<LogoWithTextProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size="md" />
      <div className="flex flex-col">
        <span className="font-semibold text-lg leading-none text-foreground">CityGuide</span>
        <span className="text-xs text-muted-foreground leading-none mt-1">Smart Map</span>
      </div>
    </div>
  );
};
