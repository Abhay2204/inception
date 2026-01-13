import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const layers = [
  { level: 0, name: "REALITY", time: "10 HRS", color: "#ffffff", location: "The Flight" },
  { level: 1, name: "THE VAN", time: "1 WEEK", color: "#3b82f6", location: "Los Angeles" },
  { level: 2, name: "THE HOTEL", time: "6 MONTHS", color: "#8b5cf6", location: "Corridor 5" },
  { level: 3, name: "THE FORTRESS", time: "10 YEARS", color: "#94a3b8", location: "Snow Mountain" },
  { level: 4, name: "LIMBO", time: "∞", color: "#ef4444", location: "Unconstructed Space" },
];

const Layer3_DreamLayers: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={ref} className="h-[600vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        
        {/* Falling through layers effect */}
        <div className="absolute inset-0">
          {layers.map((layer, i) => {
            const start = i * 0.18;
            const end = start + 0.25;
            
            return (
              <motion.div
                key={layer.level}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: useTransform(scrollYProgress, 
                    [start, start + 0.05, end - 0.05, end], 
                    [0, 1, 1, 0]
                  ),
                  scale: useTransform(scrollYProgress, 
                    [start, end], 
                    [0.5, 2]
                  ),
                  y: useTransform(scrollYProgress, 
                    [start, end], 
                    ['20%', '-20%']
                  ),
                }}
              >
                {/* Layer ring */}
                <motion.div 
                  className="absolute w-[150vw] h-[150vw] border rounded-full"
                  style={{ 
                    borderColor: `${layer.color}30`,
                    rotate: useTransform(scrollYProgress, [start, end], [0, 180])
                  }}
                />
                <motion.div 
                  className="absolute w-[120vw] h-[120vw] border rounded-full"
                  style={{ 
                    borderColor: `${layer.color}20`,
                    rotate: useTransform(scrollYProgress, [start, end], [0, -90])
                  }}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="text-[12px] font-mono tracking-[0.5em] mb-4"
                    style={{ color: layer.color }}
                  >
                    LEVEL {layer.level}
                  </motion.div>
                  
                  <motion.h2 
                    className="text-7xl md:text-9xl font-sync font-bold text-white mb-4"
                    style={{
                      textShadow: `0 0 60px ${layer.color}50`
                    }}
                  >
                    {layer.name}
                  </motion.h2>
                  
                  <motion.div className="flex items-center justify-center gap-8 text-white/50">
                    <span className="text-sm">{layer.location}</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full" />
                    <span className="font-mono text-lg" style={{ color: layer.color }}>{layer.time}</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Depth indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col items-center gap-2">
            {layers.map((layer, i) => {
              const start = i * 0.18;
              const end = start + 0.18;
              return (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full border-2 transition-all"
                  style={{
                    borderColor: layer.color,
                    backgroundColor: useTransform(scrollYProgress, 
                      [start, start + 0.05], 
                      ['transparent', layer.color]
                    ),
                    scale: useTransform(scrollYProgress, 
                      [start, start + 0.05, end], 
                      [1, 1.5, 1]
                    )
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Time dilation warning */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.85], [0, 1])
          }}
        >
          <div className="text-center">
            <div className="text-red-500 text-[10px] font-mono tracking-[0.3em] animate-pulse">
              ⚠ TIME DILATION CRITICAL
            </div>
            <div className="text-white/40 text-xs mt-2">
              Each level multiplies time by 20x
            </div>
          </div>
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
      </div>
    </section>
  );
};

export default Layer3_DreamLayers;