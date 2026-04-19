"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GameCharacter from './GameCharacter';
import { Settings2 } from 'lucide-react';

const CustomizationMenu = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          className="fixed left-4 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-left z-50 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-emerald-800/20 font-bold tracking-widest"
        >
          <Settings2 className="mr-2 h-4 w-4 rotate-90" />
          CUSTOMIZATION
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full h-[80vh] p-0 overflow-hidden bg-slate-50/95 backdrop-blur-md border-4 border-emerald-800/20">
        <div className="flex h-full w-full">
          {/* Left Side: Selection Box */}
          <div className="w-1/3 border-r-4 border-emerald-800/10 p-8 flex flex-col gap-6 bg-white/50">
            <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tighter">
              Character Options
            </h2>
            <div className="flex-1 bg-slate-100 rounded-2xl border-2 border-dashed border-emerald-800/20 flex items-center justify-center text-emerald-800/40 font-medium italic">
              Selection options will appear here...
            </div>
          </div>

          {/* Right Side: Zoomed Character Preview */}
          <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-emerald-100/50 to-transparent">
            <div className="scale-[4] transform-gpu">
              <GameCharacter 
                position={{ x: -32, y: -32 }} // Centering the 64px sprite
                direction="down"
                isMoving={false}
                isRunning={false}
              />
            </div>
            <div className="absolute bottom-8 text-emerald-900/40 font-bold tracking-widest uppercase text-sm">
              Preview Mode
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationMenu;