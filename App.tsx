import React from 'react';
import { useLenis } from './hooks/useLenis';
import ParadoxCursor from './components/ParadoxCursor';
import DreamLevels from './components/DreamLevels';

import Layer1_Totem from './components/Layer1_Totem';
import Layer2_Team from './components/Layer2_Team';
import Layer3_DreamLayers from './components/Layer3_DreamLayers';
import Layer4_Paris from './components/Layer4_Paris';
import Layer5_Hotel from './components/Layer5_Hotel';
import Layer6_Snow from './components/Layer6_Snow';
import Layer7_Limbo from './components/Layer7_Limbo';
import Layer8_Totems from './components/Layer8_Totems';

const App: React.FC = () => {
  useLenis();

  return (
    <main className="bg-black text-white relative w-full">
      <ParadoxCursor />
      <DreamLevels />

      <Layer1_Totem />
      <Layer2_Team />
      <Layer3_DreamLayers />
      <Layer4_Paris />
      <Layer5_Hotel />
      <Layer6_Snow />
      <Layer7_Limbo />
      <Layer8_Totems />

      {/* The End */}
      <section className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,1)_0%,rgba(0,0,0,1)_70%)]" />
        
        <div className="relative z-10 text-center">
          <div className="text-[10px] font-mono text-white/20 tracking-[0.5em] mb-8">
            A CHRISTOPHER NOLAN FILM
          </div>
          
          <h2 className="text-6xl md:text-8xl font-sync font-bold text-white mb-8 tracking-tighter">
            INCEPTION
          </h2>
          
          <div className="flex items-center justify-center gap-6 text-[10px] font-mono text-white/30">
            <span>2010</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span>148 MIN</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span>PG-13</span>
          </div>

          <div className="mt-16 text-white/20 text-xs">
            Scroll back up to wake up
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;