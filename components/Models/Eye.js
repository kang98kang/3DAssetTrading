import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import { MTLLoader } from "three-stdlib";
import { useRef } from "react";

const EyeModel = () => {
  // MTL 파일을 먼저 로드
  const materials = useLoader(MTLLoader, "/3dmodels/eye/eyeball.mtl");

  // MTL 파일로부터 메터리얼 적용 후, OBJ 파일 로드
  const obj = useLoader(OBJLoader, "/3dmodels/eye/eyeball.obj", (loader) => {
    materials.preload(); // 메터리얼을 미리 로드
    loader.setMaterials(materials); // OBJ 로더에 메터리얼 설정
  });

  const ref = useRef();

  return (
    <Canvas>
      <ambientLight color="white" intensity={2} />{" "}
      {/*color 빛 색깔 조정, intensity 빛 강도*/}
      <pointLight position={[10, 10, 10]} />
      <primitive object={obj} ref={ref} scale={0.5} /> {/* OBJ 모델 렌더링 */}
      <OrbitControls /> {/* OrbitControls 설정 */}
    </Canvas>
  );
};

export default EyeModel;
