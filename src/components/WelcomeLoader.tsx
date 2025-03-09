import React, { useEffect, useState } from 'react';

const WelcomeLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => prev + 1);
      } else {
        setFadeOut(true);
        setTimeout(() => {
          onLoadComplete();
        }, 1000);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [progress, onLoadComplete]);

  // Calculate smooth easing for animations
  const easeInOut = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const easedProgress = easeInOut(progress / 100);

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 z-50 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Elegant gradient definitions */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFBEB" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Background glow */}
          <circle 
            cx="100" 
            cy="100" 
            r={60 + Math.sin(progress * 0.04) * 5} 
            fill="url(#centerGlow)" 
            opacity={0.7}
          />
          
          {/* Main animated mandala */}
          <g transform="translate(100, 100)">
            {/* Ornate circular pattern */}
            {[...Array(3)].map((_, ringIndex) => {
              const ringRadius = 20 + (ringIndex * 15);
              const numElements = 8 + (ringIndex * 4);
              const rotationDirection = ringIndex % 2 === 0 ? 1 : -1;
              const rotationSpeed = 0.2 - (ringIndex * 0.05);
              const showRing = progress > (ringIndex * 15);
              
              return (
                <g 
                  key={`ring-${ringIndex}`} 
                  opacity={showRing ? Math.min(1, (progress - (ringIndex * 15)) / 20) : 0}
                  transform={`rotate(${rotationDirection * progress * rotationSpeed})`}
                >
                  {[...Array(numElements)].map((_, i) => {
                    const angle = (i * (360 / numElements));
                    const elementSize = 7 - (ringIndex * 1.5);
                    
                    return (
                      <g key={`element-${ringIndex}-${i}`} transform={`rotate(${angle})`}>
                        <path
                          d={`M 0 ${ringRadius} 
                             Q ${elementSize} ${ringRadius + elementSize} 0 ${ringRadius + elementSize * 2} 
                             Q ${-elementSize} ${ringRadius + elementSize} 0 ${ringRadius}`}
                          fill="none"
                          stroke="url(#goldGradient)"
                          strokeWidth={1.5 - (ringIndex * 0.3)}
                          filter="url(#glow)"
                        />
                      </g>
                    );
                  })}
                </g>
              );
            })}
            
            {/* Dynamically appearing lotus pattern */}
            {progress > 40 && (
              <g opacity={Math.min(1, (progress - 40) / 20)}>
                {[...Array(8)].map((_, i) => {
                  const angle = i * 45;
                  const petalWidth = 12;
                  const petalLength = 40 * easedProgress;
                  const curve = 15;
                  
                  return (
                    <path
                      key={`lotus-${i}`}
                      d={`M 0 0 
                         C ${curve} ${-curve}, ${petalWidth} ${-petalLength/2}, 0 ${-petalLength} 
                         C ${-petalWidth} ${-petalLength/2}, ${-curve} ${-curve}, 0 0`}
                      fill="none"
                      stroke="url(#goldGradient)"
                      strokeWidth="1.5"
                      transform={`rotate(${angle + (progress * 0.1)})`}
                      opacity={0.7 + 0.3 * Math.sin(progress * 0.05 + i)}
                    />
                  );
                })}
              </g>
            )}
            
            {/* Pulsing center */}
            <circle
              cx="0"
              cy="0"
              r={5 + 2 * Math.sin(progress * 0.1)}
              fill="url(#goldGradient)"
              filter="url(#glow)"
            />
          </g>
          
          {/* Animated particles */}
          {progress > 25 && [...Array(12)].map((_, i) => {
            const seed = i * 1.7;
            const t = ((progress - 25) * 0.01 + seed) % 1;
            const angle = seed * 30;
            const radius = 70 * t;
            const x = 100 + radius * Math.cos(angle);
            const y = 100 + radius * Math.sin(angle);
            const opacity = Math.sin(t * Math.PI);
            
            return (
              <circle
                key={`particle-${i}`}
                cx={x}
                cy={y}
                r={1.5 + opacity * 1.5}
                fill="#F59E0B"
                opacity={opacity * 0.8}
                filter="url(#glow)"
              />
            );
          })}
          
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="55"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="1"
            strokeDasharray={`${easedProgress * Math.PI * 110} ${Math.PI * 110}`}
            strokeDashoffset={Math.PI * 27.5}
            strokeLinecap="round"
            opacity={0.6}
            transform="rotate(-90, 100, 100)"
          />
        </svg>
      </div>
      
      <div className="text-center max-w-md px-6">
        <h1 className="text-2xl font-serif text-amber-800 mb-4 opacity-90">Bhagavad Gita</h1>
        <p className="text-amber-700 italic mb-6 text-center leading-relaxed">
          "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।" <br/>
          <span className="text-sm mt-2 block">
            "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
          </span>
        </p>
      </div>
    </div>
  );
};

export default WelcomeLoader;