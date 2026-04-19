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
          className="fixed left-6 top-6 z-50 h-auto py-3 px-6 rounded-none border-b-4 border-r-4 border-stone-800 bg-stone-200 hover:bg-stone-300 active:border-b-0 active:border-r-0 active:translate-x-[2px] active:translate-y-[2px] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          <Settings2 className="mr-2 h-5 w-5 text-stone-700" />
          <span className="text-2xl tracking-wider text-stone-800 uppercase">
            Customization
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full h-[80vh] p-0 overflow-hidden bg-stone-100 border-4 border-stone-800 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
        <div className="flex h-full w-full">
          {/* Left Side: Selection Box */}
          <div className="w-1/3 border-r-4 border-stone-800 p-8 flex flex-col gap-6 bg-stone-200/50">
            <h2 
              className="text-4xl text-stone-900 uppercase tracking-wider"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              Character Options
            </h2>
            <div className="flex-1 bg-stone-300/30 border-4 border-stone-800/20 flex items-center justify-center text-stone-600 text-xl italic p-4 text-center" style={{ fontFamily: "'VT323', monospace" }}>
              Selection options will appear here...
            </div>
          </div>

          {/* Right Side: Zoomed Character Preview */}
          <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-stone-300/50 to-transparent">
            <div className="scale-[6] transform-gpu">
              <GameCharacter 
                position={{ x: -32, y: -32 }} // Centering the 64px sprite
                direction="down"
                isMoving={false}
                isRunning={false}
              />
            </div>
            <div 
              className="absolute bottom-8 text-stone-800/40 tracking-widest uppercase text-2xl"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              Preview Mode
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationMenu;