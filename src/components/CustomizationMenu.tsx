"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameCharacter from './GameCharacter';
import { Settings2, X, ChevronDown, ChevronRight } from 'lucide-react';

// Import all apron assets
import yellow from '@/assets/aprons/yellow.png';
import black from '@/assets/aprons/black.png';
import blue from '@/assets/aprons/blue.png';
import bluegray from '@/assets/aprons/bluegray.png';
import brown from '@/assets/aprons/brown.png';
import charcoal from '@/assets/aprons/charcoal.png';
import forest from '@/assets/aprons/forest.png';
import gray from '@/assets/aprons/gray.png';
import green from '@/assets/aprons/green.png';
import lavender from '@/assets/aprons/lavender.png';
import leather from '@/assets/aprons/leather.png';
import maroon from '@/assets/aprons/maroon.png';
import navy from '@/assets/aprons/navy.png';
import orange from '@/assets/aprons/orange.png';
import pink from '@/assets/aprons/pink.png';
import purple from '@/assets/aprons/purple.png';
import red from '@/assets/aprons/red.png';
import rose from '@/assets/aprons/rose.png';
import sky from '@/assets/aprons/sky.png';
import slate from '@/assets/aprons/slate.png';
import tan from '@/assets/aprons/tan.png';
import teal from '@/assets/aprons/teal.png';
import walnut from '@/assets/aprons/walnut.png';
import white from '@/assets/aprons/white.png';

const APRONS = [
  { name: 'Yellow', src: yellow },
  { name: 'Black', src: black },
  { name: 'Blue', src: blue },
  { name: 'Blue Gray', src: bluegray },
  { name: 'Brown', src: brown },
  { name: 'Charcoal', src: charcoal },
  { name: 'Forest', src: forest },
  { name: 'Gray', src: gray },
  { name: 'Green', src: green },
  { name: 'Lavender', src: lavender },
  { name: 'Leather', src: leather },
  { name: 'Maroon', src: maroon },
  { name: 'Navy', src: navy },
  { name: 'Orange', src: orange },
  { name: 'Pink', src: pink },
  { name: 'Purple', src: purple },
  { name: 'Red', src: red },
  { name: 'Rose', src: rose },
  { name: 'Sky', src: sky },
  { name: 'Slate', src: slate },
  { name: 'Tan', src: tan },
  { name: 'Teal', src: teal },
  { name: 'Walnut', src: walnut },
  { name: 'White', src: white },
];

interface CustomizationMenuProps {
  selectedApron: string | null;
  onSelectApron: (src: string | null) => void;
}

const CustomizationMenu: React.FC<CustomizationMenuProps> = ({ selectedApron, onSelectApron }) => {
  const [isClothesOpen, setIsClothesOpen] = useState(true);
  const [isApronsOpen, setIsApronsOpen] = useState(false);

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
        <div className="flex h-full w-full items-stretch">
          {/* Left Side: Selection Box */}
          <div className="w-1/3 border-r-4 border-stone-800 p-6 flex flex-col gap-4 bg-stone-200/50">
            <div className="space-y-2 mb-4">
              <h2 
                className="text-4xl text-stone-900 uppercase tracking-wider"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                Inventory
              </h2>
              <div className="h-1 w-full bg-stone-800" />
            </div>

            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-2">
                {/* Clothes Category */}
                <button
                  onClick={() => setIsClothesOpen(!isClothesOpen)}
                  className="w-full flex items-center justify-between p-3 bg-stone-300 border-2 border-stone-800 hover:bg-stone-400 transition-colors"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  <span className="text-2xl uppercase tracking-tight">Clothes</span>
                  {isClothesOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>

                {isClothesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {/* Aprons Sub-category */}
                    <button
                      onClick={() => setIsApronsOpen(!isApronsOpen)}
                      className="w-full flex items-center justify-between p-2 bg-stone-200 border-2 border-stone-800 hover:bg-stone-300 transition-colors"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      <span className="text-xl uppercase">Aprons</span>
                      {isApronsOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {isApronsOpen && (
                      <div className="grid grid-cols-3 gap-y-6 gap-x-2 py-4">
                        {/* Remove Option */}
                        <button
                          onClick={() => onSelectApron(null)}
                          className="flex flex-col items-center gap-2 group"
                          style={{ fontFamily: "'VT323', monospace" }}
                        >
                          <div className={`w-14 h-14 flex items-center justify-center border-2 transition-all ${!selectedApron ? 'border-stone-800 bg-stone-300' : 'border-transparent group-hover:border-stone-400 bg-stone-200/50'}`}>
                            <X size={28} className="text-stone-600" />
                          </div>
                          <span className={`text-sm uppercase tracking-tighter ${!selectedApron ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>None</span>
                        </button>

                        {APRONS.map((apron) => (
                          <button
                            key={apron.name}
                            onClick={() => onSelectApron(apron.src)}
                            className="flex flex-col items-center gap-2 group"
                            style={{ fontFamily: "'VT323', monospace" }}
                          >
                            <div 
                              className={`w-14 h-14 border-2 transition-all flex items-center justify-center ${selectedApron === apron.src ? 'border-stone-800 bg-stone-300 scale-105' : 'border-transparent group-hover:border-stone-400 bg-stone-200/50'}`}
                            >
                              <div 
                                className="w-12 h-12"
                                style={{ 
                                  backgroundImage: `url(${apron.src})`,
                                  backgroundPosition: '0 0',
                                  backgroundSize: '96px 192px', // Scaled for 48px display
                                  imageRendering: 'pixelated'
                                }}
                              />
                            </div>
                            <span className={`text-sm uppercase tracking-tighter text-center leading-none ${selectedApron === apron.src ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
                              {apron.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Side: Zoomed Character Preview */}
          <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-stone-300/50 to-transparent overflow-hidden">
            {/* Fixed Preview Container - Using absolute centering to prevent shifts */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-16 h-16"> {/* Base size of sprite */}
                <div className="absolute inset-0 scale-[5] transform-gpu origin-center">
                  <GameCharacter 
                    position={{ x: 0, y: 0 }} 
                    direction="down"
                    isMoving={false}
                    isRunning={false}
                    apronSrc={selectedApron}
                  />
                </div>
              </div>
            </div>
            
            <div 
              className="absolute bottom-8 text-stone-800/40 tracking-widest uppercase text-2xl pointer-events-none"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              Character Preview
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationMenu;