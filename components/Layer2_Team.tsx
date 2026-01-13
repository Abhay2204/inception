import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const team = [
  { name: "COBB", role: "Extractor", color: "#3b82f6" },
  { name: "ARTHUR", role: "Point Man", color: "#8b5cf6" },
  { name: "ARIADNE", role: "Architect", color: "#f59e0b" },
  { name: "EAMES", role: "Forger", color: "#ef4444" },
  { name: "YUSUF", role: "Chemist", color: "#22c55e" },
  { name: "SAITO", role: "Tourist", color: "#06b6d4" },
];

const Layer2_Team: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={ref} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Radial pulse background */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
              style={{
                width: `${(i + 1) * 40}%`,
                height: `${(i + 1) * 40}%`,
                scale: useTransform(scrollYProgress, [0, 1], [1, 1.5 + i * 0.2]),
                opacity: useTransform(scrollYProgress, [0.1, 0.5], [0.1, 0.02])
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity, y, scale }} className="relative z-10 w-full max-w-6xl px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-20"
            style={{
              y: useTransform(scrollYProgress, [0.1, 0.4], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
            }}
          >
            <div className="text-[10px] font-mono text-white/40 tracking-[0.5em] mb-4">
              THE EXTRACTION TEAM
            </div>
            <h2 className="text-6xl md:text-8xl font-sync font-bold text-white tracking-tighter">
              THE CREW
            </h2>
          </motion.div>

          {/* Team members - staggered reveal */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, i) => {
              const startProgress = 0.2 + i * 0.08;
              return (
                <motion.div
                  key={member.name}
                  className="relative group"
                  style={{
                    y: useTransform(scrollYProgress, [startProgress, startProgress + 0.15], [100, 0]),
                    opacity: useTransform(scrollYProgress, [startProgress, startProgress + 0.1], [0, 1]),
                    scale: useTransform(scrollYProgress, [startProgress, startProgress + 0.15], [0.8, 1])
                  }}
                >
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ backgroundColor: `${member.color}30` }}
                  />
                  
                  <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-500">
                    {/* Avatar */}
                    <motion.div 
                      className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-sync relative overflow-hidden"
                      style={{ backgroundColor: `${member.color}20` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span style={{ color: member.color }}>{member.name[0]}</span>
                      <motion.div 
                        className="absolute inset-0 border-2 rounded-full"
                        style={{ borderColor: member.color }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>

                    <div className="text-center">
                      <h3 className="text-xl font-sync font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-sm tracking-widest" style={{ color: member.color }}>{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mission text */}
          <motion.div 
            className="mt-20 text-center"
            style={{
              y: useTransform(scrollYProgress, [0.6, 0.8], [50, 0]),
              opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 1])
            }}
          >
            <p className="text-2xl md:text-3xl font-light text-white/60 max-w-3xl mx-auto leading-relaxed">
              "We need to go <span className="text-white font-medium">deeper</span>."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Layer2_Team;