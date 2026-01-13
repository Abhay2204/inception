import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Layer4_Paris: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const foldAngle = useTransform(scrollYProgress, [0.2, 0.6], [0, 180]);
  const cityY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.85], [0, 1, 1, 0]);

  // Generate buildings
  const buildings = [...Array(40)].map((_, i) => ({
    height: 50 + (i * 17) % 150,
    width: 15 + (i * 7) % 25,
    x: (i * 2.5) - 50,
  }));

  return (
    <section ref={ref} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-amber-950/20 via-black to-black">
        
        {/* Grid background */}
        <motion.div 
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [0, 0.15]),
            backgroundImage: 'linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            y: useTransform(scrollYProgress, [0, 1], [0, -200])
          }}
        />

        {/* City fold visualization */}
        <div className="absolute inset-0 flex items-center justify-center perspective-[2000px]">
          
          {/* Ground city */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ y: cityY }}
          >
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
              {buildings.map((b, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-amber-900/60 to-amber-800/30 border-t border-x border-amber-500/30 mx-[1px]"
                  style={{
                    height: b.height,
                    width: `${b.width}px`,
                    opacity: useTransform(scrollYProgress, [0.1, 0.3], [0.3, 0.8])
                  }}
                />
              ))}
            </div>
            {/* Ground glow */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-500/20 to-transparent" />
          </motion.div>

          {/* Folding city (top half) */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1/2 origin-bottom"
            style={{ 
              rotateX: foldAngle,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-full scale-y-[-1]">
              <div className="absolute top-0 left-0 right-0 flex items-start justify-center">
                {buildings.map((b, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-b from-amber-900/60 to-amber-800/30 border-b border-x border-amber-500/30 mx-[1px]"
                    style={{
                      height: b.height,
                      width: `${b.width}px`,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Fold shadow */}
            <motion.div 
              className="absolute inset-0 bg-black"
              style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 0.7]) }}
            />
          </motion.div>

          {/* Fold line glow */}
          <motion.div 
            className="absolute left-0 right-0 top-1/2 h-1 z-10"
            style={{
              background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
              opacity: useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]),
              boxShadow: '0 0 40px 10px rgba(245,158,11,0.5)',
              scaleX: useTransform(scrollYProgress, [0.25, 0.4], [0, 1])
            }}
          />
        </div>

        {/* Text overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center">
            <motion.div 
              className="text-[10px] font-mono text-amber-500/60 tracking-[0.5em] mb-4"
              style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [30, 0]) }}
            >
              DREAM LEVEL 01 • PARIS
            </motion.div>
            <motion.h2 
              className="text-7xl md:text-9xl font-sync font-bold text-white"
              style={{ 
                y: useTransform(scrollYProgress, [0.1, 0.3], [50, 0]),
                textShadow: '0 0 80px rgba(245,158,11,0.3)'
              }}
            >
              THE FOLD
            </motion.h2>
            <motion.p 
              className="mt-6 text-white/40 text-lg max-w-md mx-auto"
              style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [70, 0]) }}
            >
              "You create the world of the dream"
            </motion.p>
          </div>
        </motion.div>

        {/* Coordinates */}
        <motion.div 
          className="absolute top-8 right-8 text-right z-20"
          style={{ opacity: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]) }}
        >
          <div className="text-[9px] font-mono text-amber-500/40 tracking-widest">COORDINATES</div>
          <div className="text-amber-500/60 font-mono">48.8566° N</div>
          <div className="text-amber-500/60 font-mono">2.3522° E</div>
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)]" />
      </div>
    </section>
  );
};

export default Layer4_Paris;