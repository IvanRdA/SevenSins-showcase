"use client";

import DataView from "@/components/DataView";

const GraphicsView: React.FC = () => {
  return (
    <div className="w-[100%] h-[100%]">
      <h1>Graphics view test!</h1>
      <DataView fallback={`<h1>Loading data...</h1>`} />
    </div>
  );
};

export default GraphicsView;
