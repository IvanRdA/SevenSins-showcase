// GalacticSystem.tsx
import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

const StarSystem: React.FC<{
  position: [number, number, number];
  color: string;
  name: string;
  radius: number;
}> = ({ position, color, name, radius }) => {
  const meshRef = useRef();
  // const texture = useLoader(TextureLoader, `${name}.jpg`);

  useFrame(() => {
    // Lógica de actualización de la escena (opcional)
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshStandardMaterial color={color} /*map={texture}*/ />
    </mesh>
  );
};

export default StarSystem;
