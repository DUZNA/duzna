"use client";

import GamePlayground from "@/components/GamePlayground";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <main className="flex-1 flex items-center justify-center w-full">
        <GamePlayground />
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;