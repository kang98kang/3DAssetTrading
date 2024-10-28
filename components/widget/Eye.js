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

  useFrame((state) => {
    const { x, y } = state.mouse; // 마우스 위치를 가져옵니다.
    const targetX = x * 0.5; // 눈이 마우스를 쳐다보게 X축 회전 각도 설정
    const targetY = -y * 0.5; // 눈이 마우스를 쳐다보게 Y축 회전 각도 설정

    // 현재 회전 각도와 목표 회전 각도를 보간하여 부드럽게 움직이게 설정
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      targetY,
      0.1
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetX,
      0.1
    );
  });

  return (
    <primitive object={obj.clone()} ref={ref} scale={0.3} position={position} />
  );
};

const EyeModel = () => (
  <Canvas>
    <ambientLight color="white" intensity={2} />
    <pointLight position={[10, 10, 10]} />
    {/* 왼쪽 눈 */}
    <Eye position={[-1, 0, 0]} />
    {/* 오른쪽 눈 */}
    <Eye position={[1, 0, 0]} />
    <OrbitControls minDistance={5} maxDistance={8} />
  </Canvas>
);

export default EyeModel;
