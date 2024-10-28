import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader, MTLLoader } from "three-stdlib";
import { useRef, useState } from "react";
import * as THREE from "three";

const Eye = ({ position }) => {
  const materials = useLoader(MTLLoader, "/3dmodels/eye/eyeball.mtl");
  const obj = useLoader(OBJLoader, "/3dmodels/eye/eyeball.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const ref = useRef();
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    ref.current.rotation.x = Math.sin(time * 0.3) * 0.3;
  });

  return (
    <primitive object={obj.clone()} ref={ref} scale={0.5} position={position} />
  );
};

const EyeModel = () => (
  <Canvas>
    <ambientLight color="white" intensity={2} />
    <pointLight position={[10, 10, 10]} />
    <Eye position={[-2, 0, 0]} />
    <Eye position={[2, 0, 0]} />
    <OrbitControls minDistance={5} maxDistance={8} />
  </Canvas>
);

export default EyeModel;
