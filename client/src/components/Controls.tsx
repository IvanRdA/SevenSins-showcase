import { OrbitControls } from "@react-three/drei";
import { extend, useFrame, useThree } from "react-three-fiber";

extend({ OrbitControls });

// Method to control the 3D scene of ThreeJS.
const Controls = () => {
  const { camera, gl } = useThree();

  useFrame(() => {
    // Actualiza la posición de la cámara aquí según el movimiento del ratón, etc.
  });

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      autoRotate
      autoRotateSpeed={1}
      enableRotate
      enableZoom
      enablePan
      enableDamping
      dampingFactor={0.25}
      target={[0, 0, 0]}
    />
  );
};

export default Controls;
