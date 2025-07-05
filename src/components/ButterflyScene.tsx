import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.1;
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
      {/* Main Butterfly - Large, realistic wings, centered behind logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(-10vh)' }} // Moved slightly upward
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '90vw', // Nearly fill viewport width
            maxWidth: '1200px',
            height: '80vh',
            opacity: 0.35, // Between 0.25-0.4 as requested
            filter: 'drop-shadow(0 0 40px rgba(236, 223, 204, 0.4))',
            mixBlendMode: 'screen' // Using screen blend mode as requested
          }}
          animate={{ 
            scale: [1, 1.02, 1],
            y: [0, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }}
        >
          {/* Realistic Butterfly SVG with Large Wings */}
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{ filter: 'brightness(1.1)' }}
          >
            {/* Butterfly Body - More detailed */}
            <motion.ellipse
              cx="400"
              cy="300"
              rx="8"
              ry="180"
              fill="rgba(236, 223, 204, 0.9)"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(236, 223, 204, 0.6))',
              }}
            />
            
            {/* Body segments */}
            <ellipse cx="400" cy="250" rx="6" ry="15" fill="rgba(236, 223, 204, 0.8)" />
            <ellipse cx="400" cy="280" rx="7" ry="18" fill="rgba(236, 223, 204, 0.8)" />
            <ellipse cx="400" cy="320" rx="7" ry="18" fill="rgba(236, 223, 204, 0.8)" />
            <ellipse cx="400" cy="360" rx="6" ry="15" fill="rgba(236, 223, 204, 0.8)" />
            
            {/* Left Upper Wing - Large, realistic shape */}
            <motion.path
              d="M400 200 Q280 120 180 140 Q120 160 100 200 Q90 240 120 280 Q160 320 220 310 Q280 290 340 270 Q380 250 400 200"
              fill="rgba(236, 223, 204, 0.7)"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(236, 223, 204, 0.5))',
                transformOrigin: '400px 200px'
              }}
              animate={{
                rotateZ: [0, -4, 0],
                scaleY: [1, 1.08, 1],
                scaleX: [1, 1.03, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* Right Upper Wing - Large, realistic shape */}
            <motion.path
              d="M400 200 Q520 120 620 140 Q680 160 700 200 Q710 240 680 280 Q640 320 580 310 Q520 290 460 270 Q420 250 400 200"
              fill="rgba(236, 223, 204, 0.7)"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(236, 223, 204, 0.5))',
                transformOrigin: '400px 200px'
              }}
              animate={{
                rotateZ: [0, 4, 0],
                scaleY: [1, 1.08, 1],
                scaleX: [1, 1.03, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* Left Lower Wing - Realistic proportions */}
            <motion.path
              d="M400 300 Q320 360 250 390 Q200 410 180 440 Q170 470 190 500 Q220 530 270 520 Q320 500 360 470 Q390 440 400 400"
              fill="rgba(236, 223, 204, 0.6)"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 18px rgba(236, 223, 204, 0.4))',
                transformOrigin: '400px 300px'
              }}
              animate={{
                rotateZ: [0, -3, 0],
                scaleY: [1, 1.05, 1],
                scaleX: [1, 1.02, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.8
              }}
            />
            
            {/* Right Lower Wing - Realistic proportions */}
            <motion.path
              d="M400 300 Q480 360 550 390 Q600 410 620 440 Q630 470 610 500 Q580 530 530 520 Q480 500 440 470 Q410 440 400 400"
              fill="rgba(236, 223, 204, 0.6)"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 18px rgba(236, 223, 204, 0.4))',
                transformOrigin: '400px 300px'
              }}
              animate={{
                rotateZ: [0, 3, 0],
                scaleY: [1, 1.05, 1],
                scaleX: [1, 1.02, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.8
              }}
            />
            
            {/* Wing Pattern Details - Left Upper */}
            <circle cx="250" cy="200" r="15" fill="rgba(236, 223, 204, 0.4)" />
            <circle cx="280" cy="240" r="12" fill="rgba(236, 223, 204, 0.3)" />
            <circle cx="200" cy="250" r="10" fill="rgba(236, 223, 204, 0.3)" />
            
            {/* Wing Pattern Details - Right Upper */}
            <circle cx="550" cy="200" r="15" fill="rgba(236, 223, 204, 0.4)" />
            <circle cx="520" cy="240" r="12" fill="rgba(236, 223, 204, 0.3)" />
            <circle cx="600" cy="250" r="10" fill="rgba(236, 223, 204, 0.3)" />
            
            {/* Wing Pattern Details - Lower Wings */}
            <circle cx="280" cy="420" r="12" fill="rgba(236, 223, 204, 0.3)" />
            <circle cx="520" cy="420" r="12" fill="rgba(236, 223, 204, 0.3)" />
            
            {/* Wing Veins - Left */}
            <path d="M400 200 Q300 180 200 200" stroke="rgba(236, 223, 204, 0.4)" strokeWidth="1" fill="none" />
            <path d="M400 200 Q320 220 250 250" stroke="rgba(236, 223, 204, 0.4)" strokeWidth="1" fill="none" />
            <path d="M400 300 Q320 340 250 380" stroke="rgba(236, 223, 204, 0.4)" strokeWidth="1" fill="none" />
            
            {/* Wing Veins - Right */}
            <path d="M400 200 Q500 180 600 200" stroke="rgba(236, 223, 204, 0.4)" strokeWidth="1" fill="none" />
            <path d="M400 200 Q480 220 550 250" stroke="rgba(236, 223, 204, 0.4)" strokeWidth="1" fill="none" />
            <path d="M400 300 Q480 340 550 380" stroke="rgba(236, 223, 204, 0.4)" strokeWidth="1" fill="none" />
            
            {/* Antennae - More detailed */}
            <motion.path
              d="M390 180 Q380 160 370 140 Q365 130 360 120"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="3"
              fill="none"
              animate={{ rotate: [0, 3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M410 180 Q420 160 430 140 Q435 130 440 120"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="3"
              fill="none"
              animate={{ rotate: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
            />
            
            {/* Antennae Tips */}
            <circle cx="360" cy="120" r="4" fill="rgba(236, 223, 204, 1)" />
            <circle cx="440" cy="120" r="4" fill="rgba(236, 223, 204, 1)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Ethereal Background Enhancement */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(236, 223, 204, 0.06) 0%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.02, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;