"use client";

import React, { useState } from 'react';
import GamePlayground from "@/components/GamePlayground";
import LoadingScreen from "@/components/LoadingScreen";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <main className="flex-1 flex items-center justify-center w-full">
            <GamePlayground />
          </main>
          <MadeWithDyad />
        </>
      )}
    </div>
  );
};

export default Index;