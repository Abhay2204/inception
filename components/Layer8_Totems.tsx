import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Layer8_Totems: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const totemRotate = useTransform(scrollYProgress, [0, 1], [0, 1800]);
  const totemScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.5, 1.2, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Subtle radial light */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 50%)',
            scale: useTransform(scrollYProgress, [0, 0.5], [0.5, 2])
          }}
        />

        {/* Centered container for totem */}
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Title above totem */}
          <motion.div 
            className="text-center mb-16"
            style={{ opacity: textOpacity }}
          >
            <div className="text-[10px] font-mono text-white/40 tracking-[0.5em] mb-4">
              THE FINAL QUESTION
            </div>
            <h2 className="text-5xl md:text-7xl font-sync font-bold text-white">
              DID IT FALL?
            </h2>
          </motion.div>

          {/* Spinning top - centered */}
          <motion.div 
            className="relative"
            style={{ 
              rotate: totemRotate,
              scale: totemScale
            }}
          >
            <div className="relative w-32 h-32">
              {/* Top body */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-b from-slate-300 to-slate-500 border-2 border-slate-400 shadow-[0_0_60px_rgba(255,255,255,0.3)]" />
              </div>
              {/* Spindle */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-20 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full" />
              {/* Tip */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-1.5 h-6 bg-slate-600 rounded-b-full" />
              {/* Rings */}
              <motion.div 
                className="absolute inset-0 border-2 border-white/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-3 border border-white/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Shadow under top */}
          <motion.div 
            className="w-24 h-3 bg-white/10 rounded-full blur-md mt-4"
            style={{
              scale: useTransform(scrollYProgress, [0.3, 0.6], [0.5, 1.2]),
              opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 0.5])
            }}
          />

          {/* Text below totem */}
          <motion.div 
            className="text-center mt-16"
            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
          >
            <p className="text-white/30 text-lg max-w-md mx-auto leading-relaxed">
              Cobb walks away to his children, not caring anymore.
            </p>
            <p className="text-white/20 text-sm mt-4">
              Maybe that's the point.
            </p>
          </motion.div>
        </div>

        {/* Totem rule reminder */}
        <motion.div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-center"
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 1]) }}
        >
          <div className="text-[9px] font-mono text-white/30 tracking-[0.3em] mb-2">
            TOTEM RULE
          </div>
          <p className="text-white/50 text-sm max-w-sm">
            In reality, it falls. In a dream, it spins forever.
          </p>
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.95)_100%)]" />
      </div>
    </section>
  );
};

export default Layer8_Totems;