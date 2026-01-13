import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const ParadoxCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 30, stiffness: 150 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  const trail2Config = { damping: 40, stiffness: 100 };
  const trail2X = useSpring(mouseX, trail2Config);
  const trail2Y = useSpring(mouseY, trail2Config);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest('button') || 
        !!target.closest('a') || 
        target.hasAttribute('data-hover')
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Trail 2 - furthest */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9997] mix-blend-difference"
        style={{ 
          x: trail2X, 
          y: trail2Y, 
          translateX: '-50%', 
          translateY: '-50%',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}
      />

      {/* Trail 1 */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9998] mix-blend-difference border border-white/20"
        style={{ 
          x: trailX, 
          y: trailY, 
          translateX: '-50%', 
          translateY: '-50%'
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: isHovering ? 40 : 8,
            height: isHovering ? 40 : 8,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border border-white/30"
        style={{ 
          x: trailX, 
          y: trailY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          borderColor: isHovering ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default ParadoxCursor;