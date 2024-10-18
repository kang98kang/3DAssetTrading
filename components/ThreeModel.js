import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const WolfModel = () => {
  // GLTF 파일을 불러오고, 애니메이션과 장면(scene) 가져오기
  const { scene, animations } = useGLTF(
    "/3dmodels/wolf/Wolf-Blender-2.82a.gltf"
  ); // 모델 경로
  const mixer = useRef(null); // 애니메이션 믹서

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene); // 애니메이션 믹서 생성
      const action = mixer.current.clipAction(animations[0]); // 첫 번째 애니메이션 클립 재생
      action.play();
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction(); // 컴포넌트가 언마운트될 때 애니메이션 정지
      }
    };
  }, [scene, animations]);

  useEffect(() => {
    const animate = (delta) => {
      if (mixer.current) mixer.current.update(delta); // 애니메이션 업데이트
    };

    return () => {
      animate(); // 애니메이션 업데이트 루프
    };
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive object={scene} scale={1} /> {/* 모델 렌더링 */}
      <OrbitControls /> {/* 마우스로 모델 회전 */}
    </Canvas>
  );
};

export default WolfModel;
