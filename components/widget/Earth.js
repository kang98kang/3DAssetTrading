import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

const Earth = () => {
  const { scene } = useGLTF("/3dmodels/earth/scene.gltf");

  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return <primitive object={scene} ref={ref} scale={0.4} />;
};

const EarthScene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Earth />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default EarthScene;
