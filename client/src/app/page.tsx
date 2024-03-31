"use client";

import GalaxyScene from "@/components/GalaxyScene";

// Just inserted the main scene of the galaxy in the main page created by default by NextJS. It is 100% width and height for cover the whole screen.
export default function Home() {
  return (
    <div className="w-[100%] h-[100%]">
      <GalaxyScene />
    </div>
  );
}
