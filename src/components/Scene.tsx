// @ts-nocheck
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

export type ZoneKey = 'office' | 'conference' | 'stage' | 'audience' | 'data-room' | 'outdoor';

const CAMERA_POSITIONS = {
  office:    { position: [0, 0, 8], lookAt: [0, 0, 0] },
  conference:{ position: [6, 2, 6], lookAt: [0, 0, 0] },
  stage:     { position: [0, 8, 5], lookAt: [0, 0, 0] },
  audience:  { position: [-6, 2, 6], lookAt: [0, 0, 0] },
  'data-room': { position: [0, 0, -8], lookAt: [0, 0, 0] },
  outdoor:   { position: [0, 12, 10], lookAt: [0, 0, 0] },
};

// Neural Network Node Component
function NeuralNode({ position, connections = [] }: { position: [number, number, number], connections?: number[] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      const scale = hovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial 
        color={hovered ? '#ff00ff' : '#ff1493'} 
        emissive={hovered ? '#ff69b4' : '#ff6b6b'}
        emissiveIntensity={0.8}
        transparent={true}
        opacity={0.7}
      />
    </mesh>
  );
}

// Neural Connection Component
function NeuralConnection({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const ref = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ff69b4" transparent opacity={0.7} />
    </line>
  );
}

// AI Brain Component
function AIBrain() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Generate neural network nodes and connections
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const nodeCount = 50;
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 1;
      
      nodePositions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ]);
    }
    
    return nodePositions;
  }, []);

  const connections = useMemo(() => {
    const connectionPairs: Array<{start: [number, number, number], end: [number, number, number]}> = [];
    
    // Create random connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i][0] - nodes[j][0], 2) +
          Math.pow(nodes[i][1] - nodes[j][1], 2) +
          Math.pow(nodes[i][2] - nodes[j][2], 2)
        );
        
        if (distance < 2 && Math.random() > 0.7) {
          connectionPairs.push({ start: nodes[i], end: nodes[j] });
        }
      }
    }
    
    return connectionPairs;
  }, [nodes]);

  return (
    <group ref={groupRef}>
      {/* Central brain core */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ff1493" 
          emissive="#ff69b4"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
      
      {/* Neural nodes */}
      {nodes.map((position, index) => (
        <NeuralNode key={index} position={position} />
      ))}
      
      {/* Neural connections */}
      {connections.map((connection, index) => (
        <NeuralConnection 
          key={index} 
          start={connection.start} 
          end={connection.end} 
        />
      ))}
      
      {/* Pulsing energy rings with gradient colors */}
      {[0, 1, 2].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2 + ring * 0.5, 2.2 + ring * 0.5, 32]} />
          <meshBasicMaterial 
            color={ring === 0 ? '#ff1493' : ring === 1 ? '#ff69b4' : '#ffa500'} 
            transparent 
            opacity={0.5 - ring * 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraController({ zone }: { zone: ZoneKey }) {
  const { camera } = useThree();
  const target = CAMERA_POSITIONS[zone] || CAMERA_POSITIONS.office;
  const targetVec = new THREE.Vector3(...target.position);
  const lookAtVec = new THREE.Vector3(...target.lookAt);
  
  useFrame(() => {
    camera.position.lerp(targetVec, 0.05);
    camera.lookAt(lookAtVec);
  });
  
  return null;
}

const Scene = ({ zone = 'office' }: { zone?: ZoneKey }) => {
  const [webGLError, setWebGLError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLoss = () => {
      console.warn('WebGL context lost, showing fallback');
      setWebGLError(true);
    };

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.log('WebGL not supported, showing fallback');
      setWebGLError(true);
    } else {
      console.log('WebGL supported, initializing scene');
      setIsReady(true);
    }

    window.addEventListener('webglcontextlost', handleContextLoss);
    return () => window.removeEventListener('webglcontextlost', handleContextLoss);
  }, []);

  if (webGLError) {
    console.log('Showing WebGL error fallback');
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Visualization Unavailable</h3>
          <p className="text-gray-300 max-w-md">
            The AI brain visualization couldn't be loaded. This might be due to hardware limitations.
          </p>
          <div className="mt-6 space-y-2">
            <a href="/see-our-solutions" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Explore Our Solutions
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!isReady) {
    console.log('Scene not ready yet, showing loading');
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading AI Brain...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering AI Brain scene for zone:', zone);
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ width: '100vw', height: '100vh', background: '#000000' }}
      onError={(error) => {
        console.error('Canvas error:', error);
        setWebGLError(true);
      }}
    >
      {/* Vibrant gradient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ff69b4" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffa500" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#ff1493" />
      <pointLight position={[0, -10, 10]} intensity={0.5} color="#ffff00" />
      
      {/* AI Brain Visualization */}
      <AIBrain />
      
      {/* Camera Controller */}
      <CameraController zone={zone as ZoneKey} />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableRotate={true}
        maxDistance={15}
        minDistance={3}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default Scene; 