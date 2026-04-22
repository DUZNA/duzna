"use client";

import React from 'react';
import { BASE_ASSETS } from '@/constants/assets';

// This component renders all assets in a hidden div to force browser caching
const AssetPreloader = () => {
  return (
    <div className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
      {BASE_ASSETS.map((src, index) => (
        <img key={`base-${index}`} src={src} alt="" />
      ))}
    </div>
  );
};

export default AssetPreloader;