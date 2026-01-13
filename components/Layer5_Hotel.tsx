import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Layer5_Hotel: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const corridorRotate = useTransform(scrollYProgress, [0.15, 0.5], [0, 90]);
  const gravity = useTransform(scrollYProgress, [0.15, 0.4], [1, 0]);

  return (
    <section ref={ref} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        
        {/* Purple ambient glow */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)]"
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
        />

        {/* Rotating corridor container */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotate: corridorRotate }}
        >
          {/* Corridor structure */}
          <div className="relative w-full max-w-4xl h-[60vh]">
            
            {/* Ceiling */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-900/50 to-transparent border-b border-purple-500/30"
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
            >
              {/* Lights */}
              <div className="flex justify-center gap-32 pt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-20 h-2 bg-purple-400/60 rounded-full"
                    style={{ 
                      boxShadow: '0 0 30px rgba(168,85,247,0.6)',
                      opacity: useTransform(scrollYProgress, [0.2, 0.3], [0.3, 1])
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floor */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-900/50 to-transparent border-t border-purple-500/30"
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
            />

            {/* Left wall with door */}
            <motion.div 
              className="absolute left-0 top-16 bottom-16 w-24 bg-gradient-to-r from-purple-900/30 to-transparent border-r border-purple-500/20"
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-16 h-32 border border-white/20 bg-black/50 flex items-end justify-center pb-2">
                <span className="text-white/30 text-xs font-mono">528</span>
              </div>
            </motion.div>

            {/* Right wall with door */}
            <motion.div 
              className="absolute right-0 top-16 bottom-16 w-24 bg-gradient-to-l from-purple-900/30 to-transparent border-l border-purple-500/20"
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 right-4 w-16 h-32 border border-white/20 bg-black/50 flex items-end justify-center pb-2">
                <span className="text-white/30 text-xs font-mono">529</span>
              </div>
            </motion.div>

            {/* Floating objects */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 border border-white/20"
                style={{
                  width: 10 + (i % 4) * 8,
                  height: 10 + (i % 3) * 12,
                  left: `${15 + (i * 7) % 70}%`,
                  top: `${20 + (i * 11) % 60}%`,
                  opacity: useTransform(scrollYProgress, [0.25, 0.4], [0, 0.6]),
                  y: useTransform(gravity, [1, 0], [0, (i % 2 === 0 ? -50 : 50) - 25]),
                  x: useTransform(gravity, [1, 0], [0, (i % 3 - 1) * 30]),
                  rotate: useTransform(gravity, [1, 0], [0, (i * 45) % 360])
                }}
              />
            ))}

            {/* Arthur figure */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                opacity: useTransform(scrollYProgress, [0.2, 0.35], [0, 1]),
                y: useTransform(gravity, [1, 0], [0, -30]),
                rotate: useTransform(gravity, [1, 0], [0, 15])
              }}
            >
              <div className="w-6 h-6 rounded-full bg-purple-400/80 mb-1 mx-auto shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
              <div className="w-8 h-14 bg-purple-400/60 rounded-t mx-auto" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text overlay - doesn't rotate */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.05, 0.15, 0.6, 0.75], [0, 1, 1, 0])
          }}
        >
          <div className="text-center">
            <motion.div 
              className="text-[10px] font-mono text-purple-400/60 tracking-[0.5em] mb-4"
            >
              DREAM LEVEL 02 • ZERO GRAVITY
            </motion.div>
            <motion.h2 
              className="text-7xl md:text-9xl font-sync font-bold text-white"
              style={{ textShadow: '0 0 80px rgba(139,92,246,0.4)' }}
            >
              THE HOTEL
            </motion.h2>
          </div>
        </motion.div>

        {/* Gravity indicator */}
        <motion.div 
          className="absolute top-8 right-8 z-20"
          style={{ opacity: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]) }}
        >
          <div className="text-[9px] font-mono text-red-500/80 tracking-widest animate-pulse">
            ⚠ GRAVITY ANOMALY
          </div>
          <motion.div 
            className="text-4xl font-mono text-purple-400 mt-1"
            style={{ rotate: corridorRotate }}
          >
            <motion.span>
              {/* Display gravity value */}
            </motion.span>
            0.0g
          </motion.div>
        </motion.div>

        {/* Quote */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center"
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.65], [0, 1]) }}
        >
          <p className="text-white/40 text-lg italic">"Quick, give me a kiss"</p>
          <p className="text-purple-400/40 text-sm mt-2">— Arthur</p>
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
      </div>
    </section>
  );
};

export default Layer5_Hotel;