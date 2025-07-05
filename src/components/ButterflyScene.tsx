import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.3;
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
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.img
          src="/IMG-20250305-WA0003-removebg-preview.png"
          alt="Ethereal Butterfly"
          className="w-full max-w-4xl h-auto opacity-20 blur-[1px]"
          style={{
            filter: 'brightness(1.5) contrast(1.2) drop-shadow(0 0 40px rgba(255,255,255,0.3))',
            mixBlendMode: 'lighten',
            transform: 'rotate(-5deg)'
          }}
          initial={{ 
            scale: 1, 
            rotate: -5,
            y: 0
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [-5, -3, -5],
            y: [0, -10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
      </motion.div>

      {/* Secondary Butterfly - Smaller, floating */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 3, delay: 1, ease: "easeOut" }}
      >
        <motion.img
          src="/IMG-20250305-WA0003-removebg-preview.png"
          alt="Floating Butterfly"
          className="w-32 h-auto opacity-15 blur-[0.5px]"
          style={{
            filter: 'brightness(1.8) contrast(1.1) drop-shadow(0 0 20px rgba(255,255,255,0.2))',
            mixBlendMode: 'lighten',
            transform: 'rotate(15deg) scale(0.6)'
          }}
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [15, 25, 15],
            scale: [0.6, 0.65, 0.6]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Third Butterfly - Left side, subtle */}
      <motion.div
        className="absolute top-1/3 left-1/5"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 4, delay: 2, ease: "easeOut" }}
      >
        <motion.img
          src="/IMG-20250305-WA0003-removebg-preview.png"
          alt="Ambient Butterfly"
          className="w-24 h-auto opacity-10 blur-[1px]"
          style={{
            filter: 'brightness(2) contrast(0.8) drop-shadow(0 0 15px rgba(255,255,255,0.15))',
            mixBlendMode: 'lighten',
            transform: 'rotate(-25deg) scale(0.4)'
          }}
          animate={{ 
            x: [0, -10, 0],
            y: [0, 10, 0],
            rotate: [-25, -15, -25],
            scale: [0.4, 0.45, 0.4]
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Floating Particles - Subtle light dots */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 5)}%`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 4px rgba(255,255,255,0.5)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + (i * 0.5),
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Ethereal Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          mixBlendMode: 'lighten'
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut"
        }}
      />

      {/* Wing Flap Animation Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="relative w-full max-w-4xl h-auto"
          animate={{
            scaleX: [1, 1.02, 1],
            scaleY: [1, 0.98, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          {/* Wing flap effect using transform */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
              mixBlendMode: 'lighten'
            }}
            animate={{
              scaleX: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ButterflyScene;