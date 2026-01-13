import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Layer7_Limbo: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const cityY = useTransform(scrollYProgress, [0, 0.5], [300, 0]);
  const recursiveScale = useTransform(scrollYProgress, [0.3, 0.8], [1, 3]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.85], [0, 1, 1, 0]);

  // Crumbling buildings
  const buildings = [...Array(60)].map((_, i) => ({
    height: 30 + (i * 13) % 180,
    width: 10 + (i * 7) % 20,
    decay: (i * 11) % 100 / 100,
    x: (i * 1.7) - 50,
  }));

  return (
    <section ref={ref} className="h-[600vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        
        {/* Deep void gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0a0a0f_0%,#000_70%)]" />

        {/* Floating particles - like memories dissolving */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/30 rounded-full"
              style={{
                width: 1 + (i % 3),
                height: 1 + (i % 3),
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
              }}
              animate={{
                y: [-50, 50, -50],
                x: [-20, 20, -20],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 8 + (i % 6),
                repeat: Infinity,
                delay: (i * 0.1) % 5
              }}
            />
          ))}
        </div>

        {/* Crumbling city silhouette */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[50vh]"
          style={{ y: cityY, opacity: useTransform(scrollYProgress, [0.1, 0.4], [0, 0.7]) }}
        >
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
            {buildings.map((b, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-t from-gray-800 to-gray-900 border-t border-x border-white/5 mx-[0.5px]"
                style={{
                  height: b.height,
                  width: b.width,
                  clipPath: b.decay > 0.5 ? `polygon(0 ${b.decay * 25}%, 100% 0, 100% 100%, 0 100%)` : undefined,
                  opacity: 0.3 + b.decay * 0.5
                }}
              />
            ))}
          </div>
          {/* Ocean/void */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent" />
        </motion.div>

        {/* Recursive frames - infinite descent */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: recursiveScale }}
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-white/10"
              style={{
                width: `${70 - i * 9}%`,
                height: `${70 - i * 9}%`,
                opacity: useTransform(scrollYProgress, [0.2, 0.5], [0.05, 0.2 - i * 0.02]),
                rotate: useTransform(scrollYProgress, [0.2, 0.8], [0, i * 8])
              }}
            />
          ))}
        </motion.div>

        {/* Text overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center">
            <motion.div 
              className="text-[10px] font-mono text-red-500/60 tracking-[0.5em] mb-4 animate-pulse"
              style={{ y: useTransform(scrollYProgress, [0.1, 0.25], [30, 0]) }}
            >
              ⚠ UNCONSTRUCTED DREAM SPACE
            </motion.div>
            <motion.h2 
              className="text-8xl md:text-[12rem] font-sync font-bold text-white"
              style={{ 
                y: useTransform(scrollYProgress, [0.1, 0.25], [50, 0]),
                textShadow: '0 0 100px rgba(255,255,255,0.2)',
                opacity: useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1])
              }}
            >
              LIMBO
            </motion.h2>
            <motion.p 
              className="mt-8 text-white/30 text-xl max-w-md mx-auto"
              style={{ y: useTransform(scrollYProgress, [0.1, 0.25], [70, 0]) }}
            >
              Where Cobb and Mal spent fifty years
            </motion.p>
          </div>
        </motion.div>

        {/* Time warning */}
        <motion.div 
          className="absolute top-8 right-8 z-20"
          style={{ opacity: useTransform(scrollYProgress, [0.2, 0.35], [0, 1]) }}
        >
          <div className="text-[9px] font-mono text-red-500/80 tracking-widest animate-pulse">
            TIME DILATION
          </div>
          <div className="text-5xl font-mono text-white/80">∞</div>
          <div className="text-[9px] text-white/30 tracking-widest">YEARS</div>
        </motion.div>

        {/* Mal's presence - subtle silhouette */}
        <motion.div 
          className="absolute bottom-1/4 right-1/4 z-10"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 0.4]),
            x: useTransform(scrollYProgress, [0.5, 0.7], [100, 0])
          }}
        >
          <div className="w-12 h-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-10 h-20 bg-white/5 rounded-t" />
          </div>
        </motion.div>

        {/* The quote */}
        <motion.div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-center max-w-2xl"
          style={{ opacity: useTransform(scrollYProgress, [0.65, 0.8], [0, 1]) }}
        >
          <p className="text-white/50 text-xl italic leading-relaxed">
            "You're waiting for a train. A train that will take you far away..."
          </p>
          <p className="text-white/20 text-sm mt-4">— Mal</p>
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)]" />
      </div>
    </section>
  );
};

export default Layer7_Limbo;