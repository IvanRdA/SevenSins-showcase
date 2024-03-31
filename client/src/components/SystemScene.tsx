import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import StarSystem from "./StarSystem";
import PlanetSystem from "./PlanetSystem";
import Controls from "./Controls";

const SystemScene: React.FC = (sku) => {
  const sys: any[] = [];
  const [stars, setStars] = useState(sys);
  const [planets, setPlanets] = useState(sys);
  const [asteroids, setAsteroids] = useState(sys);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/getProcedural/${sku}`
        );
        const data = await response.json();

        for (let s = 0; s <= data.stars.length - 1; s++) {
          stars.push(data.stars[s]);
        }

        for (let s = 0; s <= data.planets.length - 1; s++) {
          planets.push(data.planets[s]);
        }

        for (let s = 0; s <= data.asteroids.length - 1; s++) {
          asteroids.push(data.asteroids[s]);
        }
      } catch (error) {
        console.error("Error al obtener los sistemas:", error);
      }
    };

    fetchSystems();
  }, [sku]);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {stars.map((star, index) => (
        <StarSystem
          key={index}
          position={[
            100 * star.orbital,
            100 * star.orbital,
            100 * star.orbital,
          ]}
          color={star.color}
          name={star.starClassName}
          radius={star.radius}
        />
      ))}

      {planets.map((planet, index) => (
        <PlanetSystem
          key={index}
          position={[
            200 * planet.orbital,
            200 * planet.orbital,
            200 * planet.orbital,
          ]}
          name={planet.name}
          radius={planet.radius}
        />
      ))}
      <Controls />
    </Canvas>
  );
};

export default SystemScene;
