import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export type ZoneKey = keyof typeof CAMERA_POSITIONS;

const CAMERA_POSITIONS = {
  office:    { position: [0, 2, 12], lookAt: [0, 1.5, 0] },      // Main entrance/front
  conference:{ position: [6, 3, 4], lookAt: [0, 1.5, 0] },      // Side/meeting area
  stage:     { position: [0, 8, 4], lookAt: [0, 2, 0] },        // Top-down or stage
  audience:  { position: [-6, 2.5, 4], lookAt: [0, 1.5, 0] },   // Opposite side
  'data-room': { position: [0, 3, -12], lookAt: [0, 1.5, 0] },  // Back/data area
  outdoor:   { position: [0, 14, 14], lookAt: [0, 2, 0] },      // High/exterior
};

function OfficeModel() {
  const { scene } = useGLTF('/models/office-tekvoro.glb');
  return <primitive object={scene} />;
}

function CameraController({ zone }: { zone: ZoneKey }) {
  const { camera } = useThree();
  const target = CAMERA_POSITIONS[zone] || CAMERA_POSITIONS.office;
  const targetVec = new THREE.Vector3(...target.position);
  const lookAtVec = new THREE.Vector3(...target.lookAt);
  useFrame(() => {
    camera.position.lerp(targetVec, 0.12);
    camera.lookAt(lookAtVec);
  });
  return null;
}

const Scene = ({ zone = 'office' }: { zone?: ZoneKey }) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{ width: '100vw', height: '100vh', background: '#000' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} />
      <OfficeModel />
      <CameraController zone={zone as ZoneKey} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default Scene; 