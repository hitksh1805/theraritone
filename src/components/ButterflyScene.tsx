import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.15;
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
      {/* Main Dominant Butterfly - Massive Scale */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '120vw',
            height: '100vh',
            opacity: 0.6,
            filter: 'drop-shadow(0 0 60px rgba(236, 223, 204, 0.4))',
            mixBlendMode: 'lighten'
          }}
          animate={{ 
            scale: [1, 1.02, 1],
            y: [0, -15, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut"
          }}
        >
          {/* Realistic Butterfly SVG - Massive Wings */}
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full"
            style={{ filter: 'brightness(1.3) contrast(1.1)' }}
          >
            {/* Butterfly Body - Central Spine */}
            <motion.ellipse
              cx="600"
              cy="400"
              rx="8"
              ry="200"
              fill="rgba(236, 223, 204, 0.9)"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(236, 223, 204, 0.6))',
                transformOrigin: '600px 400px'
              }}
            />
            
            {/* LEFT UPPER WING - Large Dominant Wing */}
            <motion.path
              d="M600 250 Q400 100 200 150 Q50 200 80 300 Q120 400 200 450 Q350 480 500 420 Q580 380 600 300"
              fill="rgba(236, 223, 204, 0.7)"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(236, 223, 204, 0.5))',
                transformOrigin: '600px 250px'
              }}
              animate={{
                rotateZ: [0, -4, 0],
                scaleY: [1, 1.08, 1],
                scaleX: [1, 1.03, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* RIGHT UPPER WING - Large Dominant Wing */}
            <motion.path
              d="M600 250 Q800 100 1000 150 Q1150 200 1120 300 Q1080 400 1000 450 Q850 480 700 420 Q620 380 600 300"
              fill="rgba(236, 223, 204, 0.7)"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(236, 223, 204, 0.5))',
                transformOrigin: '600px 250px'
              }}
              animate={{
                rotateZ: [0, 4, 0],
                scaleY: [1, 1.08, 1],
                scaleX: [1, 1.03, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* LEFT LOWER WING - Secondary Wing */}
            <motion.path
              d="M600 400 Q450 500 300 550 Q200 600 220 680 Q250 750 350 720 Q450 680 550 620 Q590 580 600 520"
              fill="rgba(236, 223, 204, 0.6)"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(236, 223, 204, 0.4))',
                transformOrigin: '600px 400px'
              }}
              animate={{
                rotateZ: [0, -3, 0],
                scaleY: [1, 1.05, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* RIGHT LOWER WING - Secondary Wing */}
            <motion.path
              d="M600 400 Q750 500 900 550 Q1000 600 980 680 Q950 750 850 720 Q750 680 650 620 Q610 580 600 520"
              fill="rgba(236, 223, 204, 0.6)"
              stroke="rgba(236, 223, 204, 0.8)"
              strokeWidth="2"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(236, 223, 204, 0.4))',
                transformOrigin: '600px 400px'
              }}
              animate={{
                rotateZ: [0, 3, 0],
                scaleY: [1, 1.05, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Wing Pattern Details - Left Upper */}
            <motion.path
              d="M300 200 Q250 250 280 300 Q320 280 350 250 Q320 220 300 200"
              fill="rgba(236, 223, 204, 0.4)"
              animate={{
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            
            {/* Wing Pattern Details - Right Upper */}
            <motion.path
              d="M900 200 Q950 250 920 300 Q880 280 850 250 Q880 220 900 200"
              fill="rgba(236, 223, 204, 0.4)"
              animate={{
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Wing Spots - Left Wings */}
            <circle cx="350" cy="280" r="15" fill="rgba(236, 223, 204, 0.5)" />
            <circle cx="280" cy="320" r="12" fill="rgba(236, 223, 204, 0.4)" />
            <circle cx="400" cy="580" r="18" fill="rgba(236, 223, 204, 0.5)" />
            <circle cx="320" cy="620" r="14" fill="rgba(236, 223, 204, 0.4)" />
            
            {/* Wing Spots - Right Wings */}
            <circle cx="850" cy="280" r="15" fill="rgba(236, 223, 204, 0.5)" />
            <circle cx="920" cy="320" r="12" fill="rgba(236, 223, 204, 0.4)" />
            <circle cx="800" cy="580" r="18" fill="rgba(236, 223, 204, 0.5)" />
            <circle cx="880" cy="620" r="14" fill="rgba(236, 223, 204, 0.4)" />
            
            {/* Antennae */}
            <motion.path
              d="M590 200 Q580 180 570 160"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="4"
              fill="none"
              animate={{ rotate: [0, 3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M610 200 Q620 180 630 160"
              stroke="rgba(236, 223, 204, 0.9)"
              strokeWidth="4"
              fill="none"
              animate={{ rotate: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            
            {/* Antennae Tips */}
            <circle cx="570" cy="160" r="4" fill="rgba(236, 223, 204, 1)" />
            <circle cx="630" cy="160" r="4" fill="rgba(236, 223, 204, 1)" />

            {/* Wing Texture Lines - Left Upper Wing */}
            <motion.path
              d="M200 200 Q300 180 400 220"
              stroke="rgba(236, 223, 204, 0.3)"
              strokeWidth="1"
              fill="none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M180 250 Q280 230 380 270"
              stroke="rgba(236, 223, 204, 0.3)"
              strokeWidth="1"
              fill="none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Wing Texture Lines - Right Upper Wing */}
            <motion.path
              d="M1000 200 Q900 180 800 220"
              stroke="rgba(236, 223, 204, 0.3)"
              strokeWidth="1"
              fill="none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.path
              d="M1020 250 Q920 230 820 270"
              stroke="rgba(236, 223, 204, 0.3)"
              strokeWidth="1"
              fill="none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 3
              }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Ethereal Particles Around Wings */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${20 + (i * 6)}%`,
              top: `${30 + (i * 4)}%`,
              background: 'rgba(236, 223, 204, 0.6)',
              filter: 'blur(1px)',
              boxShadow: '0 0 12px rgba(236, 223, 204, 0.8)'
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + (i * 0.5),
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Ambient Glow Behind Butterfly */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(236, 223, 204, 0.12) 0%, transparent 70%)',
          mixBlendMode: 'lighten'
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
      />

      {/* Scroll-Triggered Wing Flutter Enhancement */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(236, 223, 204, 0.05) 0%, transparent 50%)',
          mixBlendMode: 'screen'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;