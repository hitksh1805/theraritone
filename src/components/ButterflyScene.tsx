import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.2;
        containerRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Main Butterfly - Large, centered behind logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '800px',
            height: '600px',
            opacity: 0.4,
            filter: 'drop-shadow(0 0 30px rgba(236, 223, 204, 0.3))',
            mixBlendMode: 'lighten'
          }}
          animate={{ 
            scale: [1, 1.03, 1],
            rotate: [0, 1, 0],
            y: [0, -8, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        >
          {/* Butterfly SVG */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            style={{ filter: 'brightness(1.2)' }}
          >
            {/* Butterfly Body */}
            <motion.ellipse
              cx="200"
              cy="150"
              rx="3"
              ry="80"
              fill="rgba(236, 223, 204, 0.8)"
              style={{ filter: 'drop-shadow(0 0 8px rgba(236, 223, 204, 0.5))' }}
            />
            
            {/* Left Upper Wing */}
            <motion.path
              d="M200 100 Q120 60 80 80 Q60 100 70 130 Q90 160 140 140 Q180 120 200 100"
              fill="rgba(236, 223, 204, 0.6)"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(236, 223, 204, 0.4))',
                transformOrigin: '200px 100px'
              }}
              animate={{
                rotateZ: [0, -3, 0],
                scaleY: [1, 1.05, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* Right Upper Wing */}
            <motion.path
              d="M200 100 Q280 60 320 80 Q340 100 330 130 Q310 160 260 140 Q220 120 200 100"
              fill="rgba(236, 223, 204, 0.6)"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(236, 223, 204, 0.4))',
                transformOrigin: '200px 100px'
              }}
              animate={{
                rotateZ: [0, 3, 0],
                scaleY: [1, 1.05, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* Left Lower Wing */}
            <motion.path
              d="M200 150 Q140 180 110 200 Q90 220 100 240 Q120 260 160 250 Q190 230 200 200"
              fill="rgba(236, 223, 204, 0.5)"
              stroke="rgba(236, 223, 204, 0.7)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(236, 223, 204, 0.3))',
                transformOrigin: '200px 150px'
              }}
              animate={{
                rotateZ: [0, -2, 0],
                scaleY: [1, 1.03, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Right Lower Wing */}
            <motion.path
              d="M200 150 Q260 180 290 200 Q310 220 300 240 Q280 260 240 250 Q210 230 200 200"
              fill="rgba(236, 223, 204, 0.5)"
              stroke="rgba(236, 223, 204, 0.7)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(236, 223, 204, 0.3))',
                transformOrigin: '200px 150px'
              }}
              animate={{
                rotateZ: [0, 2, 0],
                scaleY: [1, 1.03, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Wing Details - Left */}
            <circle cx="130" cy="110" r="8" fill="rgba(236, 223, 204, 0.3)" />
            <circle cx="145" cy="190" r="6" fill="rgba(236, 223, 204, 0.3)" />
            
            {/* Wing Details - Right */}
            <circle cx="270" cy="110" r="8" fill="rgba(236, 223, 204, 0.3)" />
            <circle cx="255" cy="190" r="6" fill="rgba(236, 223, 204, 0.3)" />
            
            {/* Antennae */}
            <motion.path
              d="M195 80 Q190 70 185 65"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: [0, 2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M205 80 Q210 70 215 65"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />
            
            {/* Antennae Tips */}
            <circle cx="185" cy="65" r="2" fill="rgba(236, 223, 204, 0.9)" />
            <circle cx="215" cy="65" r="2" fill="rgba(236, 223, 204, 0.9)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Smaller Ambient Butterfly - Top Right */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 4, delay: 2, ease: "easeOut" }}
      >
        <motion.div
          style={{
            width: '120px',
            height: '90px',
            opacity: 0.2,
            filter: 'drop-shadow(0 0 15px rgba(236, 223, 204, 0.2))',
            mixBlendMode: 'lighten'
          }}
          animate={{ 
            x: [0, 15, 0],
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <ellipse cx="200" cy="150" rx="2" ry="50" fill="rgba(236, 223, 204, 0.6)" />
            <path d="M200 120 Q150 90 120 100 Q100 110 110 130 Q130 150 170 140 Q190 130 200 120" 
                  fill="rgba(236, 223, 204, 0.4)" />
            <path d="M200 120 Q250 90 280 100 Q300 110 290 130 Q270 150 230 140 Q210 130 200 120" 
                  fill="rgba(236, 223, 204, 0.4)" />
            <path d="M200 150 Q160 170 140 180 Q120 190 130 200 Q150 210 180 200 Q195 190 200 180" 
                  fill="rgba(236, 223, 204, 0.3)" />
            <path d="M200 150 Q240 170 260 180 Q280 190 270 200 Q250 210 220 200 Q205 190 200 180" 
                  fill="rgba(236, 223, 204, 0.3)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Light Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${25 + (i * 12)}%`,
              top: `${35 + (i * 8)}%`,
              background: 'rgba(236, 223, 204, 0.4)',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 6px rgba(236, 223, 204, 0.6)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + (i * 0.8),
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Ethereal Background Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(236, 223, 204, 0.08) 0%, transparent 60%)',
          mixBlendMode: 'lighten'
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;