// GalacticSystem.tsx
import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

const PlanetSystem: React.FC<{
  position: [number, number, number];
  name: string;
  radius: number;
}> = ({ position, name, radius }) => {
  const meshRef = useRef();
  // const texture = useLoader(TextureLoader, `${name}.jpg`);

  useFrame(() => {
    // Lógica de actualización de la escena (opcional)
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshStandardMaterial /*map={texture}*/ />
    </mesh>
  );
};

export default PlanetSystem;
