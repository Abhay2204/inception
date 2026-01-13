import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Layer6_Snow: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const mountainY = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const fortressScale = useTransform(scrollYProgress, [0.2, 0.5], [0.5, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.85], [0, 1, 1, 0]);
  const snowIntensity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <section ref={ref} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-slate-400 via-slate-300 to-slate-200">
        
        {/* Blizzard - snow particles */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: snowIntensity }}
        >
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${(i * 3) % 100}%`,
                opacity: 0.4 + (i % 5) * 0.12
              }}
              animate={{
                y: ['-10vh', '110vh'],
                x: [0, (i % 2 === 0 ? 100 : -100)]
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                ease: "linear",
                delay: (i * 0.05) % 4
              }}
            />
          ))}
        </motion.div>

        {/* Wind streaks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                width: `${200 + (i * 30)}px`,
                top: `${(i * 5) % 100}%`,
                left: '-300px'
              }}
              animate={{ x: '150vw' }}
              transition={{
                duration: 0.5 + (i * 0.03),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.15
              }}
            />
          ))}
        </div>

        {/* Mountains */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[70vh]"
          style={{ y: mountainY }}
        >
          <svg viewBox="0 0 1200 500" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            {/* Far mountains */}
            <motion.path 
              d="M0 500 L150 300 L300 380 L500 200 L700 320 L900 180 L1100 280 L1200 350 L1200 500 Z" 
              fill="#64748b"
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0.3, 0.6]) }}
            />
            {/* Near mountains */}
            <motion.path 
              d="M0 500 L200 350 L400 420 L600 280 L800 380 L1000 300 L1200 400 L1200 500 Z" 
              fill="#475569"
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0.5, 0.8]) }}
            />
          </svg>

          {/* Fortress */}
          <motion.div 
            className="absolute bottom-32 left-1/2 -translate-x-1/2"
            style={{ 
              scale: fortressScale,
              opacity: useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
            }}
          >
            <div className="flex items-end gap-1">
              {/* Left tower */}
              <div className="w-10 h-40 bg-slate-700 border-t border-x border-slate-500 relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-transparent border-b-slate-800" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-amber-200/30" />
              </div>
              {/* Main building */}
              <div className="w-40 h-28 bg-slate-600 border-t border-x border-slate-500">
                <div className="grid grid-cols-5 gap-1 p-2 h-full">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="bg-amber-200/20" />
                  ))}
                </div>
              </div>
              {/* Right tower */}
              <div className="w-10 h-40 bg-slate-700 border-t border-x border-slate-500 relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-transparent border-b-slate-800" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-amber-200/30" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center">
            <motion.div 
              className="text-[10px] font-mono text-slate-600 tracking-[0.5em] mb-4"
              style={{ y: useTransform(scrollYProgress, [0.1, 0.25], [30, 0]) }}
            >
              DREAM LEVEL 03 • THE DEEPEST
            </motion.div>
            <motion.h2 
              className="text-7xl md:text-9xl font-sync font-bold text-slate-800"
              style={{ 
                y: useTransform(scrollYProgress, [0.1, 0.25], [50, 0]),
                textShadow: '0 0 60px rgba(255,255,255,0.3)'
              }}
            >
              FORTRESS
            </motion.h2>
            <motion.p 
              className="mt-6 text-slate-600 text-lg"
              style={{ y: useTransform(scrollYProgress, [0.1, 0.25], [70, 0]) }}
            >
              Fischer's deepest secret lies within
            </motion.p>
          </div>
        </motion.div>

        {/* Temperature */}
        <motion.div 
          className="absolute top-8 right-8 z-20"
          style={{ opacity: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]) }}
        >
          <div className="text-[9px] font-mono text-slate-500 tracking-widest">EXTERNAL</div>
          <div className="text-4xl font-mono text-slate-700">-40°C</div>
        </motion.div>

        {/* The inception quote */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center max-w-lg"
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 1]) }}
        >
          <p className="text-slate-700 text-xl font-light italic">
            "My father didn't want me to be him"
          </p>
          <p className="text-slate-500 text-sm mt-2">— The Inception</p>
        </motion.div>

        {/* Fog overlay */}
        <motion.div 
          className="absolute inset-0 bg-white/20 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 0.4]) }}
        />
      </div>
    </section>
  );
};

export default Layer6_Snow;