import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const Rocket = ({ direction }) => {
  const { scene } = useGLTF("/3dmodels/rocket/scene.gltf");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      if (direction === "right") {
        ref.current.rotation.z = THREE.MathUtils.degToRad(270);
        ref.current.rotation.x += 0.01;
      } else {
        ref.current.rotation.y = 0;
      }
    }
  });

  return <primitive object={scene} ref={ref} scale={8} />;
};

const RocketModel = ({ direction = "right" }) => (
  <Canvas
    style={{ width: "200px", overflow: "hidden" }}
    camera={{ position: [0, 0, 10], fov: 70 }}
  >
    <ambientLight intensity={1} />
    <directionalLight position={[5, 10, 5]} intensity={2} />
    <Rocket direction={direction} />
    <OrbitControls
      enableZoom={false}
      enableRotate={false}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2}
    />
  </Canvas>
);

export default RocketModel;
