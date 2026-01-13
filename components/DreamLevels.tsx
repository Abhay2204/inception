import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DreamLevels: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Depth meter - left side */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:block">
        <div className="flex flex-col items-center">
          <motion.div 
            className="text-[9px] font-mono text-white/30 tracking-widest mb-4 -rotate-90 origin-center whitespace-nowrap"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
          >
            DEPTH
          </motion.div>
          
          {/* Depth bar */}
          <div className="w-[2px] h-40 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-white via-purple-500 to-red-500 rounded-full origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          {/* Level indicators */}
          <div className="mt-4 flex flex-col gap-2">
            {[0, 1, 2, 3, 4].map((level) => {
              const start = level * 0.18;
              return (
                <motion.div
                  key={level}
                  className="w-2 h-2 rounded-full border border-white/30"
                  style={{
                    backgroundColor: useTransform(scrollYProgress, 
                      [start, start + 0.05], 
                      ['transparent', '#fff']
                    ),
                    scale: useTransform(scrollYProgress, 
                      [start, start + 0.05, start + 0.15], 
                      [1, 1.5, 1]
                    )
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Time indicator - right side */}
      <motion.div 
        className="fixed right-6 bottom-8 z-[100] hidden lg:block"
        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}
      >
        <div className="text-right">
          <div className="text-[8px] font-mono text-white/30 tracking-widest mb-1">SUBJECTIVE TIME</div>
          <motion.div 
            className="text-lg font-mono text-white/60"
            style={{
              // This would ideally interpolate through time values
            }}
          >
            <motion.span style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}>10 HRS</motion.span>
            <motion.span className="absolute" style={{ opacity: useTransform(scrollYProgress, [0.15, 0.35, 0.5], [0, 1, 0]) }}>1 WEEK</motion.span>
            <motion.span className="absolute" style={{ opacity: useTransform(scrollYProgress, [0.45, 0.55, 0.7], [0, 1, 0]) }}>6 MONTHS</motion.span>
            <motion.span className="absolute" style={{ opacity: useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0, 1, 0]) }}>10 YEARS</motion.span>
            <motion.span className="absolute" style={{ opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 1]) }}>∞</motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Cinematic bars */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-12 bg-black z-[90]"
        style={{ 
          scaleY: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
          transformOrigin: 'top'
        }}
      />
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-12 bg-black z-[90]"
        style={{ 
          scaleY: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
          transformOrigin: 'bottom'
        }}
      />
    </>
  );
};

export default DreamLevels;