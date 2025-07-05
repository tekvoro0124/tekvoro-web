import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress } from '@react-three/drei';
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

function LoaderOverlay() {
  const { progress, active } = useProgress();
  if (!active || progress >= 100) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      pointerEvents: 'none',
      transition: 'opacity 0.3s',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            opacity="0.15"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeDasharray={2 * Math.PI * 36}
            strokeDashoffset={2 * Math.PI * 36 * (1 - progress / 100)}
            style={{ transition: 'stroke-dashoffset 0.3s' }}
          />
        </svg>
        <span
          style={{
            color: '#fff',
            fontWeight: 300,
            fontSize: '1.2rem',
            marginTop: '-54px',
            textAlign: 'center',
            letterSpacing: '0.05em',
            fontFamily: 'Inter, Satoshi, Manrope, Arial, sans-serif',
            width: 80,
            userSelect: 'none',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

const Scene = ({ zone = 'office' }: { zone?: ZoneKey }) => {
  return (
    <>
      <LoaderOverlay />
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
    </>
  );
};

export default Scene; 