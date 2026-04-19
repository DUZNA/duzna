"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameCharacter, { ApronSet } from './GameCharacter';
import { Settings2, X, ChevronDown, ChevronRight } from 'lucide-react';

// Import all apron assets (Idle)
import yellowIdle from '@/assets/aprons/idle/yellow.png';
import blackIdle from '@/assets/aprons/idle/black.png';
import blueIdle from '@/assets/aprons/idle/blue.png';
import bluegrayIdle from '@/assets/aprons/idle/bluegray.png';
import brownIdle from '@/assets/aprons/idle/brown.png';
import charcoalIdle from '@/assets/aprons/idle/charcoal.png';
import forestIdle from '@/assets/aprons/idle/forest.png';
import grayIdle from '@/assets/aprons/idle/gray.png';
import greenIdle from '@/assets/aprons/idle/green.png';
import lavenderIdle from '@/assets/aprons/idle/lavender.png';
import leatherIdle from '@/assets/aprons/idle/leather.png';
import maroonIdle from '@/assets/aprons/idle/maroon.png';
import navyIdle from '@/assets/aprons/idle/navy.png';
import orangeIdle from '@/assets/aprons/idle/orange.png';
import pinkIdle from '@/assets/aprons/idle/pink.png';
import purpleIdle from '@/assets/aprons/idle/purple.png';
import redIdle from '@/assets/aprons/idle/red.png';
import roseIdle from '@/assets/aprons/idle/rose.png';
import skyIdle from '@/assets/aprons/idle/sky.png';
import slateIdle from '@/assets/aprons/idle/slate.png';
import tanIdle from '@/assets/aprons/idle/tan.png';
import tealIdle from '@/assets/aprons/idle/teal.png';
import walnutIdle from '@/assets/aprons/idle/walnut.png';
import whiteIdle from '@/assets/aprons/idle/white.png';

// Import all apron assets (Walk)
import yellowWalk from '@/assets/aprons/walk/yellow.png';
import blackWalk from '@/assets/aprons/walk/black.png';
import blueWalk from '@/assets/aprons/walk/blue.png';
import bluegrayWalk from '@/assets/aprons/walk/bluegray.png';
import brownWalk from '@/assets/aprons/walk/brown.png';
import charcoalWalk from '@/assets/aprons/walk/charcoal.png';
import forestWalk from '@/assets/aprons/walk/forest.png';
import grayWalk from '@/assets/aprons/walk/gray.png';
import greenWalk from '@/assets/aprons/walk/green.png';
import lavenderWalk from '@/assets/aprons/walk/lavender.png';
import leatherWalk from '@/assets/aprons/walk/leather.png';
import maroonWalk from '@/assets/aprons/walk/maroon.png';
import navyWalk from '@/assets/aprons/walk/navy.png';
import orangeWalk from '@/assets/aprons/walk/orange.png';
import pinkWalk from '@/assets/aprons/walk/pink.png';
import purpleWalk from '@/assets/aprons/walk/purple.png';
import redWalk from '@/assets/aprons/walk/red.png';
import roseWalk from '@/assets/aprons/walk/rose.png';
import skyWalk from '@/assets/aprons/walk/sky.png';
import slateWalk from '@/assets/aprons/walk/slate.png';
import tanWalk from '@/assets/aprons/walk/tan.png';
import tealWalk from '@/assets/aprons/walk/teal.png';
import walnutWalk from '@/assets/aprons/walk/walnut.png';
import whiteWalk from '@/assets/aprons/walk/white.png';

const PREVIEW_OFFSETS = {
  CLOTHES_FRONT: '0px -128px',
  // Idle sheets are 2 frames wide (2 * 64 = 128)
  SPRITE_SIZE: '128px 256px'
};

const APRONS: { name: string; set: ApronSet }[] = [
  { name: 'Yellow', set: { idle: yellowIdle, walk: yellowWalk } },
  { name: 'Black', set: { idle: blackIdle, walk: blackWalk } },
  { name: 'Blue', set: { idle: blueIdle, walk: blueWalk } },
  { name: 'Blue Gray', set: { idle: bluegrayIdle, walk: bluegrayWalk } },
  { name: 'Brown', set: { idle: brownIdle, walk: brownWalk } },
  { name: 'Charcoal', set: { idle: charcoalIdle, walk: charcoalWalk } },
  { name: 'Forest', set: { idle: forestIdle, walk: forestWalk } },
  { name: 'Gray', set: { idle: grayIdle, walk: grayWalk } },
  { name: 'Green', set: { idle: greenIdle, walk: greenWalk } },
  { name: 'Lavender', set: { idle: lavenderIdle, walk: lavenderWalk } },
  { name: 'Leather', set: { idle: leatherIdle, walk: leatherWalk } },
  { name: 'Maroon', set: { idle: maroonIdle, walk: maroonWalk } },
  { name: 'Navy', set: { idle: navyIdle, walk: navyWalk } },
  { name: 'Orange', set: { idle: orangeIdle, walk: orangeWalk } },
  { name: 'Pink', set: { idle: pinkIdle, walk: pinkWalk } },
  { name: 'Purple', set: { idle: purpleIdle, walk: purpleWalk } },
  { name: 'Red', set: { idle: redIdle, walk: redWalk } },
  { name: 'Rose', set: { idle: roseIdle, walk: roseWalk } },
  { name: 'Sky', set: { idle: skyIdle, walk: skyWalk } },
  { name: 'Slate', set: { idle: slateIdle, walk: slateWalk } },
  { name: 'Tan', set: { idle: tanIdle, walk: tanWalk } },
  { name: 'Teal', set: { idle: tealIdle, walk: tealWalk } },
  { name: 'Walnut', set: { idle: walnutIdle, walk: walnutWalk } },
  { name: 'White', set: { idle: whiteIdle, walk: whiteWalk } },
];

interface CustomizationMenuProps {
  selectedApron: ApronSet | null;
  onSelectApron: (set: ApronSet | null) => void;
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
      <DialogContent className="max-w-[1000px] w-[90vw] h-[80vh] min-h-[80vh] max-h-[80vh] p-0 overflow-hidden bg-stone-100 border-4 border-stone-800 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
        <div className="flex h-full w-full gap-8 p-8 overflow-hidden">
          <div className="w-[400px] h-full flex-none flex flex-col bg-stone-200/50 border-4 border-stone-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="space-y-2 mb-6 flex-none">
              <h2 className="text-4xl text-stone-900 uppercase tracking-wider" style={{ fontFamily: "'VT323', monospace" }}>Inventory</h2>
              <div className="h-1 w-full bg-stone-800" />
            </div>

            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-3">
                <button
                  onClick={() => setIsClothesOpen(!isClothesOpen)}
                  className={`w-full flex items-center justify-between p-3 border-2 border-stone-800 transition-colors ${isClothesOpen ? 'bg-stone-800 text-stone-100' : 'bg-stone-300 text-stone-800 hover:bg-stone-400'}`}
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  <span className="text-2xl uppercase tracking-tight">Clothes</span>
                  {isClothesOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>

                {isClothesOpen && (
                  <div className="pl-4 space-y-2">
                    <button
                      onClick={() => setIsApronsOpen(!isApronsOpen)}
                      className={`w-full flex items-center justify-between p-2 border-2 border-stone-800 transition-colors ${isApronsOpen ? 'bg-stone-400 text-stone-900' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'}`}
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      <span className="text-xl uppercase">Aprons</span>
                      {isApronsOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {isApronsOpen && (
                      <div className="grid grid-cols-3 gap-y-8 gap-x-2 py-6">
                        <button
                          onClick={() => onSelectApron(null)}
                          className="flex flex-col items-center gap-2 group"
                          style={{ fontFamily: "'VT323', monospace" }}
                        >
                          <div className={`w-16 h-16 flex items-center justify-center transition-all rounded-lg ${!selectedApron ? 'bg-stone-800/10 ring-2 ring-stone-800' : 'group-hover:bg-stone-800/5'}`}>
                            <X size={32} className={`${!selectedApron ? 'text-stone-900' : 'text-stone-400'}`} />
                          </div>
                          <span className={`text-sm uppercase tracking-tighter ${!selectedApron ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>None</span>
                        </button>

                        {APRONS.map((apron) => (
                          <button
                            key={apron.name}
                            onClick={() => onSelectApron(apron.set)}
                            className="flex flex-col items-center gap-2 group"
                            style={{ fontFamily: "'VT323', monospace" }}
                          >
                            <div className={`w-16 h-16 transition-all flex items-center justify-center rounded-lg ${selectedApron === apron.set ? 'bg-stone-800/10 ring-2 ring-stone-800 scale-110' : 'group-hover:bg-stone-800/5'}`}>
                              <div 
                                className="w-16 h-16"
                                style={{ 
                                  backgroundImage: `url(${apron.set.idle})`,
                                  backgroundPosition: PREVIEW_OFFSETS.CLOTHES_FRONT,
                                  backgroundSize: PREVIEW_OFFSETS.SPRITE_SIZE,
                                  imageRendering: 'pixelated'
                                }}
                              />
                            </div>
                            <span className={`text-sm uppercase tracking-tighter text-center leading-none ${selectedApron === apron.set ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
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

          <div className="flex-1 h-full relative bg-stone-200/30 border-4 border-stone-800/10 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="scale-[6] transform-gpu">
                  <GameCharacter 
                    position={{ x: -32, y: -32 }} 
                    direction="down"
                    isMoving={false}
                    isRunning={false}
                    apron={selectedApron}
                    noTransition={true}
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-stone-800/40 tracking-widest uppercase text-2xl pointer-events-none" style={{ fontFamily: "'VT323', monospace" }}>
              Character Preview
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationMenu;