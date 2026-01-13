import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Layer1_Totem: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const totemRotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const totemScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 0.5]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ['-0.05em', '0.3em']);

  return (
    <section ref={ref} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        
        {/* Deep space background */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1a2e_0%,#000_70%)]" />
          
          {/* Stars */}
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
                opacity: 0.3 + (i % 5) * 0.15,
                y: useTransform(scrollYProgress, [0, 1], [0, -100 - (i % 3) * 50])
              }}
            />
          ))}
        </motion.div>

        {/* Tunnel rings - creates depth illusion */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${150 + i * 100}%`,
                height: `${150 + i * 100}%`,
                scale: useTransform(scrollYProgress, [0, 1], [1, 2 + i * 0.3]),
                opacity: useTransform(scrollYProgress, [0, 0.5], [0.1 - i * 0.01, 0]),
                rotate: useTransform(scrollYProgress, [0, 1], [0, 30 * (i % 2 === 0 ? 1 : -1)])
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ 
            opacity,
            filter: useTransform(blur, v => `blur(${v}px)`)
          }}
        >
          {/* Tagline */}
          <motion.div 
            className="text-[10px] font-mono text-white/50 tracking-[0.5em] mb-8"
            style={{ y: y1 }}
          >
            YOUR MIND IS THE SCENE OF THE CRIME
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-[12vw] md:text-[10vw] font-sync font-bold text-white leading-none"
            style={{ 
              y: y2,
              letterSpacing,
              textShadow: '0 0 100px rgba(255,255,255,0.3)'
            }}
          >
            INCEPTION
          </motion.h1>

          {/* Subtitle */}
          <motion.div 
            className="mt-8 text-white/30 text-sm tracking-[0.3em]"
            style={{ y: y3 }}
          >
            A CHRISTOPHER NOLAN FILM
          </motion.div>
        </motion.div>

        {/* Central totem */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ 
            rotate: totemRotate,
            scale: totemScale,
            opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
          }}
        >
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 border-2 border-white/40 rounded-full" />
            <div className="absolute inset-2 border border-white/20 rounded-full" />
            <div className="absolute inset-4 border border-white/10 rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-white/80 via-white/40 to-transparent" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <motion.div 
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <span className="mt-4 text-[9px] font-mono text-white/30 tracking-[0.3em]">FALL DEEPER</span>
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>
    </section>
  );
};

export default Layer1_Totem;