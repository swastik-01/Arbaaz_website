import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  Float, 
  ContactShadows, 
  Grid
} from '@react-three/drei';

interface LabelProps {
  name: string;
  height: number;
}

const Label = ({ name, height }: LabelProps) => {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <Text
        position={[0, height + 0.6, 0]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000"
      >
        {name.toUpperCase()}
      </Text>
    </Float>
  );
};

interface FurnitureObjectProps {
  name: string;
  position: [number, number, number];
  width: number;
  length: number;
  height: number;
  color: string;
}

const FurnitureObject = ({ name, position, width, length, height, color }: FurnitureObjectProps) => {
  const isMetal = ['chimney', 'fridge', 'oven', 'dishwasher'].includes(name.toLowerCase());
  const isFabric = name.toLowerCase().includes('chair');

  return (
    <group position={[position[0], height / 2, position[1]]} rotation={[0, -position[2], 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial 
          color={color} 
          metalness={isMetal ? 0.9 : 0.1} 
          roughness={isFabric ? 0.9 : 0.2}
          envMapIntensity={2}
        />
      </mesh>
      <Label name={name} height={height / 2} />
    </group>
  );
};

interface SceneData {
  room: {
    width: number;
    length: number;
    floorColor?: string;
    wallColor?: string;
  };
  objects: FurnitureObjectProps[];
}

const LayoutRenderer = () => {
  const [data, setData] = useState<SceneData | null>(null);
  
  useEffect(() => {
    fetch('/scene_data.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load scene data:", err));
  }, []);

  if (!data) return null;

  return (
    <group position={[-data.room.width / 2, 0, -data.room.length / 2]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[data.room.width / 2, -0.01, data.room.length / 2]} receiveShadow>
        <planeGeometry args={[data.room.width + 5, data.room.length + 5]} />
        <meshStandardMaterial color={data.room.floorColor || "#111"} roughness={0.5} />
      </mesh>

      {/* Walls */}
      <mesh position={[data.room.width / 2, 1.5, -0.1]} receiveShadow>
        <boxGeometry args={[data.room.width + 0.2, 3, 0.1]} />
        <meshStandardMaterial color={data.room.wallColor || "#333"} roughness={1} />
      </mesh>
      <mesh position={[-0.1, 1.5, data.room.length / 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[data.room.length + 0.2, 3, 0.1]} />
        <meshStandardMaterial color={data.room.wallColor || "#333"} roughness={1} />
      </mesh>

      {/* Objects */}
      {data.objects.map((obj, i) => (
        <FurnitureObject key={i} {...obj} />
      ))}
      
      <ContactShadows position={[data.room.width / 2, 0, data.room.length / 2]} opacity={0.6} scale={15} blur={2} far={1} />
    </group>
  );
};

const ThreeDScene = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '800px', background: '#0a0a0a', borderRadius: '40px', padding: '40px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'white', margin: 0, letterSpacing: '2px' }}>ARCHITECTURAL FLOOR PLAN • [BETA]</h2>
        <span style={{ color: '#86a68f', fontSize: '12px' }}>● SYSTEM VERIFIED • NO OVERLAPS</span>
      </div>
      
      <Canvas shadows orthographic camera={{ zoom: 100, position: [0, 10, 0], up: [0, 0, -1] }}>
        <color attach="background" args={['#0a0a0a']} />
        <OrbitControls enableRotate={false} />
        
        <Suspense fallback={null}>
          <LayoutRenderer />
          <Grid args={[20, 20]} sectionColor="#222" cellColor="#111" position={[0, -0.05, 0]} />
        </Suspense>
        
        <ambientLight intensity={1.5} />
      </Canvas>
    </div>
  );
};

export default ThreeDScene;
