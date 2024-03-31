import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import GalacticSystem from "./GalacticSystem";
import Controls from "./Controls";

const GalaxyScene: React.FC = () => {
  const sys: any[] = [];
  const [systems, setSystems] = useState(sys);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("http://localhost:8080/procedural");
        const data = await response.json();

        for (let s = 0; s <= data.systems.length - 1; s++) {
          const filteredStars = data.stars.filter((star: any) => {
            return data.systems[s].stars.includes(star.sku);
          });
          data.systems[s].stars = filteredStars;
        }
        setSystems(data.systems);
      } catch (error) {
        console.error("Error al obtener los sistemas:", error);
      }
    };

    fetchSystems();
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {systems.map((system, index) => (
        <GalacticSystem
          key={index}
          position={[system.position.x, system.position.y, system.position.z]}
          color={system.stars[0].color}
          name={system.stars[0].starClassName}
          radius={system.stars[0].radius}
        />
      ))}
      <Controls />
    </Canvas>
  );
};

export default GalaxyScene;
